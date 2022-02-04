let nome = "Gustavo"

function soma(a,b){
	return `O resultado de ${a}+${b} é ${a+b}`;
}

function subtracao(a,b){
	return a*b;
}

function multiplicacao(a,b) {
	return a*b;
}

function divisao(a,b) { 
	return a/b;

}


module.exports = {
	soma,
	subtracao,
	multiplicacao,
	divisao
};