/**********************************************************************************************************************************************
 *  Objetivo: Manipular dados de cadastro e listagem de dados
 * Data: 15/10/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 * 
 *************************************************************************************************************************************************/         

/*
    var - Cria uma variavel/objeto (metodo mais antigo)

    let - Cria uma variavel/objeto de nível de escopo local do projeto (cria dentro de uma função)

    const - Cria uma constante de nível de escopo local ou global no projeto
*/    
//Escopo Global
const botaoSalvar = document.getElementById('salvar')




const getDados = function(){
    let nome = document.getElementById('nome')
    let email = document.getElementById('email')

    console.log(nome.value)
    console.log(email.value)
}
    
botaoSalvar.addEventListener('click', function(){
        getDados()
})

