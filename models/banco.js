angular.module('model.banco', [])

.factory('banco', [function () {

	var banco = {};
	
	banco.openDataBase = function()
	{
		var db = openDatabase(
			'Corredor', 
			'1.0', 
			'My database',
			2 * 1024 * 1024
		);
		return db;
	}

    banco.cadastro = function(nome, sexo, equipe, cidade, idade, numero, local, cadeirante)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Corredor (nome, sexo, equipe, cidade, idade, numero, local, cadeirante)',[],
				function ()
				{
					tx.executeSql("INSERT INTO Corredor (nome, sexo, equipe, cidade, idade, numero, local, cadeirante) VALUES ('"+nome+"','"+sexo+"','"+equipe+"','"+cidade+"','"+idade+"','"+numero+"','"+local+"','"+cadeirante+"') ");
				}
			);
		});
	}

	
	banco.deletar = function(numero)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Corredor (nome, sexo, equipe, cidade, idade, numero, local, cadeirante)',[],
				function ()
				{
					tx.executeSql("DELETE FROM Corredor WHERE numero='"+numero+"'");
				}
			);
		});
	}
	
	banco.inserirTempos = function(numero, tempo)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Tempo (numero, tempo)',[],
				function ()
				{
					tx.executeSql("INSERT INTO Tempo (numero, tempo) VALUES ('"+numero+"','"+tempo+"') ");
				}
			);
		});
	}
	
	banco.createTableTempo = function(numero, tempo)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Tempo (numero, tempo)',[],
				function (){}
			);
		});
	}
	
	banco.verificarNumeroCadastradoNoTempo = function(numero, callback)
	{
		banco.createTableTempo();
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql("SELECT * FROM Tempo WHERE numero = '"+numero+"'", [],
				function (tx,results)
				{
					var row = results.rows;
					callback(row);
				}
			);
		});
	}
	
	banco.verificarNumeroCadastrado = function(numero, callback)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql("SELECT * FROM Corredor WHERE numero = '"+numero+"'", [],
				function (tx,results)
				{
					var row = results.rows;
					callback(row);
				}
			);
		});
	}
	
	banco.selecione = function(callback)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql("SELECT * FROM Corredor", [],
				function (tx,results)
				{
					var row = results.rows;
					callback(row);
				}
			);
		});
	}
	
	banco.selecioneTempos = function(callback)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql("SELECT * FROM Tempo", [],
				function (tx,results)
				{
					var row = results.rows;
					callback(row);
				}
			);
		});
	}


    return banco;
}]);