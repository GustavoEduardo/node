<h1>Passos para executar o projeto.</h1>

<h4>1º Mudar as propriedades de conexão do arquivo connection.js na pasta database.</h4>

        host: Não alterar para executar com o banco local, ou informar ip do servidor onde o banco estará.
        user: Informar o seu usuário do banco de dados.
        password: Informar a sua senha do banco de dados.
        database: Informar o nome da base de dados onde estarão as tabelas.

        A conexão com o mysql deve estar em execução.

<h4>2º Executar o comando <i>nmp install</i> na pasta do projeto.</h4>

        Dessa forma a pasta node_modules será criada com todas as dependências.
        A mesma não sobe para o github conforme especificado no arquivo .gitignore.

<h4>3° Executar o comando <i>node index.js</i> na pasta do projeto.</h4>
        A api será executada na porta especificada no arquivo index.js na raiz do projeto.
        A porta atual é a 8081, e deverá estar disponível caso não seja alterada.


<h4>Pronto! A api está em execução.</h4>
<h4>Obrigado.</h4>
