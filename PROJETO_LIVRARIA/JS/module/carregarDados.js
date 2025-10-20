/***********************************************************************************************************************************************
 * Objetivo: Criar a comunicação entre a página HTML e os dados fornecidos de livros
 * (arquivo de dados ou API)
 * Data: 20/10/2025
 * Autor:   Evanildo Leal
 * Versão:  1.0 
 ***********************************************************************************************************************************************/

import  { livros    }   from    "./livros.js";

// console.log(livros[0].books[2].image)

const    setCreateCard =   function    (bibliotecaLivros){
        let divCardProdutos     =   document.getElementById('cardprodutos')

        //Cria elementos no HTML
        let     divCaixa_produto    =   document.createElement('div')

        //Adiciona um atributo ao elemento do HTML
        divCaixa_produto.setAttribute('class', 'caixa_produto')

        //Permite colocar um elemento do HTML pertencente a outro elemento (Pai e Filho)
        divCardProdutos.appendChild(divCaixa_produto)
}

window.addEventListener('load', function(){
    setCreateCard(livros)
})