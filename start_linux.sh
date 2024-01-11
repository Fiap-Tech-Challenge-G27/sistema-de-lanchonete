#!/bin/bash

# Verificar se o curl está instalado
if ! command -v curl &>/dev/null; then
  sudo apt-get install curl
fi

# Baixar o instalador do MiniKube
curl -LO https://github.com/kubernetes/minikube/releases/download/v1.24.1/minikube-linux-amd64

# Instalar o MiniKube
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Adicionar o binário do MiniKube ao PATH
echo "/usr/local/bin/minikube" >> ~/.bashrc
source ~/.bashrc

echo "MiniKube instalado"

# Baixar o kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.24.1/bin/linux/amd64/kubectl

# Instalar o kubectl
sudo install kubectl /usr/local/bin/kubectl

# Adicionar o binário do kubectl ao PATH
echo "/usr/local/bin/kubectl" >> ~/.bashrc
source ~/.bashrc

echo "kubectl instalado"

# Iniciar o MiniKube
minikube start
kubectl version --client