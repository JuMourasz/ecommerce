
const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("campoPesquisa");
const mensagemProdutos = document.getElementById("mensagemProdutos");

function exibirProdutos(lista) {
    listaProdutos.innerHTML = "";

    if (lista.length === 0) {
        mensagemProdutos.textContent = "Nenhum produto encontrado.";
        return;
    }

    mensagemProdutos.textContent = "";

    lista.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;
        imagem.textContent = produto.emoji;
        imagem.style.fontSize = "75px";
        imagem.style.padding = "20px";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const descricao = document.createElement("p");
        descricao.textContent = produto.descricao;

        const preco = document.createElement("p");
        preco.className = "preco";
        preco.textContent = formatarMoeda(produto.preco);

        const botao = document.createElement("button");
        botao.className = "btn";
        botao.textContent = "Adicionar ao carrinho";
        botao.dataset.id = produto.id;

        card.append(imagem, nome, descricao, preco, botao);
        listaProdutos.appendChild(card);
    });
}

exibirProdutos(produtosLoja);

campoPesquisa.addEventListener("input", function() {
    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    const produtosFiltrados = produtosLoja.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa)
    );

    exibirProdutos(produtosFiltrados);
});

listaProdutos.addEventListener("click", function(event) {
    if (event.target.matches("button[data-id]")) {
        const id = Number(event.target.dataset.id);

        const produto = produtosLoja.find(item => item.id === id);

        if (!produto) return;

        const carrinho = obterDados("carrinho");

        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                emoji: produto.emoji,
                quantidade: 1
            });
        }

        salvarDados("carrinho", carrinho);

        event.target.textContent = "Adicionado!";

        setTimeout(function() {
            event.target.textContent = "Adicionar ao carrinho";
        }, 1000);
    }
});
