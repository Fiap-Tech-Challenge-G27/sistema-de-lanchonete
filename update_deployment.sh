#!/bin/bash

# Substituir {{VERSION}} no arquivo deployment.yaml com a nova versão
sed -i "s/{{VERSION}}/$1/g" kubernetes/backend/backend_deployment.yaml