$isDockerDesktopRunning = Get-Process Docker

if ($isDockerDesktopRunning -eq $null) {
    Write-Host "O processo do Docker nao existe. Por favor, inicie o Docker antes de prosseguir com este script."
    exit
}

Write-Host "Iniciando instalacao do MiniKube."
# # Executar o script como administrador
Set-ExecutionPolicy RemoteSigned

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

Write-Host "MiniKube instalado com sucesso."
Write-Host "Iniciando MiniKube."

# Iniciar o MiniKube
.\minikube.exe start

Write-Host "Iniciando instalação do kubectl."

$kubectlUrl = "https://dl.k8s.io/release/v1.29.0/bin/windows/amd64/kubectl.exe"
$arquivo2 = "kubectl.exe"

Invoke-WebRequest -Uri $kubectlUrl -OutFile $arquivo2

$path = [Environment]::GetEnvironmentVariable("Path")
$path += ";$(Get-Location)\kubectl"
[Environment]::SetEnvironmentVariable("Path", $path)

# Adicionar o diretório ao PATH
[System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE", [System.EnvironmentVariableTarget]::User)

Write-Host "kubectl instalado com sucesso."

.\kubectl.exe version --client
# docker build -t techchallenge .docker/
# .\minikube.exe image load techchallenge
# kubectl apply -f deployment.yaml