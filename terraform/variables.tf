variable "aws_region" {
  description = "The AWS region where resources will be created."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project, used to prefix resource names."
  type        = string
  default     = "cphi"
}

variable "backend_image_url" {
  description = "The URL of the backend Docker image in ECR."
  type        = string
  default     = "789699023662.dkr.ecr.us-east-1.amazonaws.com/mediashare/backend:latest"
}
