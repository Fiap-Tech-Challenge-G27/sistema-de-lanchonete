# resource "aws_cognito_user_pool" "user_pool_techchallenge" {
#   name = "techchallenge"

#   username_attributes = ["email"]
#   auto_verified_attributes = []

#   schema {
#     attribute_data_type = "String"
#     name = "cpf"
#     required = false
#     mutable = false

#     string_attribute_constraints {
#       min_length = 11
#       max_length = 11
#     }
#   }

#   password_policy {
#     minimum_length = 8
#     require_lowercase = true
#     require_numbers = true
#     require_symbols = true
#     require_uppercase = true
#   }
# }
#
