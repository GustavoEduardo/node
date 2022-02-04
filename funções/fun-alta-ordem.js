
//-----------------Fução que chama outra---------------------//
let somaCinco = (y) => y+5;

let somaSete = (x) => somaCinco(x+2);


console.log(somaSete(5))


//----------------------------------map------------------------------------//

let numeros = [1,2,3,4,5,6,7,8,9,10];
let pares = [];

//Printa o valor e o indice recebido
function returnPar(valor, indice){
	console.log(`[${indice}] = [${valor}]`)
}

//map retorna valor por valor do array numeros para a função que eu mando por parametro
//essa func. pode receber até 3 parametros (valor, indice, arraycompleto)
numeros.map(returnPar)


//----------------------------------filter------------------------------------//


//retorna o valor do array se a condição da função passada for verdadeira
//poderia escrever a função fora mas passei direto
let impares = numeros.filter((valor) => valor % 2 != 0)

console.log(`Impares ${impares}`)


//----------------------------------reduce------------------------------------//
//reduz o vetor a um valor ou obj



//além da fun que recebe dois parametros, passei o estado atual sendo 5 como 2º parametro.
//Nesse caso não seria necessário definir um estado atual e o reduce assume que é a 1ª posição do vetor.
//Mas ao trabalhar com obj é importante definir o estado inicial.
let somaVetor = numeros.reduce((estado, valor) => estado + valor,5)

console.log(`A soma de todos os valores do vetor é : ${somaVetor}`)






