# resource "aws_iam_policy" "terraform_user_policy" {
#   name        = "TerraformUserPolicy"
#   description = "Policy for IAM user to allow Terraform to manage resources"

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect   = "Allow"
#         Action   = [
#           "cognito-idp:*",
#           "iam:*Role*",
#           "iam:*Policy*",
#           "ec2:DescribeVpcs",
#           "ec2:DescribeSubnets",
#           "rds:*"
#         ]
#         Resource = "*"
#       },
#     ]
#   })
# }

# resource "aws_iam_user_policy_attachment" "terraform_user_policy_attachment" {
#   user       = "TF" # Your IAM user's name
#   policy_arn = aws_iam_policy.terraform_user_policy.arn
# }

data "aws_iam_policy_document" "policyDocEKS" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "policyDocNodeEKS" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "roleEKS" {
  name               = "roleEKS"
  assume_role_policy = data.aws_iam_policy_document.policyDocEKS.json

  inline_policy {
    name = "EKSEC2Policy"

    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [{
        Effect   = "Allow",
        Action   = [
          "ec2:DescribeInstances",
          # Adicione outras ações necessárias para o serviço EC2
        ],
        Resource = "*",
      }],
    })
  }
}

resource "aws_iam_role" "roleNodeEKS" {
  name = "roleNodeEKS"
  assume_role_policy = data.aws_iam_policy_document.policyDocNodeEKS.json
}

resource "aws_iam_role_policy_attachment" "policyEKSAmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.roleEKS.name
}

resource "aws_iam_role_policy_attachment" "policyEKSAmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.roleEKS.name
}

resource "aws_iam_role_policy_attachment" "policyRoleNodeEKS" {
  role       = aws_iam_role.roleNodeEKS.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "cniPolicyRoleNodeEKS" {
  role       = aws_iam_role.roleNodeEKS.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "ec2PolicyRoleNodeEKS" {
  role       = aws_iam_role.roleNodeEKS.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# resource "aws_iam_role" "lambda_execution_role" {
#   name = "lambda_execution_role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "lambda.amazonaws.com"
#         }
#       },
#     ]
#   })
# }

# resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
#   role       = aws_iam_role.lambda_execution_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
# }
