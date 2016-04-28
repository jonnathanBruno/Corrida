angular.module('CorridaApp', ['model.banco'])
.controller('cadastrarController', function($scope, banco)
{
	$scope.cadastrarCorredor = function(corredor){
		
		var nome = corredor.nome;
		var sexo = corredor.sexo;
		var equipe = corredor.equipe;
		var cidade = corredor.cidade;
		var idade = corredor.idade;
		var numero = corredor.numero;
			
		banco.cadastro(nome, sexo, equipe, cidade, idade, numero);
		alert("cadastro realizado!");
		$scope.corredoresCadastrados();
	}
	
	$scope.corredoresCadastrados = function(){	
		banco.selecione(function(retorno){
			var corredores = retorno;
			localStorage.setItem("corredores", JSON.stringify(corredores));
		});
	}
	
	$scope.atualizarCorredores = function(){
		$scope.corredores = JSON.parse(localStorage.getItem("corredores"));
	}
})