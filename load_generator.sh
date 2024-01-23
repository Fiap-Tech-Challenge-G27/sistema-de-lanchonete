#!/bin/bash

# Declara uma variável para armazenar o input do usuário
input=""

# Solicita o input do usuário
read -p "Digite a URL interna do cluster da aplicação (não confundir com URL do tunel criado pelo Minikube):" input

echo "Executando teste de carga em background"

numberOfPods=30

for (( c=1; c<=$numberOfPods; c++ ))
do  
    kubectl run load-generator-$c --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- $input; done" 
done

kubectl get hpa backend --watch