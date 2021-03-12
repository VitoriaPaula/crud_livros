const http = require('http');
const express = require('express');
const app = express();
const porta = 3000;
var id = 2;
const livros = [
    {
        id: 1,
        nome: 'Jogos Vorazes',
        descricao: 'Livro de Fantasia sobre um governo ruim e rebeliões.',
        edicao: 1,
        autor: 'Suzanne Collins',
        isbn: 9780439023481
    },
    {
        id: 2,
        nome: 'Percy Jackson e o Ladrão de Raios',
        descricao: 'Livro de Fantasia sobre semideuses e seres da mitologia grega',
        edicao: 1,
        autor: 'Rick Riordan',
        isbn: 9781423121701
    }
];
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', porta);
app.get("/livros", (req, res, next) => {
    res.json(livros);
});
app.post('/livros', (req, res, next) => {
    const livro = req.body;
    livros.push({
        id: id += 1,
        nome: livro.nome,
        descricao: livro.descricao,
        edicao: livro.edicao,
        autor: livro.autor,
        isbn: livro.isbn
    });
    console.log(livros);
    res.status(201).json(livros);
});
app.delete('/livros/:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) => {
        if (livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    res.status(200).json(livros);
});
app.put('/livros', (req, res, next) => {
    const livro = req.body;
    livros.forEach((liv2) => {
        if (liv2.id === livro.id) {
            liv2.nome = livro.nome;
            liv2.descricao = livro.descricao;
            liv2.edicao = livro.edicao;
            liv2.autor = livro.autor;
            liv2.isbn = livro.isbn;
            return res.status(200).json(livros);
        }
    });
    return res.status(404);
});
const server = http.createServer(app);
server.listen(3000);
