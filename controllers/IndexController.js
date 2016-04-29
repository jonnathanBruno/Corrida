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
			
		banco.verificarNumeroCadastrado(numero,function(resultado){
			if(resultado.length == 0){
				banco.cadastro(nome, sexo, equipe, cidade, idade, numero);
				alert("cadastro realizado!");			
				$scope.corredoresCadastrados();
			}else{
				alert("Numero já cadastrado!");		
			}
		})
	}
	
	$scope.corredoresCadastrados = function(){	
		banco.selecione(function(retorno){
			var corredores = retorno;
			localStorage.numeroDeCorredoresCadastrados = corredores.length;
			localStorage.setItem("corredores", JSON.stringify(corredores));
		});
	}
						 
	$scope.atualizarCorredores = function(){
		$scope.corredores = [];
		$scope.objArray = JSON.parse(localStorage.getItem("corredores"));
		for(var i=0; i<localStorage.numeroDeCorredoresCadastrados; i++){
			$scope.corredores[i] = $scope.objArray[i];
		}
	}
	
	$scope.excluirCorredor = function(numero){
		var r = confirm("Tem certeza que quer excluir?");
		if (r == true) {
			banco.deletar(numero);
			$scope.corredoresCadastrados();
		} 
	}	
	
}).controller('chegadaController', function($scope, banco){
	
	$scope.salvarChegada = function(numero){
		if(localStorage.stop != "true"){
			var tempo = document.getElementById("vis").innerHTML;
			
			banco.verificarNumeroCadastrado(numero,function(resultado){
				if(resultado.length != 0){
					banco.verificarNumeroCadastradoNoTempo(numero,function(resultado){
						if(resultado.length == 0){
							banco.inserirTempos(numero, tempo);
						}else{
							alert("Esse numero já foi cadastrado!");		
						}
					})
				}else{
					alert("Nenhum corredor com esse numero!");		
				}
			})
		}else{
			alert("Inicie o tempo!");
		}
	}
})

//####### CRONOMETRO #######//
var ore = 0, minuti = 0, secondi = 0, decimi = 0;
var vis = "";
localStorage.stop = true;

function avvia() {
	if(localStorage.stop == "true") {
		localStorage.stop = false;
		cronometro();
	}
}

function cronometro() {
	if(localStorage.stop == "false") {
		decimi++;
		if(decimi > 9) {
			decimi = 0;
			secondi++;
		}
		if(secondi > 59) {
			secondi = 0;
			minuti++;
		}
		if(minuti > 59) {
			minuti = 0;
			ore++;
		}
		mostra();
		setTimeout("cronometro()", 100);
	}
}

function mostra() {
	if(ore < 10) vis = "0"; else vis = ore;
	if(minuti < 10) vis = vis + "0";
	vis = vis + minuti + ":";
	if(secondi < 10) vis = vis + "0";
	vis = vis + secondi + ":" + decimi;
	document.getElementById("vis").innerHTML = vis;
}
function ferma() {
	localStorage.stop = true;
}
function azzera() {
	if(localStorage.stop == "false") {
		localStorage.stop = true;
	}
    ore = minuti = secondi = decimi = 0;
	vis = "";
	mostra();
}