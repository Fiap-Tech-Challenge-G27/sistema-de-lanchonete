# Declara uma variável para armazenar o input do usuário
$inputURL = ""

# Solicita o input do usuário
Write-Host "Digite a URL interna do cluster da aplicacao (nao confundir com URL do tunel criado pelo Minikube):"
$inputURL = Read-Host

Write-Host "Digite a quantidade de pods de stress test para gerar carga:"
$numberOfPods = Read-Host

# $numberOfPods = 30
Write-Host "Executando teste de carga em background"

try {
    for ($i = 1; $i -le $numberOfPods; $i++) {
        kubectl run load-generator-$i --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- $inputURL; done" 
    }

    # Monitora o HPA backend
    kubectl get hpa backend --watch

} finally {
    Write-Host "Deletando pods de teste de carga"

    for ($i = 1; $i -lt $numberOfPods; $i++) {
        kubectl delete pod load-generator-$i 
    }
}