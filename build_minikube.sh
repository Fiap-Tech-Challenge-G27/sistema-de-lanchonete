docker build -t techchallenge .docker/Dockerfile
minikube image load techchallenge
kubectl rollout force -f deployment.yaml