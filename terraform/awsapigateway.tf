# resource "aws_api_gateway_rest_api" "api" {
#   name        = "AuthenticationAPI"
#   description = "API for user authentication"
# }

# resource "aws_api_gateway_resource" "auth_resource" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   parent_id   = aws_api_gateway_rest_api.api.root_resource_id
#   path_part   = "auth"
# }

# resource "aws_api_gateway_method" "auth_method" {
#   rest_api_id   = aws_api_gateway_rest_api.api.id
#   resource_id   = aws_api_gateway_resource.auth_resource.id
#   http_method   = "POST"
#   authorization = "NONE"
# }

# resource "aws_api_gateway_integration" "lambda_integration" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   resource_id = aws_api_gateway_resource.auth_resource.id
#   http_method = aws_api_gateway_method.auth_method.http_method

#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = aws_lambda_function.auth_lambda.invoke_arn
# }

# # Deploy the API Gateway
# resource "aws_api_gateway_deployment" "api_deployment" {
#   depends_on = [aws_api_gateway_integration.lambda_integration]

#   rest_api_id = aws_api_gateway_rest_api.api.id
# #   stage_name  = "prod"
# }

# # Give API Gateway permissions to invoke the Lambda function
# resource "aws_lambda_permission" "api_gateway_invoke" {
#   statement_id  = "AllowExecutionFromAPIGateway"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.auth_lambda.function_name
#   principal     = "apigateway.amazonaws.com"

#   # Source ARN for the API Gateway method
#   source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/auth"
# }