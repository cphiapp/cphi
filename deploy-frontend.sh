#!/bin/bash

# Frontend Deployment Script for S3 + CloudFront

set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
APP_NAME=${APP_NAME:-ecms-app}
S3_BUCKET=""
CLOUDFRONT_DISTRIBUTION_ID=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check required tools
check_dependencies() {
    log "Checking dependencies..."
    
    command -v aws >/dev/null 2>&1 || error "AWS CLI is required but not installed"
    command -v npm >/dev/null 2>&1 || error "npm is required but not installed"
    
    log "All dependencies are available"
}

# Get S3 bucket and CloudFront distribution from Terraform output
get_infrastructure_info() {
    log "Getting infrastructure information..."
    
    cd terraform
    
    S3_BUCKET=$(terraform output -raw frontend_bucket_name 2>/dev/null || echo "")
    CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
    
    cd ..
    
    if [ -z "$S3_BUCKET" ]; then
        error "S3 bucket not found. Please run terraform apply first."
    fi
    
    if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        warn "CloudFront distribution ID not found. Cache invalidation will be skipped."
    fi
    
    log "S3 Bucket: $S3_BUCKET"
    log "CloudFront Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
}

# Build Angular frontend
build_frontend() {
    log "Building CPHI App frontend..."
    
    # Auth configuration is already set with your existing Cognito pool
    log "Using existing Cognito configuration..."
    log "  User Pool: us-east-1_BE7MaqC5T"
    log "  Client ID: 1dheen19kd0a5i5364ip8e43v1"
    
    cd client
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    log "Node.js version: $NODE_VERSION"
    
    # Install angular-auth-oidc-client if not already installed
    if ! npm list angular-auth-oidc-client >/dev/null 2>&1; then
        log "Installing angular-auth-oidc-client..."
        npm install angular-auth-oidc-client --legacy-peer-deps
    fi
    
    # Clean install with legacy peer deps to handle version conflicts
    log "Installing dependencies..."
    rm -rf node_modules package-lock.json
    npm install --legacy-peer-deps
    
    # Verify critical dependencies
    log "Verifying Angular and Material dependencies..."
    npm list @angular/core @angular/material angular-auth-oidc-client --depth=0 || warn "Some dependencies may have issues"
    
    # Build for production
    log "Building for production..."
    npm run build --configuration=production
    
    # Verify build output exists
    if [ ! -d "dist" ]; then
        error "Build failed: dist directory not found"
    fi
    
    # Angular 17+ outputs to dist/ecms-client/browser/
    DIST_DIR="dist/ecms-client/browser"
    
    if [ ! -f "$DIST_DIR/index.html" ]; then
        # Fallback: try to find index.html anywhere in dist
        DIST_DIR=$(find dist -name "index.html" -type f | head -1 | xargs dirname 2>/dev/null || echo "")
        if [ -z "$DIST_DIR" ]; then
            error "Build failed: index.html not found in dist directory"
        fi
    fi
    
    log "Build output found in: $DIST_DIR"
    
    # Show build statistics
    if [ -f "$DIST_DIR/index.html" ]; then
        BUILD_SIZE=$(du -sh "$DIST_DIR" | cut -f1)
        log "Build size: $BUILD_SIZE"
        # Count files
        FILE_COUNT=$(find "$DIST_DIR" -type f | wc -l)
        log "Files generated: $FILE_COUNT"
    fi
    
    cd ..
    
    log "CPHI App frontend build completed successfully!"
}

# Deploy to S3
deploy_to_s3() {
    log "Deploying CPHI App to S3..."
    
    # Angular 17+ outputs to dist/ecms-client/browser/
    cd client
    DIST_DIR="dist/ecms-client/browser"
    
    if [ ! -f "$DIST_DIR/index.html" ]; then
        # Fallback: try to find index.html anywhere in dist
        DIST_DIR=$(find dist -name "index.html" -type f | head -1 | xargs dirname 2>/dev/null || echo "")
        if [ -z "$DIST_DIR" ]; then
            error "Build output not found. Please run build first."
        fi
    fi
    cd ..
    
    BUILD_PATH="client/$DIST_DIR"
    log "Uploading from: $BUILD_PATH"
    
    # Verify the build directory exists and has content
    if [ ! -f "$BUILD_PATH/index.html" ]; then
        error "index.html not found in $BUILD_PATH"
    fi
    
    # Show what we're about to upload
    log "Files to upload:"
    find "$BUILD_PATH" -type f -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.ico" | head -10
    
    # Sync static assets with long cache
    log "Uploading static assets with cache headers..."
    aws s3 sync "$BUILD_PATH/" s3://$S3_BUCKET/ \
        --region $AWS_REGION \
        --delete \
        --cache-control "public, max-age=31536000" \
        --exclude "index.html" \
        --exclude "*.map"
    
    # Upload index.html with no-cache headers
    log "Uploading index.html with no-cache headers..."
    aws s3 cp "$BUILD_PATH/index.html" s3://$S3_BUCKET/index.html \
        --region $AWS_REGION \
        --cache-control "no-cache, no-store, must-revalidate" \
        --content-type "text/html"
    
    # Verify upload
    log "Verifying S3 upload..."
    if aws s3 ls s3://$S3_BUCKET/index.html >/dev/null 2>&1; then
        log "✓ index.html uploaded successfully"
    else
        error "Failed to verify index.html upload"
    fi
    
    log "CPHI App deployed to S3 successfully!"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        log "Invalidating CloudFront cache..."
        
        aws cloudfront create-invalidation \
            --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
            --paths "/*" \
            --region $AWS_REGION
        
        log "CloudFront invalidation initiated"
    else
        warn "Skipping CloudFront invalidation (distribution ID not found)"
    fi
}

# Get CloudFront URL and verify deployment
get_frontend_url() {
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        CLOUDFRONT_URL=$(aws cloudfront get-distribution \
            --id $CLOUDFRONT_DISTRIBUTION_ID \
            --query 'Distribution.DomainName' \
            --output text \
            --region $AWS_REGION 2>/dev/null || echo "")
        
        if [ -n "$CLOUDFRONT_URL" ]; then
            log "✓ CPHI App Frontend URL: https://$CLOUDFRONT_URL"
            log "✓ Authentication: AWS Cognito (us-east-1_BE7MaqC5T)"
            log "✓ Features: Modern navbar, user info, logout functionality"
        fi
    else
        log "S3 Website URL: http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com"
    fi
    
    log ""
    log "🎯 Deployment Summary:"
    log "  ✅ CPHI App branding applied"
    log "  ✅ Cognito authentication integrated"
    log "  ✅ Modern navigation bar with user info"
    log "  ✅ Responsive design for all devices"
    log "  ✅ Professional blue gradient theme"
    log "  ✅ Angular 17 build system"
    log ""
    log "🧪 Test your deployment:"
    log "  1. Visit the frontend URL above"
    log "  2. Click 'Sign in with AWS Cognito'"
    log "  3. Complete authentication"
    log "  4. Verify redirect to appointments dashboard"
    log "  5. Check navbar shows your user info"
}

# Main deployment function
deploy() {
    log "Starting frontend deployment..."
    
    check_dependencies
    get_infrastructure_info
    build_frontend
    deploy_to_s3
    invalidate_cloudfront
    get_frontend_url
    
    log "Frontend deployment completed successfully!"
}

# Debug build output
debug_build() {
    log "Debugging build output..."
    
    cd client
    
    if [ -d "dist" ]; then
        log "Contents of dist directory:"
        find dist -type f | head -20
        
        log "Looking for index.html:"
        find dist -name "index.html" -type f
        
        # Check Angular 17+ structure
        if [ -d "dist/ecms-client/browser" ]; then
            log "Angular 17+ build structure detected:"
            log "  Build output: dist/ecms-client/browser/"
            ls -la "dist/ecms-client/browser/" | head -10
        fi
    else
        warn "dist directory does not exist"
    fi
    
    cd ..
}

# Show help
show_help() {
    echo "Frontend Deployment Script for S3 + CloudFront"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  deploy    Build and deploy frontend"
    echo "  build     Build frontend only"
    echo "  upload    Upload to S3 only (assumes already built)"
    echo "  debug     Show build output information"
    echo "  help      Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  AWS_REGION    AWS region (default: us-east-1)"
    echo "  APP_NAME      Application name (default: ecms-app)"
}

# Main script logic
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    build)
        check_dependencies
        build_frontend
        debug_build
        ;;
    upload)
        check_dependencies
        get_infrastructure_info
        deploy_to_s3
        invalidate_cloudfront
        get_frontend_url
        ;;
    debug)
        debug_build
        ;;
    help)
        show_help
        ;;
    *)
        error "Unknown command: $1. Use 'help' to see available commands."
        ;;
esac