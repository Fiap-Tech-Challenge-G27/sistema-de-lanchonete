#!/bin/bash

# Verificar se o Docker está em execução
if ! pgrep -x "docker" > /dev/null; then
    echo "O processo do Docker não está em execução. Por favor, inicie o Docker antes de prosseguir com este script."
    exit 1
fi

# Verificar se o arquivo existe
arquivo="minikube"

if [ -f "$arquivo" ]; then
    echo "Iniciando MiniKube."

    # Iniciar o MiniKube
    ./minikube start --driver=docker
    docker context use default
else
    echo "O MiniKube não existe. Instalando..."

    # Baixar o instalador do MiniKube
    url='https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64'
    arquivo="minikube"
    wget -O $arquivo $url

    # Dar permissão de execução ao MiniKube
    chmod +x $arquivo

    # Mover o MiniKube para um diretório no PATH
    sudo mv $arquivo /usr/local/bin/

    echo "MiniKube instalado com sucesso."

    echo "Iniciando MiniKube."

    # Iniciar o MiniKube
    ./minikube start --driver=docker
    docker context use default
fi

# Verificar se o kubectl está instalado
if ! command -v kubectl &> /dev/null; then
    echo "O kubectl não está instalado. Instalando..."

    # Baixar o kubectl
    kubectlUrl="https://dl.k8s.io/release/v1.29.0/bin/linux/amd64/kubectl"
    arquivo="kubectl"

    wget $kubectlUrl -O $arquivo

    # Dar permissão de execução ao kubectl
    chmod +x $arquivo

    # Mover o kubectl para um diretório no PATH
    sudo mv $arquivo /usr/local/bin/

    echo "kubectl instalado com sucesso."

    echo "Testando kubectl."
    kubectl version --client
fi

kubectl apply -f kubernetes/postgresql/postgresql_deployment.yml
kubectl apply -f kubernetes/postgresql/postgresql_service.yml

./minikube image build -t tech_challenge_fiap_4_group_27 .

kubectl apply -f kubernetes/backend/backend_deployment.yaml
kubectl apply -f kubernetes/backend/backend_service.yml

echo "Aguardando inicialização da aplicação. (60 segundos)"
sleep 60

./minikube service backend