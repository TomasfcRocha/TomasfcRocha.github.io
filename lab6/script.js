// ==========================================
// A. declaração de variáveis
// ==========================================

const nodeInputNumero = document.querySelector('form input[type="number"]');
const nodeInputSubmit = document.querySelector('form input[type="submit"]');
const nodeUlColecao = document.querySelector('#colecao ul');

// Nós adicionais para os repetidos e contadores
const nodeUlRepetidos = document.querySelector('#colecao #lista-repetidos');
const nodeSpanTotalCromos = document.querySelector('#colecao #total-cromos');
const nodeSpanTotalRepetidos = document.querySelector('#colecao #total-repetidos');
const nodeForm = document.querySelector('form');

// Inicialização das listas com verificação no localStorage
const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
const repetidos = JSON.parse(localStorage.getItem('repetidos')) || [];


// ==========================================
// B. event handlers
// ==========================================

function guardaCarta() {
    const valor = parseInt(nodeInputNumero.value, 10);

    // Validação para garantir que o número inserido é válido
    if (isNaN(valor)) return;

    // Verifica se já existe na coleção
    if (colecao.includes(valor)) {
        repetidos.push(valor);
        repetidos.sort((a, b) => a - b);
        localStorage.setItem('repetidos', JSON.stringify(repetidos));
    } else {
        colecao.push(valor);
        colecao.sort((a, b) => a - b);
        localStorage.setItem('colecao', JSON.stringify(colecao));
    }

    // Atualiza a renderização de ambas as listas
    atualizaLista(colecao, nodeUlColecao);
    atualizaLista(repetidos, nodeUlRepetidos);
}

function atualizaLista(lista, nodeUl) {
    // Apaga o conteúdo do nó UL correspondente
    nodeUl.innerHTML = "";

    // Verifica se o nó atual é o de repetidos comparando o ID
    const esRepetidos = nodeUl.id === "lista-repetidos";

    // Carrega o conteúdo da lista usando forEach
    lista.forEach((cromo, index) => {
        const li = document.createElement("li");

        if (esRepetidos) {
            // Se for a lista de repetidos, insere a estrutura HTML com o botão eliminar
            li.innerHTML = `${cromo} <button class="btn-eliminar" data-index="${index}">X</button>`;
        } else {
            li.textContent = cromo;
        }

        nodeUl.appendChild(li);
    });

    // Atualiza os contadores no HTML
    nodeSpanTotalCromos.textContent = colecao.length;
    nodeSpanTotalRepetidos.textContent = repetidos.length;

    // Se acabou de atualizar a lista de repetidos, é necessário reassociar os eventos aos botões novos
    if (esRepetidos) {
        associaEventosEliminar();
    }
}

function associaEventosEliminar() {
    const botoesEliminar = document.querySelectorAll('#lista-repetidos .btn-eliminar');

    botoesEliminar.forEach((botao) => {
        botao.onclick = (event) => {
            // Obtém o índice do elemento através do atributo data-index
            const indexAEliminar = parseInt(botao.getAttribute('data-index'), 10);

            // Remove o cromo da lista de repetidos
            repetidos.splice(indexAEliminar, 1);

            // Atualiza o localStorage com as alterações
            localStorage.setItem('repetidos', JSON.stringify(repetidos));

            // Atualiza a renderização
            atualizaLista(repetidos, nodeUlRepetidos);
        };
    });
}


// ==========================================
// C. event listeners
// ==========================================

nodeForm.onsubmit = (event) => {
    event.preventDefault();

    guardaCarta();

    // Limpa o formulário e foca novamente no input
    nodeForm.reset();
    nodeInputNumero.focus();
};

// Renderização inicial ao carregar a página (Recupera os dados guardados no localStorage)
atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
