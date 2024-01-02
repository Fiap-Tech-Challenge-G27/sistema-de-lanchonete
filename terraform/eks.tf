resource "aws_eks_cluster" "eks-4soat-techchallenge" {
  name = "eks-4soat-techchallenge"
  version = "1.21"
  role_arn = aws_iam_role.eks_service_account.arn

  vpc_config {
    vpc_id = aws_vpc.main.id
    subnet_ids = [aws_subnet.private_subnets[*].id]
  }
}

resource "aws_iam_role" "eks_service_account" {
  name = "my-eks-service-account"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_service_account.name
}

# Optionally, enable Security Groups for Pods
# Reference: https://docs.aws.amazon.com/eks/latest/userguide/security-groups-for-pods.html
resource "aws_iam_role_policy_attachment" "AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.eks_service_account.name
}

output "endpoint" {
  value = aws_eks_cluster.eks-4soat-techchallenge.endpoint
}

output "kubeconfig-certificate-authority-data" {
  value = aws_eks_cluster.eks-4soat-techchallenge.certificate_authority[0].data
}

resource "aws_eks_fargate_profile" "example" {
  cluster_name = aws_eks_cluster.eks-4soat-techchallenge.name
  fargate_profile_name = "techchallenge-fargate-profile"
  subnet_ids = [aws_subnet.private_subnets[*].id]
  pod_execution_role_arn = aws_iam_role.fargate_execution_role.arn

  selector {
    namespace = "default"
  }

}

resource "aws_iam_role" "fargate_execution_role" {
  name = "eks-fargate-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "eks-fargate-pods.amazonaws.com",
        },
      },
    ],
  })
}