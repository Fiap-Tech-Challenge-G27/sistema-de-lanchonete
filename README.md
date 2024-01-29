# Tech Challenge - Grupo 27

### Integrantes

| RM     | Nome                         | E-mail                           |
| ------ | ---------------------------- | -------------------------------- |
| 351039 | Kaio Amaral Bispo            | kaioamaral411@gmail.com          |
| 351160 | MATHEUS DE MELLO VIEIRA      | mellomatheus67@gmail.com         |
| 351153 | Samuel Ferreira Pimentel     | samuelferpim@gmail.com           |
| 351426 | HIAGO FILIPE SANTOS DE SOUZA | hiagofss98@gmail.com             |
| 350866 | Hugo Maia da Silva Marques   | hugomaiadasilvamarques@gmail.com |

### Instruções para execução do projeto

<details>
<summary>Clique <b>aqui</b> para execução do projeto em <b>Linux</b></summary>

#### Pré-requisitos:

1. Docker instalado e sendo executado no ambiente
2. Perfil administrador no ambiente

#### Passos:
1. Faça um Clone do [repositório](https://github.com/hiagofss/fiap-tech-challenge-01).
2. Entre na pasta do projeto.
3. Abra o terminal e execute o comando a seguir como <b>administrador</b>

```bash
sh start_linux.sh
```
4. Após a aplicação inicializar, se desejar realizar um teste de carga, execute o comando abaixo:

 ```bash
sh scripts/load_generator.sh
```
5. Ao ser solicitado, passe como parâmetro a URL interna do Minikube (e não a de túnel) que está exposta com a porta 30001, visto que o teste rodará internamente no cluster
6. Digite o número de pods de stress test que serão criados para gerar carga na aplicação

</details>
<br/>
<details>
<summary>Clique <b>aqui</b> para execução do projeto em <b>Windows</b></summary>

#### Pré-requisitos:

1. Docker instalado e sendo executado no ambiente
2. Perfil administrador no ambiente 

#### Passos:
1. Faça um clone do [repositório](https://github.comd/hiagofss/fiap-tech-challenge-01).
2. Entre na pasta do projeto.
3. Abra o terminal e execute o comando a seguir como <b>administrador</b>

```powershell
.\start_windows.ps1
```

4. Após a aplicação inicializar, se desejar realizar um teste de carga, execute o comando abaixo:

 ```powershell
.\scripts\load_generator.ps1
```
5. Ao ser solicitado, passe como parâmetro a URL interna do Minikube (e não a de túnel) que está exposta com a porta 30001, visto que o teste rodará internamente no cluster
6. Digite o número de pods de stress test que serão criados para gerar carga na aplicação
</details>


### Observações:


A aplicação será executada na porta exposta pelo serviço do Minikube. Altere a porta de execução das chamadas de API conforme necessário (ver vídeo de demonstração para exemplo prático).
Ao acessar a rota <b>/api-docs</b> no navegador você terá acesso ao Swagger que poderá ser utilizado para executar as interações com a aplicação. Caso prefiram foi disponibilizado na pasta [/docs](https://github.com/hiagofss/fiap-tech-challenge-01/tree/main/docs) o arquivo com a Collection do [Postman](https://github.com/hiagofss/fiap-tech-challenge-01/blob/main/docs/Fiap_TechChallenge_G27.postman_collection.json), apenas altere as variáveis de ambiente de <b>baseUrl</b> e <b>mockUrl</b> para o endpoint e porta correspondentes do Minikube.

### Documentações

1. [DDD](https://github.com/hiagofss/fiap-tech-challenge-g27/wiki/DDD)
2. [Arquitetura de Software e Infraestrutura](https://github.com/hiagofss/fiap-tech-challenge-g27/wiki/Arquitetura-de-Software-e-Infraestrutura)
