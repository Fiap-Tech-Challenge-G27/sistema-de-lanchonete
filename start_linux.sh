#!/bin/bash

# Verificar se o Docker está em execução
if ! command -v docker &> /dev/null; then
    echo "O Docker não existe. Por favor, instale e inicie o Docker antes de prosseguir com este script."
    exit 1
fi

if command -v minikube &> /dev/null; then
    echo "Iniciando MiniKube."
    # Iniciar o MiniKube
    minikube start --driver=docker
    docker context use default
else
    echo "O MiniKube não existe. Instalando..."
    # Baixar o instalador do MiniKube
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    echo "MiniKube instalado com sucesso."
    echo "Iniciando MiniKube."
    # Iniciar o MiniKube
    minikube start --driver=docker
    docker context use default
fi

# Verificar se o kubectl está instalado
if ! command -v kubectl &> /dev/null; then
    echo "O kubectl não está instalado. Instalando..."
    # Baixar o kubectl
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    echo "kubectl instalado com sucesso."
    echo "Testando kubectl."
    kubectl version --client
fi

kubectl apply -f kubernetes/postgresql/postgresql_deployment.yml
kubectl apply -f kubernetes/postgresql/postgresql_service.yml

minikube image build -t tech_challenge_fiap_4_group_27 .

kubectl apply -f kubernetes/backend/backend_deployment.yaml
kubectl apply -f kubernetes/backend/backend_service.yml

echo "Aguardando inicialização da aplicação. (60 segundos)"
sleep 60

minikube service backend