// ==========================================
// // A. Estado e Variáveis
// ==========================================

// Inicializa a chave 'produtos-selecionados' no localStorage caso não exista
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// ==========================================
// // B. Funções utilitárias
// ==========================================

/**
 * Cria o elemento HTML (<article>) para a lista de produtos da loja
 */
function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto-card');

    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('produto-descricao');

    const preco = document.createElement('p');
    preco.textContent = `Preço: €${produto.price.toFixed(2)}`;
    preco.classList.add('produto-preco');

    const rating = document.createElement('p');
    rating.textContent = `Rating: ⭐ ${produto.rating}`;
    rating.classList.add('produto-rating');

    // Cria o botão "+ Adicionar ao cesto"
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = "+ Adicionar ao cesto";
    botaoAdicionar.classList.add('btn-adicionar');

    // EventListener para adicionar o produto ao localStorage ao clicar
    botaoAdicionar.addEventListener('click', () => {
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));
        cestoAtual.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));

        // Atualiza a interface do cesto imediatamente
        atualizaCesto();
    });

    article.append(titulo, descricao, preco, rating, botaoAdicionar);
    return article;
}

/**
 * Cria o elemento HTML (<article>) específico para um item dentro do cesto
 */
function criaProdutoCesto(produto, index) {
    const article = document.createElement('article');
    article.classList.add('cesto-item');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `€${produto.price.toFixed(2)}`;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add('btn-remover');

    // Remove o item usando o indice com splice
    botaoRemover.addEventListener('click', () => {
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));

        cestoAtual.splice(index, 1);

        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
        atualizaCesto();
    });

    article.append(titulo, preco, botaoRemover);
    return article;
}

/**
 * Renderiza a lista principal de produtos disponíveis na loja
 */
function renderizarProdutos(listaDeProdutos) {
    const sectionProdutos = document.querySelector('#produtos');
    sectionProdutos.innerHTML = '';

    listaDeProdutos.forEach(produto => {
        const novoArticle = criarProduto(produto);
        sectionProdutos.append(novoArticle);
    });
}

/**
 * Renderiza os produtos guardados no cesto e calcula o preço total
 */
function atualizaCesto() {
    const sectionCesto = document.querySelector('#cesto');
    sectionCesto.innerHTML = '';

    // Cria a estrutura interna do cesto de forma dinâmica
    const tituloCesto = document.createElement('h2');
    tituloCesto.textContent = "O Seu Cesto";

    const containerItens = document.createElement('div');
    containerItens.classList.add('cesto-itens-container');

    const totalElemento = document.createElement('div');
    totalElemento.classList.add('cesto-total');

    // Procura a lista atualizada no localStorage
    const listaCesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    let precoTotal = 0;

    // Percorre os itens do cesto passando o index para permitir a remoção correta
    listaCesto.forEach((produto, index) => {
        const novoArticle = criaProdutoCesto(produto, index);
        containerItens.append(novoArticle);

        precoTotal += produto.price;
    });

    // Define o valor do preço total acumulado
    totalElemento.textContent = `Preço Total: €${precoTotal.toFixed(2)}`;

    // Monta a secção final do cesto
    sectionCesto.append(tituloCesto, containerItens, totalElemento);
}

// ==========================================
// // C. Inicialização da Página
// ==========================================

// 1. Renderiza os produtos da loja (dados vindos de produtos.js)
renderizarProdutos(produtos);

// 2. Renderiza o cesto com o que já estiver guardado no localStorage
atualizaCesto();
