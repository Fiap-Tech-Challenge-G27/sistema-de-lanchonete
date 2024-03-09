# data "archive_file" "authLambdaArtefact" {
#     output_path = "files_lambda/authLambdaArtefact.zip"
#     type = "zip"
#     source_file = "${path.module}/lambda/index.js"
# }

# resource "aws_lambda_function" "auth_lambda" {
#   function_name = "authLambdaFunction"
#   handler = "index.handler"
#   role    = aws_iam_role.lambda_execution_role.arn
#   runtime = "nodejs16.x"

#   filename         = data.archive_file.authLambdaArtefact.output_path
#   source_code_hash = filebase64sha256(data.archive_file.authLambdaArtefact.output_path)

#   environment {
#     variables = {
#       COGNITO_USER_POOL_ID = "your-cognito-user-pool-id"
#     }
#   }
# }

# data "archive_file" "testUserLambdaArtefact" {
#     output_path = "files_lambda/testUserArtefact.zip"
#     type = "zip"
#     source_file = "${path.module}/lambda/testUser.js"
# }

# resource "aws_lambda_function" "testUser_lambda" {
#   function_name = "testUserLambdaFunction"
#   handler = "index.handler"
#   role    = aws_iam_role.lambda_execution_role.arn
#   runtime = "nodejs16.x"

#   filename         = data.archive_file.testuserLambdaArtefact.output_path
#   source_code_hash = filebase64sha256(data.archive_file.testUserLambdaArtefact.output_path)

#   layers = [aws_lambda_layer_version-]
# }
