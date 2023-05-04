const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//==========Config==========
	//==========Template Engine==========
	app.engine('handlebars', handlebars.engine());
	app.set('view engine', 'handlebars');

	//==========Body Parser==========
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());

//==========Rotas==========
app.get('/', (req, res) => {
	Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
		res.render(__dirname + '/views/layouts/home.handlebars', {posts: posts});
	});
});

app.get('/cad', (req, res) => {
	res.render(__dirname + '/views/layouts/formulario.handlebars');
});

app.post('/add', (req, res) => {
	Post.create({
		placa: req.body.placa,
		valorLitro: req.body.valorLitro,
		litrosAbastecidos: req.body.litrosAbastecidos,
		kmVeiculo: req.body.kmVeiculo,
		dataAbastecimento:req.body.dataAbastecimento
	}).then(() => {
		res.redirect('/')
	}).catch(() => {
		res.send(`Houve um erro: ${erro}!`)
	});
});

//==========SERVIDOR==========
app.listen(8081, () => {
	console.log("Servidor rodando na url http://localhost:8081")
});