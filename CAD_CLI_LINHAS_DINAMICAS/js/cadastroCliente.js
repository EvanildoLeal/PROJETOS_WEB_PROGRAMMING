/************************************************************************************************************
 * **********************************************************************************************************
 * Objetivo: Manipular dados de cadastro e Listagem de dados
 * Data: 15/10/2025
 * Autor: Evanildo Leal
 * versão 1.0
 * https://github.com/EvanildoLeal/PROJETOS_WEB_PROGRAMMING.git
 ***********************************************************************************************************/
/*
        var     -     Cria uma variável/objeto    (método mais antigo)

        let     -     Cria uma variável/objeto de nível de escopo Local do projeto (cria dentro de uma função)

        const   -     Cria uma constate de nível de escopo Local ou global no projeto
        
        Conversão de dados

                String para número
                    Number( )
                    parsent( )
                    parseFloat( )

                    Número para String

                    String
    */


// Elementos do DOM
const botaoSalvar = document.getElementById('salvar');
const botaoLimpar = document.getElementById('limpar');
const botaoLimparTodos = document.getElementById('limparTodos');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const corpoTabela = document.getElementById('corpo-tabela');
const contador = document.getElementById('contador');
const linhaVazia = document.getElementById('linha-vazia');

// Contador de clientes
let totalClientes = 0;

// Função para atualizar o contador
const atualizarContador = function() {
    contador.textContent = `${totalClientes} ${totalClientes === 1 ? 'cliente' : 'clientes'}`;
};

// Função para validar dados
const getDados = function() {
    let status = true;

    // Resetar cores
    nome.style.backgroundColor = '#ffffff';
    email.style.backgroundColor = '#ffffff';

    // Validação de dados
    if (nome.value.trim() === '') {
        alert('O campo Nome não pode ser em branco.');
        nome.style.backgroundColor = '#ed766d';
        nome.focus();
        status = false;
    } else if (email.value.trim() === '') {
        alert('O campo Email não pode ser em branco.');
        email.style.backgroundColor = '#ed766d';
        email.focus();
        status = false;
    } else if (!validarEmail(email.value)) {
        alert('Por favor, insira um email válido.');
        email.style.backgroundColor = '#ed766d';
        email.focus();
        status = false;
    }

    return status;
};

// Função para validar email
const validarEmail = function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Função para adicionar cliente à lista
const setDadosList = function() {
    // Remover linha vazia se existir
    if (linhaVazia) {
        linhaVazia.remove();
    }

    // Criar nova linha
    const novaLinha = document.createElement('tr');
    
    // Criar células
    const celulaNome = document.createElement('td');
    const celulaEmail = document.createElement('td');
    const celulaAcoes = document.createElement('td');
    
    // Adicionar valores
    celulaNome.textContent = nome.value;
    celulaEmail.textContent = email.value;
    
    // Botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.onclick = function() {
        if (confirm(`Deseja realmente excluir o cliente ${nome.value}?`)) {
            novaLinha.remove();
            totalClientes--;
            atualizarContador();
            
            // Mostrar mensagem de vazio se não houver mais clientes
            if (totalClientes === 0) {
                corpoTabela.appendChild(linhaVazia);
            }
        }
    };
    
    celulaAcoes.appendChild(btnExcluir);
    
    // Adicionar células à linha
    novaLinha.appendChild(celulaNome);
    novaLinha.appendChild(celulaEmail);
    novaLinha.appendChild(celulaAcoes);
    
    // Adicionar linha à tabela
    corpoTabela.appendChild(novaLinha);
    
    // Atualizar contador
    totalClientes++;
    atualizarContador();
    
    // Limpar formulário
    nome.value = '';
    email.value = '';
    nome.focus();
    
    // Mostrar mensagem de sucesso
    mostrarMensagemSucesso();
};

// Função para mostrar mensagem de sucesso
const mostrarMensagemSucesso = function() {
    const mensagem = document.createElement('div');
    mensagem.textContent = 'Cliente cadastrado com sucesso!';
    mensagem.className = 'mensagem-sucesso';
    
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        document.body.removeChild(mensagem);
    }, 3000);
};

// Função para limpar formulário
const limparFormulario = function() {
    nome.value = '';
    email.value = '';
    nome.style.backgroundColor = '#ffffff';
    email.style.backgroundColor = '#ffffff';
    nome.focus();
};

// Função para limpar todos os clientes
const limparTodosClientes = function() {
    if (totalClientes === 0) {
        alert('Não há clientes para limpar.');
        return;
    }
    
    if (confirm(`Deseja realmente excluir todos os ${totalClientes} clientes?`)) {
        // Manter apenas a linha vazia
        corpoTabela.innerHTML = '';
        corpoTabela.appendChild(linhaVazia);
        
        // Resetar contador
        totalClientes = 0;
        atualizarContador();
        
        alert('Todos os clientes foram removidos.');
    }
};

// Função para salvar dados
const salvarDados = function() {
    if (getDados()) {
        setDadosList();
    }
};

// Função para impedir a digitação de números no campo nome
const blockNumber = function(tecla) {
    if (tecla.charCode >= 48 && tecla.charCode <= 57) {
        return false;
    }
    return true;
};

// Função para inicializar a aplicação
const inicializarApp = function() {
    // Foca no campo nome ao carregar a página
    nome.focus();
    atualizarContador();
    
    // Configurar event listeners
    botaoSalvar.addEventListener('click', salvarDados);
    botaoLimpar.addEventListener('click', limparFormulario);
    botaoLimparTodos.addEventListener('click', limparTodosClientes);

    nome.addEventListener('keypress', function(event) {
        if (!blockNumber(event)) {
            event.preventDefault();
        }
    });

    // Permitir submit do formulário com Enter
    nome.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            salvarDados();
        }
    });

    email.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            salvarDados();
        }
    });

    // Melhorar acessibilidade
    botaoSalvar.setAttribute('aria-label', 'Salvar cadastro do cliente');
    botaoLimpar.setAttribute('aria-label', 'Limpar formulário');
    botaoLimparTodos.setAttribute('aria-label', 'Limpar todos os clientes');
};

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarApp);