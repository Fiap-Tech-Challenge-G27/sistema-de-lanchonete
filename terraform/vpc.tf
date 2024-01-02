data "aws_vpc" "default" {
  default = true
}

data "aws_subnet" "public_1" {
  filter {
    name = "availability_zone"
    values = ["us-east-1a"]
  }
  filter {
    name = "cidr_block"
    values = ["10.0.0.0/16"]
  }
}

data "aws_subnet" "public_2" {
  filter {
    name = "availability_zone"
    values = ["us-east-1b"]
  }
  filter {
    name = "cidr_block"
    values = ["10.0.1.0/16"]
  }
}