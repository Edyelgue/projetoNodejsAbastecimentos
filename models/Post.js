const db = require('./db')

const Post = db.sequelize.define('abastecimentos', {
	placa: {
		type: db.Sequelize.STRING
	},
	valorLitro: {
		type: db.Sequelize.FLOAT
	},
	litrosAbastecidos: {
		type: db.Sequelize.FLOAT
	},
	kmVeiculo: {
		type: db.Sequelize.INTEGER
	},
	dataAbastecimento: {
		type: db.Sequelize.DATE
	}
});

module.exports = Post

//Post.sync({force: true});