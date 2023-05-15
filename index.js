const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const moment = require('moment');


//==========Config==========
//==========Template Engine==========
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', //Defina em sua view ou no meu caso no layout main.js
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        },
        formatValorLitro: (value) => {
        	return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        },
        formatLitrosAbastecidos: (value) => {
        	return value.toLocaleString()
        },
        formatKm: (value) => {
        	return value.toLocaleString()
        }
    }
}));
app.set('view engine', 'handlebars');

//==========Body Parser==========
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//==========Rotas==========
app.get('/login', (req, res) => {
	res.render(__dirname + '/views/layouts/login.handlebars');
});

app.get('/login/cadastrar', (req, res) => {
	res.render(__dirname + '/views/layouts/formulario.handlebars');
});

app.post('/add', (req, res) => {
	Post.create({
		placa: req.body.placa,
		valorLitro: req.body.valorLitro,
		litrosAbastecidos: req.body.litrosAbastecidos,
		kmVeiculo: req.body.kmVeiculo.toLocaleString('en-US'),
		dataAbastecimento: req.body.dataAbastecimento
	}).then(() => {
		res.redirect('/login/cadastrar/abastecimentos')
	}).catch(() => {
		res.send(`Houve um erro: ${erro}!`)
	});
});

app.get('/login/cadastrar/abastecimentos', (req, res) => {
	Post.findAll({ order: [['id', 'DESC']] }).then((posts) => {
		res.render(__dirname + '/views/layouts/home.handlebars', { posts: posts });
	});
});

//==========SERVIDOR==========
app.listen(8081, () => {
	console.log("Servidor rodando na url http://localhost:8081")
});