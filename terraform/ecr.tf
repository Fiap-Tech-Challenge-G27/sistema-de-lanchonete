resource "aws_ecr_repository" "ecr-techchallenge" {
  name = "4soat-techchallenge"
  image_scanning_configuration {
    scan_on_push = true
  }
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository_policy" "my_repository_policy" {
  repository = aws_ecr_repository.ecr-techchallenge.name
  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/my-user"
      },
      "Action": [
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateImagePull",
        "ecr:TagImage"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}