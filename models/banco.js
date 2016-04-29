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

    banco.cadastro = function(nome, sexo, equipe, cidade, idade, numero)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Corredor (nome, sexo, equipe, cidade, idade, numero)',[],
				function ()
				{
					tx.executeSql("INSERT INTO Corredor (nome, sexo, equipe, cidade, idade, numero) VALUES ('"+nome+"','"+sexo+"','"+equipe+"','"+cidade+"','"+idade+"','"+numero+"') ");
				}
			);
		});
	}
	
	 banco.update = function(id, nome, id_usuario, nomeAntigo)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS lista (id, nome, id_usuario)',[],
				function ()
				{
					console.log(nomeAntigo);
					tx.executeSql(" UPDATE lista SET id="+id+", nome='"+nome+"', id_usuario='"+id_usuario+"' WHERE nome='"+nomeAntigo+"'");
				}
			);
		});
	}
	
	banco.deletar = function(numero)
	{
		var db = banco.openDataBase();
		db.transaction( function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Corredor (nome, sexo, equipe, cidade, idade, numero)',[],
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
	
	banco.verificarNumeroCadastradoNoTempo = function(numero, callback)
	{
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

    return banco;
}]);