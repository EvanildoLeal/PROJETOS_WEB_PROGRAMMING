/***********************************************************************************************************************************************
 * Objetivo: Criar a comunicação entre a página HTML e os dados fornecidos de livros
 * (arquivo de dados ou API)
 * Data: 20/10/2024
 * Autor: Evanildo Leal
 * Versão: 2.0 
 * Git: https://github.com/marcelnt/curso-ead-unifecaf.git
 * API: 'https://www.googleapis.com/books/v1/volumes?q=javascript+programming&maxResults=20';
 ***********************************************************************************************************************************************/

import { livros } from "./livros.js";

const setCreateCard = function(bibliotecaLivros) {
    let divCardProdutos = document.getElementById('cardProdutos');
    
    // Limpa o conteúdo anterior
    divCardProdutos.innerHTML = '';

    bibliotecaLivros[0].books.forEach(function(itemLivro) {
        // Cria elementos no HTML
        let divCaixa_produto = document.createElement('div');
        let h2Caixa_titulo = document.createElement('h2');
        let figureCaixa_imagem = document.createElement('figure');
        let imgProduto = document.createElement('img');
        let divCaixa_texto = document.createElement('div');
        let pTextoProduto = document.createElement('p');
        let divComprar = document.createElement('div');

        // Adiciona atributos aos elementos
        divCaixa_produto.setAttribute('class', 'caixa_produto');
        h2Caixa_titulo.setAttribute('class', 'caixa_titulo');
        figureCaixa_imagem.setAttribute('class', 'caixa_imagem');
        imgProduto.setAttribute('src', itemLivro.image);
        imgProduto.setAttribute('alt', `Capa do livro: ${itemLivro.title}`);
        imgProduto.setAttribute('title', itemLivro.title);
        divCaixa_texto.setAttribute('class', 'caixa_texto');
        divComprar.setAttribute('class', 'comprar');

        // Texto dos elementos
        h2Caixa_titulo.innerText = itemLivro.title.length > 30 ? 
            itemLivro.title.substring(0, 30) + '...' : itemLivro.title;
        
        pTextoProduto.innerText = itemLivro.subtitle || 
            "Descrição não disponível para este livro.";
        
        divComprar.innerText = 'Comprar';

        // Adiciona evento de clique no botão comprar
        divComprar.addEventListener('click', function() {
            if(itemLivro.url && itemLivro.url !== '#') {
                window.open(itemLivro.url, '_blank');
            } else {
                alert(`Informações sobre: ${itemLivro.title}`);
            }
        });

        // Monta a estrutura HTML
        divCardProdutos.appendChild(divCaixa_produto);
        divCaixa_produto.appendChild(h2Caixa_titulo);
        divCaixa_produto.appendChild(figureCaixa_imagem);
        figureCaixa_imagem.appendChild(imgProduto);
        divCaixa_produto.appendChild(divCaixa_texto);
        divCaixa_texto.appendChild(pTextoProduto);
        divCaixa_produto.appendChild(divComprar);
    });
}

const getDadosLivrosAPI = async function() {
    try {
        console.log('Tentando conectar com a API...');
        
        // API do Google Books (funcionando)
        let url = 'https://www.googleapis.com/books/v1/volumes?q=javascript+programming&maxResults=20';
        
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        let dados = await response.json();
        
        // Formata os dados para o padrão do seu projeto
        const livrosFormatados = [{
            "genero": "Livros de Programação",
            "books": dados.items.map(item => ({
                "title": item.volumeInfo.title || "Título não disponível",
                "subtitle": item.volumeInfo.subtitle || item.volumeInfo.description?.substring(0, 100) + '...' || "Descrição não disponível",
                "isbn13": item.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A",
                "price": item.saleInfo?.listPrice?.amount ? `$${item.saleInfo.listPrice.amount}` : "Preço não disponível",
                "image": item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || "https://via.placeholder.com/128x196?text=Sem+Imagem",
                "url": item.volumeInfo.infoLink || "#"
            }))
        }];
        
        console.log('Dados da API carregados com sucesso!');
        setCreateCard(livrosFormatados);
        
    } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
        console.log('Usando dados locais como fallback...');
        // Usa os dados locais como fallback
        setCreateCard(livros);
    }
}

// Carrega os dados quando a página é carregada
window.addEventListener('load', function() {
    // Primeiro carrega os dados locais para mostrar algo rapidamente
    setCreateCard(livros);
    
    // Depois tenta buscar da API
    setTimeout(() => {
        getDadosLivrosAPI();
    }, 1000);
});