var calc = require("./calculadora");

console.log(calc.soma(5,5))
console.log(calc.divisao(5,5))
console.log(calc.multiplicacao(5,5))
console.log(calc.divisao(5,5))



console.log(calc.nome)//não exportei no modulo calculadora, por isso será undefined