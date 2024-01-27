# Preparativos

Limpar o minikube:
```bash
minikube delete
minikube start
minikube addons enable metrics-server
```

# Postgresql
Esteja na pasta na pasta raiz

```bash
kubectl apply -f kubernetes/postgresql/postgresql_deployment.yml
kubectl apply -f kubernetes/postgresql/postgresql_service.yml
```

Para pegar o url que para acessar o banco de dados diretamente, digite:
```bash
minikube service --url=true postgresql
```

# Backend
Vamos começar construindo a imagem
```bash
minikube image build -t tech_challenge_fiap_4_group_27  .
```

```bash
kubectl apply -f kubernetes/backend/backend_deployment.yaml
kubeclt apply -f kubernetes/backend/backend_service.yml 
```

