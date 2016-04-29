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
		if(corredor.corredorLocal != undefined)
			var local = "sim";
		else
			var local = "não";
		
		if(corredor.cadeirante != undefined)
			var cadeirante = "sim";
		else
			var cadeirante = "não";
		
		banco.verificarNumeroCadastrado(numero,function(resultado){
			if(resultado.length == 0){
				banco.cadastro(nome, sexo, equipe, cidade, idade, numero, local, cadeirante);
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
		$scope.atualizarClassificacao();
	}
	
	$scope.excluirCorredor = function(numero, indice){
		var r = confirm("Tem certeza que quer excluir?");
		if (r == true) {
			banco.deletar(numero);
			banco.deletarTempo(numero);
			$scope.corredores.splice(indice, 1);
			$scope.corredoresCadastrados();
		} 
	}	
	
	$scope.atualizarClassificacao = function(){
		banco.selecioneTempos(function(resultado){
			$scope.tempos = resultado;
			banco.selecione(function(resultado){
				var tempo = $scope.tempos;
				var corredores = resultado;
				$scope.corredorTempo = [];
				var aux = 0;
				
				for(var i=0; i<corredores.length; i++){
					for(var u=0; u<tempo.length; u++){
						if(corredores[i].numero == tempo[u].numero){
							$scope.corredorTempo[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"tempo":tempo[u].tempo};
						}								
					}
				}
				
				$scope.corredorTempoCadeirante = [];
				var aux = 0;
				
				for(var i=0; i<corredores.length; i++){
					for(var u=0; u<tempo.length; u++){
						if(corredores[i].numero == tempo[u].numero && corredores[i].cadeirante == "sim"){
							$scope.corredorTempoCadeirante[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"tempo":tempo[u].tempo};
						}								
					}
				}
				
				$scope.corredorTempoLocal = [];
				var aux = 0;
				for(var i=0; i<corredores.length; i++){
					for(var u=0; u<tempo.length; u++){
						if(corredores[i].numero == tempo[u].numero && corredores[i].local == "sim"){
							$scope.corredorTempoLocal[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"tempo":tempo[u].tempo};
						}								
					}
				}
				
				$scope.corredorTempoFaixa = [];
				var aux = 0;
				for(var i=0; i<corredores.length; i++){
					for(var u=0; u<tempo.length; u++){
						if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=16 && corredores[i].idade<=19)){//16-19
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"16-19",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=20 && corredores[i].idade<=24)){//20-24
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"20-24",
														"tempo":tempo[u].tempo};	
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=25 && corredores[i].idade<=29)){//25-29
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"25-29",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=30 && corredores[i].idade<=34)){//30-34
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"30-34",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=35 && corredores[i].idade<=39)){//35-39
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"35-39",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=40 && corredores[i].idade<=44)){//40-44
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"40-44",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=45 && corredores[i].idade<=49)){//45-49
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"45-49",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=50 && corredores[i].idade<=54)){//50-54
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"50-54",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=55 && corredores[i].idade<=59)){//55-59
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"55-59",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=60 && corredores[i].idade<=64)){//60-64
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"60-64",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=65 && corredores[i].idade<=69)){//65-69
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"65-69",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=70 && corredores[i].idade<=74)){//70-74
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"70-74",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=75 && corredores[i].idade<=79)){//75-79
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"75-79",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=80 && corredores[i].idade<=84)){//80-84
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"80-84",
														"tempo":tempo[u].tempo};
						}else if(corredores[i].numero == tempo[u].numero && (corredores[i].idade>=85 && corredores[i].idade<=90)){//85-90
							$scope.corredorTempoFaixa[aux++] = {
														"nome":corredores[i].nome, 
														"sexo":corredores[i].sexo,
														"equipe":corredores[i].equipe,
														"cidade":corredores[i].cidade,
														"idade":corredores[i].idade,
														"numero":corredores[i].numero,
														"local":corredores[i].local,
														"cadeirante":corredores[i].cadeirante,
														"faixa":"85-90",
														"tempo":tempo[u].tempo};
						}															
						
					}
					
				}
				
				$scope.$apply();		
			})
		})
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
							alert("Tempo salvo!");
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