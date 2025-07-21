terraform {
  backend "s3" {
    bucket         = "cphi-terraform"
    key            = "cphi/production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-lock"
    encrypt        = true
  }
}
