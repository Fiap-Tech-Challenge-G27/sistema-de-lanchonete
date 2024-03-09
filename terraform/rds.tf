# resource "aws_db_instance" "postgresdb" {
#   allocated_storage    = 10
#   db_name              = "app"
#   engine               = "postgres"
#   engine_version       = "15"
#   instance_class       = "db.t3.micro"
#   username             = "adminPostres"
#   password             = "adminPostgres"
#   skip_final_snapshot  = true
# }