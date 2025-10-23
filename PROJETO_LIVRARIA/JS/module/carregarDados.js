/***********************************************************************************************************************************************
 * Objetivo: Criar a comunicação entre a página HTML e os dados fornecidos de livros
 * (arquivo de dados ou API)
 * Data: 20/10/2025
 * Autor:   Evanildo Leal
 * Versão:  1.0 
 ***********************************************************************************************************************************************/

import  { livros    }   from    "./livros.js";

// console.log(livros[0].books[2].image)

const    setCreateCard        =   function    (bibliotecaLivros){
        let divCardProdutos    =   document.getElementById('cardProdutos')

        bibliotecaLivros[0].books.forEach(function(itemLivro){
            //Cria elementos no HTML
            let divCaixa_produto       = document.createElement('div')
            let h2Caixa_titulo            = document.createElement('h2')
            let figureCaixa_imagem  = document.createElement('figure')
            let imgProduto               = document.createElement('img')
            let divCaixa_texto           = document.createElement('div')
            let pTextoProduto          = document.createElement('p')
            let divComprar               = document.createElement('div')

            
            //Adiciona um atributo ao elemento do HTML
            divCaixa_produto.setAttribute('class', 'caixa_produto')
            h2Caixa_titulo.setAttribute      ('class',    'caixa_titulo')
            figureCaixa_imagem.setAttribute('class', 'caixa_imagem')
            imgProduto.setAttribute('src' ,  itemLivro.image)
            imgProduto.setAttribute('alt' ,  'Imagem de Livro')
            imgProduto.setAttribute('title' ,  'Livro de TI')
            divCaixa_texto.setAttribute('class', 'caixa_texto')
            divComprar.setAttribute('class',    'comprar')
            
            

            // Texto dos elementos no HTML
            h2Caixa_titulo.innerText    =  itemLivro.title
            pTextoProduto.innerText    =  itemLivro.subtitle
            divComprar.innerText    =   'Comprar'

            //Permite colocar um elemento do HTML pertencente a outro elemento (Pai e Filho)
            divCardProdutos.appendChild(divCaixa_produto)
            divCaixa_produto.appendChild(h2Caixa_titulo)
            divCaixa_produto.appendChild(figureCaixa_imagem)
            figureCaixa_imagem.appendChild(imgProduto)
            divCaixa_produto.appendChild(divCaixa_texto)
            divCaixa_texto.appendChild(pTextoProduto )
            divCaixa_produto.appendChild(divComprar)

            })

}                                                                       

window.addEventListener('load', function(){
    setCreateCard(livros)
})