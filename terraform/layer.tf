# resource "null_resource" "install_layer_deps" {
#     triggers = {
#         layer_build = filemd5("${path.module}/layers/aws-sdk/nodejs/package.json")
#     }

#     provisioner "local-exec" {
#         working_dir = "${path.module}/layers/aws-sdk-nodejs"
#         command = "npm install --production"
#     }
# }

# data "archive_file" "node_postgres_layer" {
#     type = "zip"
#     output_path = "files_lambda/aws-sdk-layer.zip"
#     source_dir = "${path.module}/layers/aws-sdk"
#     depends_on = [null_resource.install_layer_deps]
# }

# resource "aws_lambda_layer_version" "aws-sdk" {
#   layer_name = "aws-sdk-layer"
#   description = "aws-sdk:^2.1571.0"
#   filename = data.archive_file.aws-sdk-layer.output_path
#   source_code_hash = data.archive_file.node_postgres_layer.output_base64sha256
#   compatible_runtimes = ["nodejs16.x"]
# }