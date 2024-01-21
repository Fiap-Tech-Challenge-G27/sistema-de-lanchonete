# # Executar o script como administrador
Set-ExecutionPolicy RemoteSigned

if ($null -eq (Get-Process Docker)) {
    Write-Host "O processo do Docker nao existe. Por favor, inicie o Docker antes de prosseguir com este script."
    exit
}

# Verificar se o arquivo existe
$arquivo = "minikube.exe"

if (Test-Path $arquivo) {
    Write-Host "Iniciando MiniKube."

    # Iniciar o MiniKube
    # .\minikube.exe start --driver=docker
    .\minikube.exe start --driver=docker
    docker context use default
}
else {
    Write-Host "O minikube nao existe. Instalando..."

    # Baixar o instalador do MiniKube
    $url = 'https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe'
    $arquivo = "minikube.exe"
    Invoke-WebRequest -Uri $url -OutFile $arquivo -UseBasicParsing

    # Instalar o MiniKube
    Start-Process $arquivo -Wait

    # Adicionar o binário do MiniKube ao PATH
    $path = [Environment]::GetEnvironmentVariable("Path")
    $path += ";$(Get-Location)\minikube"
    [Environment]::SetEnvironmentVariable("Path", $path)

    # Adicionar o diretório ao PATH
    [System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE", [System.EnvironmentVariableTarget]::User)

    Write-Host "MiniKube instalado com sucesso."

    Write-Host "Iniciando MiniKube."

    # Iniciar o MiniKube
    # .\minikube.exe start --driver=docker
    .\minikube.exe start --driver=docker
    docker context use default
}

$isKubectlInstalled = Get-Command -Name "kubectl"

if ($null -eq $isKubectlInstalled) {
    Write-Host "O kubectl nao esta instalado. Instalando..."

    $kubectlUrl = "https://dl.k8s.io/release/v1.29.0/bin/windows/amd64/kubectl.exe"
    $arquivo2 = "kubectl.exe"

    Invoke-WebRequest -Uri $kubectlUrl -OutFile $arquivo2

    $path = [Environment]::GetEnvironmentVariable("Path")
    $path += ";$(Get-Location)\kubectl"
    [Environment]::SetEnvironmentVariable("Path", $path)

    # Adicionar o diretório ao PATH
    [System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE", [System.EnvironmentVariableTarget]::User)

    Write-Host "kubectl instalado com sucesso."

    Write-Host "Testando kubectl."

    .\kubectl.exe version --client

}

kubectl apply -f kubernetes/postgresql/postgresql_deployment.yml
kubectl apply -f kubernetes/postgresql/postgresql_service.yml
# .\minikube service --url=true postgresql

.\minikube image build -t tech_challenge_fiap_4_group_27  .

kubectl apply -f kubernetes/backend/backend_deployment.yaml
kubectl apply -f kubernetes/backend/backend_service.yml 

