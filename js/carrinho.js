
const itensCarrinho = document.getElementById("itensCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");

function exibirCarrinho() {
    const carrinho = obterDados("carrinho");

    itensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalCarrinho.textContent = formatarMoeda(0);
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement("div");
        div.className = "item-carrinho";

        const informacoes = document.createElement("div");
        informacoes.innerHTML = `
            <h3>${item.nome}</h3>
            <p>Preço: ${formatarMoeda(item.preco)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Subtotal: ${formatarMoeda(item.preco * item.quantidade)}</p>
        `;

        const botoes = document.createElement("div");

        const diminuir = document.createElement("button");
        diminuir.textContent = "−";
        diminuir.type = "button";
        diminuir.addEventListener("click", () => alterarQuantidade(item.id, -1));

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";
        aumentar.type = "button";
        aumentar.addEventListener("click", () => alterarQuantidade(item.id, 1));

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.type = "button";
        remover.addEventListener("click", () => removerProduto(item.id));

        botoes.append(diminuir, aumentar, remover);
        div.append(informacoes, botoes);

        itensCarrinho.appendChild(div);
    });

    totalCarrinho.textContent = formatarMoeda(total);
}

function alterarQuantidade(id, quantidade) {
    const carrinho = obterDados("carrinho");
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += quantidade;

    if (item.quantidade <= 0) {
        salvarDados("carrinho", carrinho.filter(produto => produto.id !== id));
    } else {
        salvarDados("carrinho", carrinho);
    }

    exibirCarrinho();
}

function removerProduto(id) {
    const carrinho = obterDados("carrinho");
    const novoCarrinho = carrinho.filter(item => item.id !== id);

    salvarDados("carrinho", novoCarrinho);
    exibirCarrinho();
}

exibirCarrinho();
