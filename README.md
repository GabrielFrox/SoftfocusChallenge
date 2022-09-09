# Boas  vindas ao meu repositório do desafio da SoftFocus

Esse projeto se trata de uma aplicação fullstack completa, do banco de dados ao frontend.

# Como rodar o projeto
### ⚠️ O projeto pode ser rodado com um único comando no docker caso você deseje ⚠️

Use o comando `docker-compose up -d` na pasta raiz do projeto (onde o arquivo `docker-compose.yml` se encontra) para iniciar a aplicação por inteira.

Seguem as portas de cada um dos serviços:

`Frontend: http://localhost:3000/`
`Backend: http://localhost:5000/`
`MongoDB: http://localhost:27017/`

# Caso não queira usar a versão Dockerizada

### Banco de dados:
O banco de dados é criado via Docker, então ao menos para o DB ele se torna obrigatório.

### Backend:
O backend pode ser iniciado com o comando `pip install -r requirements.txt` no terminal dentro da pasta backend.

obs: Recomendo usar um ambiente virtual para instalação das libs

Após o pip isntall execute o comando `Flask run` ou ainda `python app.py`, o backend já deve ficar disponível em `http://localhost:5000/`.

### Frontend:
Para o frontend dê um `npm install` no terminal em ./frontend/frontend e acabada a instalação use o comando `npm start`, o front end ficará disponível em `http://localhost:3000/`.

### 👀 Observações:

No header das páginas no front existe um botão `Popular banco de dados`, clicar nesse botão vai adicionar alguns dados no banco de dados para fins de testes.

## Não acaba por aqui

Melhorias ainda serão feitas no projeto, em principal uma refatoração e uma estilização com StyledComponents