import express from 'express';


import session from 'express-session';

import cookieParser from 'cookie-parser';



const app = express();

app.use(session({
    secret: 'M1nh4chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }


}));


app.use(cookieParser());




app.use(express.urlencoded({ extended: true }));

app.use(express.static('./paginas/publica'));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function menuView(req, resp) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu Principal</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(135deg, #6a11cb, #2575fc);
                    color: #fff;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .menu-container {
                    text-align: center;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 30px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .menu-title {
                    font-size: 2.5em;
                    margin-bottom: 20px;
                }
                .menu-btn {
                    display: block;
                    width: 80%;
                    margin: 10px auto;
                    padding: 15px;
                    font-size: 18px;
                    border: none;
                    border-radius: 10px;
                    background: #ff7eb3;
                    color: #fff;
                    transition: transform 0.3s, background 0.3s;
                    text-decoration: none;
                    text-align: center;
                }
                .menu-btn:hover {
                    background: #ff6584;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="menu-container">
                <h1 class="menu-title">Menu Principal</h1>
                <a class="menu-btn" href="/cadastrarProduto">Cadastrar Produto</a>
                <a class="menu-btn" href="/logout">Sair</a>
            </div>
        </body>
        </html>
    `);
}
function cadastroProdutoView(req, resp, erros = {}) {
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Produtos</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background: #1e1e2f;
                    color: #eee;
                    font-family: Verdana, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .form-container {
                    width: 500px;
                    background: #29293d;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }
                .form-title {
                    font-size: 1.8em;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .form-control {
                    background: #1e1e2f;
                    color: #eee;
                    border: 1px solid #444;
                    border-radius: 8px;
                }
                .form-control:focus {
                    border-color: #ff7eb3;
                    outline: none;
                }
                .btn-submit {
                    display: block;
                    width: 100%;
                    padding: 15px;
                    font-size: 16px;
                    color: #fff;
                    background: #ff7eb3;
                    border: none;
                    border-radius: 10px;
                    transition: transform 0.3s, background 0.3s;
                }
                .btn-submit:hover {
                    background: #ff6584;
                    transform: scale(1.05);
                }
                .error-text {
                    color: #ff6584;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h1 class="form-title">Cadastro de Produtos</h1>
                <form method="POST" action="/cadastrarProduto">
                    <div class="mb-3">
                        <label for="produto" class="form-label">Nome do Produto</label>
                        <input type="text" id="produto" name="produto" value="${req.body.produto || ''}" class="form-control">
                        ${erros.produto ? `<p class="error-text">${erros.produto}</p>` : ''}
                    </div>
                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoria</label>
                        <input type="text" id="categoria" name="categoria" value="${req.body.categoria || ''}" class="form-control">
                        ${erros.categoria ? `<p class="error-text">${erros.categoria}</p>` : ''}
                    </div>
                    <div class="mb-3">
                        <label for="preco" class="form-label">Preço</label>
                        <input type="number" step="0.01" id="preco" name="preco" value="${req.body.preco || ''}" class="form-control">
                        ${erros.preco ? `<p class="error-text">${erros.preco}</p>` : ''}
                    </div>
                    <div class="mb-3">
                        <label for="quantidade" class="form-label">Quantidade</label>
                        <input type="number" id="quantidade" name="quantidade" value="${req.body.quantidade || ''}" class="form-control">
                        ${erros.quantidade ? `<p class="error-text">${erros.quantidade}</p>` : ''}
                    </div>
                    <div class="mb-3">
                        <label for="fornecedor" class="form-label">Fornecedor</label>
                        <input type="text" id="fornecedor" name="fornecedor" value="${req.body.fornecedor || ''}" class="form-control">
                        ${erros.fornecedor ? `<p class="error-text">${erros.fornecedor}</p>` : ''}
                    </div>
                    <button type="submit" class="btn-submit">Cadastrar Produto</button>
                </form>
            </div>
        </body>
        </html>
    `);
}


function cadastrarProduto(req, resp) {
    const { produto, categoria, preco, quantidade, fornecedor } = req.body;
    let erros = {};

    let dataHoraUltimoAcesso = req.cookies['dataHoraUltimoAcesso'] || '';

    if (!produto) erros.produto = "Por favor, você deve informar o nome do produto.";
    if (!categoria) erros.categoria = "Por favor, você deve informar a categoria.";
    if (!preco || isNaN(preco)) erros.preco = "Por favor, informe um preço válido.";
    if (!quantidade || isNaN(quantidade)) erros.quantidade = "Por favor, informe uma quantidade válida.";
    if (!fornecedor) erros.fornecedor = "Por favor, você deve informar o fornecedor.";

    if (Object.keys(erros).length > 0) {
        return cadastroProdutoView(req, resp, erros);
    }

    const novoProduto = { produto, categoria, preco, quantidade, fornecedor };
    listaProdutos.push(novoProduto);

    resp.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: #f9f9f9;
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 800px;
                        background-color: #ffffff;
                        margin: 50px auto;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        font-size: 24px;
                        color: #333;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        margin-top: 20px;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 10px 15px;
                        text-align: left;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #4caf50;
                        color: white;
                    }
                    .ultimo-acesso {
                        font-size: 14px;
                        color: #555;
                        margin-top: 10px;
                    }
                    .actions {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        text-decoration: none;
                        color: white;
                        border-radius: 8px;
                        margin: 5px;
                        transition: background-color 0.3s;
                    }
                    .btn-primary {
                        background-color: #4caf50;
                    }
                    .btn-primary:hover {
                        background-color: #45a049;
                    }
                    .btn-secondary {
                        background-color: #555;
                    }
                    .btn-secondary:hover {
                        background-color: #444;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Produtos Cadastrados</h2>
                    <p class="ultimo-acesso">Seu último acesso foi realizado em: ${dataHoraUltimoAcesso}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Fornecedor</th>
                            </tr>
                        </thead>
                        <tbody>
    `);

    listaProdutos.forEach((produto) => {
        resp.write(`
            <tr>
                <td>${produto.produto}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.fornecedor}</td>
            </tr>
        `);
    });

    resp.write(`
                        </tbody>
                    </table>
                    <div class="actions">
                        <a class="btn btn-primary" href="/cadastrarProduto">Cadastrar Novo Produto</a>
                        <a class="btn btn-secondary" href="/">Voltar ao Menu</a>
                    </div>
                </div>
            </body>
        </html>
    `);

    resp.end();
}

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoAcesso', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});

        resp.redirect('/');

    }
    else{
        resp.send(`
                    <html>
                        <head>
                         <meta charset="utf-8">
                         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="container w-25"> 
                                <div class="alert alert-danger" role="alert">
                                    Usuário ou senha inválidos!
                                </div>
                                <div>
                                    <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossorigin="anonymous">
                        </script>
                    </html>
                  `
        );
    }
}

function verificarAutenticacao(req, resp, next){
    if(req.session.usuarioLogado){
        next();
    }
    else{
        resp.redirect('/login.html');
    }
}




app.get('/login', (req, resp)=>{
   resp.redirect('/login.html');
});

app.get('/logout', (req, resp)=>{
    req.session.destroy();
    resp.redirect('/login.html');
})
app.post('/login', autenticarUsuario);
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarProduto', verificarAutenticacao, cadastroProdutoView);
app.post('/cadastrarProduto', verificarAutenticacao, cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
