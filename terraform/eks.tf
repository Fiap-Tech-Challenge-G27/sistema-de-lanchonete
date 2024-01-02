# resource "aws_eks_cluster" "main" {
#   name = "my-eks-cluster"
#   version = "1.21"
#   role_arn = aws_iam_role.eks_service_account.arn
#   vpc_config {
#     # Obtém a VPC padrão da AWS
#     vpc_id = data.aws_vpc.default.id
#     # Obtém as subnets padrão da AWS
#     subnet_ids = [data.aws_subnet.public_1.id, data.aws_subnet.public_2.id]
#   }

#   node_group_config {
#     name = "fargate"
#     min_size = 1
#     max_size = 1
#     node_type = "fargate.standard.medium"
#   }
# }

# resource "aws_iam_role" "eks_service_account" {
#   name = "my-eks-service-account"
#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "eks.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# EOF
# }


module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "my-eks-cluster"
  subnets         = ["subnet-xxxxxxxxxxxxxxxxx", "subnet-yyyyyyyyyyyyyyyyy"] # Subnets existentes na região us-east-1
  vpc_id          = "vpc-xxxxxxxxxxxxxxxxx" # VPC existente na região us-east-1
  cluster_version = "1.21" # Versão do Kubernetes
  cluster_create_timeout = "30m" # Tempo limite para criação do cluster

  fargate_profiles = {
    default = {
      subnets = ["subnet-xxxxxxxxxxxxxxxxx", "subnet-yyyyyyyyyyyyyyyyy"] # Subnets existentes na região us-east-1
    }
  }
}

output "kubeconfig" {
  value       = module.eks.kubeconfig
  description = "Kubeconfig para acessar o cluster EKS"
}