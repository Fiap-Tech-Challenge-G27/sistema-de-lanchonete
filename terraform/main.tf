terraform {
  required_version = ">= 1.3, <= 1.7.4"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.65"
    }
  }
}

provider "aws" {
  region = var.aws-region
}
