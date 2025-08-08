#!/bin/bash

# Full Application Deployment Script
# Deploys both frontend (S3+CloudFront) and backend (ECS Fargate)

set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
APP_NAME=${APP_NAME:-ecms-app}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

section() {
    echo -e "${BLUE}[SECTION]${NC} $1"
}

# Check required tools
check_dependencies() {
    log "Checking dependencies..."
    
    command -v aws >/dev/null 2>&1 || error "AWS CLI is required but not installed"
    command -v docker >/dev/null 2>&1 || error "Docker is required but not installed"
    command -v terraform >/dev/null 2>&1 || error "Terraform is required but not installed"
    command -v npm >/dev/null 2>&1 || error "npm is required but not installed"
    
    log "All dependencies are available"
}

# Deploy infrastructure
deploy_infrastructure() {
    section "Deploying Infrastructure"
    
    cd terraform
    
    if [ ! -f "terraform.tfvars" ]; then
        error "terraform.tfvars file not found. Please copy terraform.tfvars.example and fill in your values."
    fi
    
    terraform init
    terraform plan
    
    read -p "Do you want to apply infrastructure changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        terraform apply -auto-approve
        log "Infrastructure deployment completed"
    else
        log "Infrastructure deployment skipped"
    fi
    
    cd ..
}

# Deploy frontend
deploy_frontend() {
    section "Deploying Frontend"
    
    ./deploy-frontend.sh deploy
}

# Deploy backend
deploy_backend() {
    section "Deploying Backend"
    
    ./deploy.sh deploy
}

# Show deployment status
show_status() {
    section "Deployment Status"
    
    # Get infrastructure outputs
    cd terraform
    
    FRONTEND_URL=$(terraform output -raw frontend_url 2>/dev/null || echo "Not available")
    BACKEND_URL=$(terraform output -raw load_balancer_dns 2>/dev/null || echo "Not available")
    
    cd ..
    
    log "Frontend URL: $FRONTEND_URL"
    log "Backend URL: http://$BACKEND_URL"
    
    # Show ECS service status
    ./deploy.sh status
}

# Full deployment
deploy_all() {
    log "Starting full application deployment..."
    
    check_dependencies
    deploy_infrastructure
    deploy_frontend
    deploy_backend
    show_status
    
    log "Full deployment completed successfully!"
}

# Show help
show_help() {
    echo "Full Application Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  all           Deploy infrastructure, frontend, and backend"
    echo "  infra         Deploy infrastructure only"
    echo "  frontend      Deploy frontend only"
    echo "  backend       Deploy backend only"
    echo "  status        Show deployment status"
    echo "  help          Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  AWS_REGION    AWS region (default: us-east-1)"
    echo "  APP_NAME      Application name (default: ecms-app)"
    echo ""
    echo "Prerequisites:"
    echo "  - AWS CLI configured with appropriate permissions"
    echo "  - Docker installed and running"
    echo "  - Terraform installed"
    echo "  - Node.js and npm installed"
    echo "  - terraform/terraform.tfvars file configured"
}

# Main script logic
case "${1:-all}" in
    all)
        deploy_all
        ;;
    infra)
        check_dependencies
        deploy_infrastructure
        ;;
    frontend)
        check_dependencies
        deploy_frontend
        ;;
    backend)
        check_dependencies
        deploy_backend
        ;;
    status)
        show_status
        ;;
    help)
        show_help
        ;;
    *)
        error "Unknown command: $1. Use 'help' to see available commands."
        ;;
esac