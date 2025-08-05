########################################################################################################
# ALB
########################################################################################################

# Security Group for the Application Load Balancer
resource "aws_security_group" "lb" {
  name        = "${var.project_name}-alb-sg"
  description = "Controls access to the ALB"
  vpc_id      = module.vpc.vpc_id
  ingress {
    protocol         = "tcp"
    from_port        = 80
    to_port          = 80
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Project = var.project_name
  }
}

# The Application Load Balancer resource itself
resource "aws_lb" "app" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = false

  tags = {
    Project = var.project_name
  }
}

# The Target Group for the ECS service
resource "aws_lb_target_group" "app" {
  name        = "${var.project_name}-app-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"
  health_check {
    enabled             = true
    path                = "/"
    port                = "traffic-port"
    healthy_threshold   = 3
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
  }

  tags = {
    Project = var.project_name
  }
}

# Listener for HTTP traffic on port 80
resource "aws_lb_listener" "http_forward" {
  load_balancer_arn = aws_lb.app.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

########################################################################################################
# ECS
########################################################################################################

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  tags = {
    Project = var.project_name
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "ecms-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  runtime_platform {
    cpu_architecture        = "ARM64"
    operating_system_family = "LINUX"
  }
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([
    {
      name      = "ecms-app"
      image     = "036346232890.dkr.ecr.us-east-1.amazonaws.com/cphi:latest"
      essential = true

      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
          name          = "http"
        },
        {
          containerPort = 8080
          protocol      = "tcp"
          name          = "api"
        }
      ]

      environment = [
        {
          name  = "MICRONAUT_ENVIRONMENTS"
          value = "production"
        },
        {
          name  = "DATABASE_URL"
          value = "docdb-cphi.cluster-cq5qgu02qckj.us-east-1.docdb.amazonaws.com"
        },
        {
          name  = "JAVA_OPTS"
          value = "-Xmx1536m -XX:+UseG1GC -XX:+UseStringDeduplication"
        }
      ]

      secrets = [
        {
          name      = "username"
          valueFrom = "arn:aws:secretsmanager:us-east-1:036346232890:secret:rds!cluster-e548e262-ebee-4319-9fb7-ea3bbbdc5e25-sMIN4h"
        },
        {
          name      = "password"
          valueFrom = "arn:aws:secretsmanager:us-east-1:036346232890:secret:rds!cluster-e548e262-ebee-4319-9fb7-ea3bbbdc5e25-sMIN4h"
        }
      ]

      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl -f http://localhost:8080/health || exit 1"
        ]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/cphi-app"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "ecs"
        }
      }

      stopTimeout = 30
    }
  ])
}

resource "aws_ecs_service" "app" {
  name                               = "${var.project_name}-app-service"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.app.arn
  desired_count                      = 1
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  network_configuration {
    subnets         = module.vpc.private_subnets
    security_groups = [aws_security_group.ecs_service_sg.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "ecms-app"
    container_port   = 8080
  }
  depends_on = [aws_lb_listener.http_forward]
}

# A log group for the entire application
resource "aws_cloudwatch_log_group" "app" {
  name = "/ecs/${var.project_name}/app"
}

# Security group for the ECS service
resource "aws_security_group" "ecs_service_sg" {
  name        = "${var.project_name}-ecs-service-sg"
  description = "Allow traffic to the ECS service from the ALB"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "Allow HTTP traffic from ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_name}-ecs-task-exec-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
  tags = {
    Project = var.project_name
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_secret_read" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.secrets_manager_read.arn
}

# ECS Task Role
resource "aws_iam_role" "ecs_task_role" {
  name = "${var.project_name}-ecs-task-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
  tags = {
    Project = var.project_name
  }
}

# Policy allowing access to the S3 bucket for cphi files
resource "aws_iam_policy" "s3_cphi_access" {
  name        = "${var.project_name}-s3-cphi-access-policy"
  description = "Allows ECS tasks to access the cphi S3 bucket"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:DeleteObject"
      ],
      Effect   = "Allow",
      Resource = "${module.s3_cphi.s3_bucket_arn}/*"
      },
      {
        Action = [
          "s3:GetBucketLocation",
          "s3:ListBucket",
          "s3:HeadBucket"
        ],
        Effect   = "Allow",
        Resource = module.s3_cphi.s3_bucket_arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "s3_cphi_access_attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.s3_cphi_access.arn
}

# Policy to allow reading the RDS password from Secrets Manager
resource "aws_iam_policy" "secrets_manager_read" {
  name        = "${var.project_name}-secrets-manager-read-policy"
  description = "Allows ECS tasks to read the RDS password"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action   = "secretsmanager:GetSecretValue",
      Effect   = "Allow",
      Resource = "arn:aws:secretsmanager:us-east-1:036346232890:secret:rds!cluster-e548e262-ebee-4319-9fb7-ea3bbbdc5e25-sMIN4h"
      },
      {
        Action   = "kms:*",
        Effect   = "Allow",
        Resource = aws_kms_key.default.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "s3_cphi_access" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.s3_cphi_access.arn
}

########################################################################################################
# Utils
########################################################################################################
/*
resource "aws_secretsmanager_secret" "def" {
  kms_key_id              = aws_kms_key.default.key_id
  name                    = "rds_secret"
  description             = "Aurora Admin password"
  recovery_window_in_days = 14
}

resource "aws_secretsmanager_secret_version" "secret" {
  secret_id     = aws_secretsmanager_secret.def.id
  secret_string = random_password.password.result
}
*/

resource "aws_kms_key" "default" {
  description             = "KMS key for RDS"
  deletion_window_in_days = 30
  is_enabled              = true
  enable_key_rotation     = true
}

resource "random_password" "password" {
  length  = 16
  special = true
}




########################################################################################################
# S3 for backend
########################################################################################################

# S3 bucket for cphi files (replaces MinIO)
module "s3_cphi" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  version       = "~> 4.0"
  bucket        = "${var.project_name}-cphi-storage"
  force_destroy = true
  cors_rule = [{
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3600
  }]
  versioning = {
    status = true
  }
}

########################################################################################################
# S3 for frontend
########################################################################################################
resource "aws_s3_bucket" "frontend" {
  bucket = "cphisharefrontendbucket"
}

resource "aws_s3_bucket_ownership_controls" "ownership" {
  bucket = aws_s3_bucket.frontend.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "publiceaccess" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.ownership,
    aws_s3_bucket_public_access_block.publiceaccess,
  ]
  bucket = aws_s3_bucket.frontend.id
  acl    = "public-read"
}


resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "public_read_access" {
  bucket = aws_s3_bucket.frontend.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
   "Principal": "*",
      "Action": [ "s3:GetObject" ],
      "Resource": [
        "${aws_s3_bucket.frontend.arn}",
        "${aws_s3_bucket.frontend.arn}/*"
      ]
    }
  ]
}
EOF
}

########################################################################################################
# RDS
########################################################################################################
/*
module "rds" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "~> 9.0"

  name           = "${var.project_name}-aurora-db"
  database_name = "cphi_sharing"
  master_username = "postgres"
  master_password = random_password.password.result
  manage_master_user_password = false
  engine         = "aurora-postgresql"
  engine_version = "15.5"
  create_db_subnet_group = true
  skip_final_snapshot = true
  instance_class  = "db.t4g.medium"
  instances = {
    one   = {
      instance_class  = "db.t4g.medium"
    }
  }
  vpc_id          = module.vpc.vpc_id
  subnets         = module.vpc.private_subnets
  vpc_security_group_ids = [aws_security_group.rds.id]
  storage_encrypted   = true
  apply_imcphitely   = true
  monitoring_interval = 60
  enabled_cloudwatch_logs_exports = ["postgresql"]
  iam_database_authentication_enabled = true
}

# Security Group for the RDS Aurora cluster
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Security group for RDS Aurora cluster, allowing access from ECS"
  vpc_id      = module.vpc.vpc_id
  ingress {
    description = "PostgreSQL from ECS"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.ecs_service_sg.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

*/
########################################################################################################
# VPC
########################################################################################################

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name                   = "${var.project_name}-vpc"
  cidr                   = "10.0.0.0/16"
  azs                    = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets        = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets         = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false
  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}
