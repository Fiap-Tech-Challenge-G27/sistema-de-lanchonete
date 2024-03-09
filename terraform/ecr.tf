# resource "aws_ecr_repository" "ecrTechChallenge" {
#   name = "eksImagem"
# }

# resource "docker_registry_image" "eksImagem" {
#   name          = "eksImagem"
#   image_name    = "${aws_ecr_repository.ecrTechChallenge.repository_url}:latest"
#   build {
#     context    = "${path.module}/Dockerfile"
#     dockerfile = "${path.module}/Dockerfile"
#     args = {
#       // Argumentos para a construção da imagem
#     }
#   }
#   registry_auth {
#     username = aws_ecr_repository.ecrTechChallenge.registry_id
#     password = aws_ecr_repository.ecrTechChallenge.repository_url
#   }
# }