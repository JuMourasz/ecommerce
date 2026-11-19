
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const quantidadeProdutos = carrinho.reduce((total, item) => {
    return total + item.quantidade;
}, 0);

const linkCarrinho = document.querySelector('.nav-links a[href="carrinho.html"]');

if (linkCarrinho) {
    linkCarrinho.textContent = `Carrinho (${quantidadeProdutos})`;
}

const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent = `© ${new Date().getFullYear()} ShopEase - Todos os direitos reservados.`;
}
