# CPHI App - Content Management System

A modern, full-stack web application built with Angular and Micronaut, featuring AWS Cognito authentication and cloud deployment on AWS.

## 🏗️ Architecture

### Frontend
- **Framework**: Angular 17
- **UI Library**: Angular Material
- **Authentication**: AWS Cognito with OIDC
- **Styling**: Custom CSS with professional blue gradient theme
- **Build System**: Angular CLI with modern build pipeline

### Backend
- **Framework**: Micronaut (Java)
- **Database**: MongoDB
- **Security**: JWT with Micronaut Security
- **Build Tool**: Gradle with Kotlin DSL

### Infrastructure
- **Cloud Provider**: AWS
- **Frontend Hosting**: S3 + CloudFront
- **Backend Hosting**: ECS Fargate
- **Load Balancer**: Application Load Balancer (ALB)
- **Infrastructure as Code**: Terraform
- **CI/CD**: AWS CodeBuild

## 🚀 Features

### Authentication & Security
- ✅ AWS Cognito integration with OIDC flow
- ✅ Protected routes with authentication guards
- ✅ JWT token management
- ✅ Secure logout functionality

### User Interface
- ✅ Modern, responsive design
- ✅ Professional CPHI branding with business icon
- ✅ Blue gradient navigation bar
- ✅ User info display (name and email)
- ✅ Material Design components
- ✅ Mobile-friendly responsive layout

### Backend Features
- ✅ RESTful API with Micronaut
- ✅ MongoDB data persistence
- ✅ JWT authentication
- ✅ Health check endpoints
- ✅ Docker containerization

## 📁 Project Structure

```
cphi/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/           # Angular components and services
│   │   ├── assets/        # Static assets
│   │   └── styles/        # Global styles
│   ├── angular.json       # Angular configuration
│   └── package.json       # Frontend dependencies
├── api/                   # Micronaut backend
│   ├── src/
│   │   └── main/java/     # Java source code
│   ├── build.gradle.kts   # Gradle build configuration
│   └── Dockerfile         # Backend container image
├── terraform/             # Infrastructure as Code
│   ├── main.tf           # Main Terraform configuration
│   ├── frontend.tf       # Frontend infrastructure
│   └── variables.tf      # Terraform variables
├── deploy-frontend.sh     # Frontend deployment script
├── deploy-full.sh        # Full stack deployment script
└── README.md             # This file
```

## 🛠️ Prerequisites

### Development Environment
- **Node.js**: 18.x or later
- **npm**: 9.x or later
- **Java**: 17 or later
- **Gradle**: 8.x or later
- **Docker**: Latest version
- **AWS CLI**: v2 configured with appropriate credentials
- **Terraform**: 1.0 or later

### AWS Resources
- AWS Account with appropriate permissions
- Cognito User Pool configured
- S3 bucket for Terraform state (optional)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cphi
```

### 2. Frontend Setup
```bash
cd client
npm install --legacy-peer-deps
npm start
```
The frontend will be available at `http://localhost:4200`

### 3. Backend Setup
```bash
cd api
./gradlew run
```
The backend API will be available at `http://localhost:8080`

### 4. Infrastructure Setup
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## 🔧 Configuration

### Frontend Configuration
The Angular app is configured for AWS Cognito authentication:

```typescript
// Located in client/src/app/auth/auth.config.ts
export const authConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BE7MaqC5T',
  redirectUrl: 'https://d15dzv70fdtos7.cloudfront.net',
  clientId: '1dheen19kd0a5i5364ip8e43v1',
  // ... other config
};
```

### Backend Configuration
The Micronaut app configuration is in `api/src/main/resources/application.yml`:

```yaml
micronaut:
  application:
    name: cphi-api
  security:
    authentication: bearer
    token:
      jwt:
        signatures:
          secret:
            generator:
              secret: ${JWT_GENERATOR_SIGNATURE_SECRET:pleaseChangeThisSecretForANewOne}
```

## 🚀 Deployment

### Frontend Only Deployment
```bash
./deploy-frontend.sh deploy
```

### Full Stack Deployment
```bash
./deploy-full.sh
```

### Manual Deployment Steps
1. **Build Frontend**:
   ```bash
   cd client
   npm run build --configuration=production
   ```

2. **Build Backend**:
   ```bash
   cd api
   ./gradlew build
   docker build -t cphi-api .
   ```

3. **Deploy Infrastructure**:
   ```bash
   cd terraform
   terraform apply
   ```

4. **Upload Frontend**:
   ```bash
   aws s3 sync client/dist/ecms-client/browser/ s3://your-bucket-name/
   ```

## 🧪 Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
```bash
cd api
./gradlew test
```

### End-to-End Testing
1. Visit the deployed frontend URL
2. Click "Sign in with AWS Cognito"
3. Complete authentication flow
4. Verify redirect to dashboard
5. Check user info display in navbar

## 🔐 Authentication Flow

1. **User Access**: User visits the application
2. **Auth Check**: Angular auth guard checks for valid token
3. **Redirect**: If not authenticated, redirect to Cognito
4. **Login**: User completes Cognito authentication
5. **Token Exchange**: OIDC flow exchanges code for JWT token
6. **Redirect Back**: User redirected to application with token
7. **API Calls**: Frontend includes JWT in API requests
8. **Backend Validation**: Micronaut validates JWT for protected endpoints

## 🌐 Environment URLs

### Development
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`

### Production
- Frontend: `https://d15dzv70fdtos7.cloudfront.net`
- Backend: `https://cphi-alb-721046433.us-east-1.elb.amazonaws.com`

## 📊 Monitoring & Health Checks

### Backend Health Endpoints
- Health Check: `GET /health`
- Application Info: `GET /info`

### Frontend Monitoring
- CloudFront access logs
- S3 bucket metrics
- Real User Monitoring (RUM) can be added

## 🛡️ Security Considerations

- ✅ HTTPS enforced on all endpoints
- ✅ JWT tokens with expiration
- ✅ CORS properly configured
- ✅ Security headers implemented
- ✅ Input validation on all endpoints
- ✅ AWS IAM roles with least privilege

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Frontend Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Authentication Issues**
- Verify Cognito User Pool configuration
- Check redirect URLs match exactly
- Ensure CORS is configured for your domain

**Backend Connection Issues**
- Check MongoDB connection string
- Verify JWT secret configuration
- Check ECS task logs in CloudWatch

**Deployment Issues**
- Verify AWS credentials are configured
- Check Terraform state is not corrupted
- Ensure S3 bucket permissions are correct

**API Request Timeouts**
- **Symptom**: API requests from the frontend application time out, but the same request works from a tool like Postman.
- **Cause**: This is caused by a "Mixed Content" issue. The frontend is served over `https` (from CloudFront), but the backend API endpoint is only configured to accept `http` traffic. Modern browsers block these requests for security reasons, which can manifest as a timeout.
- **Solution**: The backend server, specifically the Application Load Balancer (ALB) at `cphi-alb-721046433.us-east-1.elb.amazonaws.com`, must be configured to accept `https` traffic on port 443 and have a valid SSL certificate. The `apiUrl` in `client/src/environments/environment.prod.ts` must be set to the `https` endpoint.

### Getting Help

1. Check the logs in CloudWatch (for AWS deployments)
2. Review browser developer tools for frontend issues
3. Check ECS task logs for backend issues
4. Verify all environment variables are set correctly

## 📞 Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Angular, Micronaut, and AWS**