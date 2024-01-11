# # Executar o script como administrador
# Set-ExecutionPolicy RemoteSigned

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

$kubectlUrl = "https://storage.googleapis.com/kubernetes-release/release/v1.22.3/bin/windows/amd64/kubectl.exe"
$kubectlPath = "$env:USERPROFILE\kubectl.exe"

Invoke-WebRequest -Uri $kubectlUrl -OutFile $kubectlPath

# Adicionar o diretório ao PATH
[System.Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE", [System.EnvironmentVariableTarget]::User)

Write-Host "kubectl instalado com sucesso."


# Iniciar o MiniKube
.\minikube.exe start
kubectl version --client