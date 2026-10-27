// // B. Funções utilitárias

function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto-card');

    // Usando as propriedades comuns em inglês (mude se o seu ficheiro produtos.js usar português)
    const titulo = document.createElement('h2');
    titulo.textContent = produto.title; // ou produto.titulo

    const descricao = document.createElement('p');
    descricao.textContent = produto.description; // ou produto.descricao

    const preco = document.createElement('p');
    preco.textContent = `Preço: €${produto.price.toFixed(2)}`; // ou produto.preco

    const rating = document.createElement('p');
    rating.textContent = `Rating: ⭐ ${produto.rating}`;

    article.append(titulo, descricao, preco, rating);
    return article;
}

function renderizarProdutos(listaDeProdutos) {
    // Seleciona a section <section id="produtos"> do seu HTML
    const sectionProdutos = document.querySelector('#produtos');

    // Limpa a secção para não duplicar se a função for chamada mais que uma vez
    sectionProdutos.innerHTML = '';

    // Percorre a lista e insere cada <article> na secção
    listaDeProdutos.forEach(produto => {
        const novoArticle = criarProduto(produto);
        sectionProdutos.append(novoArticle);
    });
}

// Para testar e ver o resultado na página:
// Certifique-se de que 'produtos' é o nome da variável que vem do seu ficheiro 'produtos.js'
renderizarProdutos(produtos);
