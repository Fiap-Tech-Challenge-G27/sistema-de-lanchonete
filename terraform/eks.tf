resource "aws_eks_cluster" "clusterTechChallenge" {
  name     = "techchallenge"
  role_arn = aws_iam_role.roleEKS.arn

  vpc_config {
    subnet_ids = [aws_default_subnet.subnetTechChallenge.id, aws_default_subnet.subnetTechChallenge2.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.policyEKSAmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.policyEKSAmazonEKSVPCResourceController,
  ]
}

resource "aws_eks_node_group" "my_node_group" {
  cluster_name    = aws_eks_cluster.clusterTechChallenge.name
  node_group_name = "nodeTechChallenge"
  node_role_arn   = aws_iam_role.roleEKS.arn
  subnet_ids      = [aws_default_subnet.subnetTechChallenge.id, aws_default_subnet.subnetTechChallenge2.id]

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }
}


#########################################################################################################################################

data "aws_caller_identity" "current" {}

resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend"
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name = "backend"
          image = "kaiobispo/techchallenge:latest"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name = "backend"
  }

  spec {
    selector = {
      app = "backend"
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_deployment" "payment_mock" {
  metadata {
    name = "payment-mock"
    labels = {
      app = "payment-mock"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "payment-mock"
      }
    }

    template {
      metadata {
        labels = {
          app = "payment-mock"
        }
      }

      spec {
        container {
          name = "payment-mock"
          image = "kaiobispo/techchallenge:latest"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "payment_mock" {
  metadata {
    name = "payment-mock"
  }

  spec {
    selector = {
      app = "payment-mock"
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}



