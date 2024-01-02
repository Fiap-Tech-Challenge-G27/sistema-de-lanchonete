terraform {
  backend "s3" {
    bucket         = var.state_bucket
    key            = "terraform.tfstate"
    region         = "us-east-1"
    # encrypt        = true
    # dynamodb_table = "terraform_locks"
  }
}