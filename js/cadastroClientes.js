/**********************************************************************************************************************************************
 *  Objetivo: Manipular dados de cadastro e listagem de dados
 * Data: 15/10/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 * https://github.com/EvanildoLeal/PROJETOS_WEB_PROGRAMMING.git
 *************************************************************************************************************************************************/         

/*
    var - Cria uma variavel/objeto (metodo mais antigo)

    let - Cria uma variavel/objeto de nível de escopo local do projeto (cria dentro de uma função)

    const - Cria uma constante de nível de escopo local ou global no projeto

    Conversão de dados
        String para número
            Number()
            parsenInt()
            parseFloat()

        Numero para String
            String()

*/    
// Escopo Global
const botaoSalvar = document.getElementById('salvar')
const nome = document.getElementById('nome')
const email = document.getElementById('email')

var contadorRegistros = 1

// Função para retirar e validar os dados do formulário
const getDados = function(){
    // let nome   = document.getElementById('nome')
    // let email   = document.getElementById('email')
    let status  = true

    // Zera as cores das caixas sempre no inicio de uma validação
    nome.style.backgroundColor = '#ffffff'
    email.style.backgroundColor = '#ffffff'
    
    // Validação de Dados
    if(nome.value == ''){
        alert('O campo Nome não pode ser em branco. ')
        nome.style.backgroundColor = '#ed766d'
        status = false
    }

    if(email.value == ''){
        alert('O campo Email não pode ser em branco. ')
        email.style.backgroundColor = '#ed766d'
    }

    return status
}

//Função para inserir novos dados na lista de clientes
const setDadosList = function(){
        // console.log('Processo de listagem de dados')
        if(contadorRegistros    <=4){
            let colunaNome = document.getElementById('nome'+contadorRegistros)
            let colunaEmail = document.getElementById('email'+contadorRegistros)

            colunaNome.innerText = nome.value
            colunaEmail.innerText  = email.value

            contadorRegistros   +=1
        }else{
                alert('Não é possível inserir novos clientes!')    
        }
            
        
}

// Função para impedir a digitação de números - CORRIGIDA
const blockNumber = function(tecla){
    // Verifica se é um número (0-9)
    if (tecla.charCode >= 48 && tecla.charCode <= 57){
        return false // Bloqueia números
    }
    return true // Permite outros caracteres
}

// Função de evento click para o botão Salvar
botaoSalvar.addEventListener('click', function(){
    //Se os dados estiverem OK, então iremos chamar a função para listar os dados
    if  (getDados()){
        setDadosList()
    }
});

nome.addEventListener('keypress', function(event){
    // Se blockNumber retornar false, previne a digitação
    if(blockNumber(event) === false){
        event.preventDefault() 
    }
})

