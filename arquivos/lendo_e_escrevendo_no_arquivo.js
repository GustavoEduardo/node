const fs = require('fs')




const content = 'Estou escrevendo no arquivo'

fs.writeFile('./meu_arquivo.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})



fs.readFile('./meu_arquivo.txt', 'utf8' , (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})


console.log("duas funções assincrinas. Elas possuem versões sincronas!")