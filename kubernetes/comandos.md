# Preparativos

Limpar o minikube:
```bash
minikube delete
minikube start
```

# Postgresql
Esteja na pasta `/kubernetes` no seu terminal

```bash
kubectl apply -f postgresql/postgresql_deployment.yml
kubectl apply -f postgresql/postgresql_service.yml
```

Para pegar o url que para acessar o banco de dados diretamente, digite:
```bash
minikube service --url=true postgresql
```

# Backend
