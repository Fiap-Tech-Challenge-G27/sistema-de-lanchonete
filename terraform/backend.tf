terraform {
  backend "s3" {
    bucket         = aws_s3_bucket.my_bucket.bucket
    key            = "terraform.tfstate"
    region         = "us-east-1"
    # encrypt        = true
    # dynamodb_table = "terraform_locks"
  }
}