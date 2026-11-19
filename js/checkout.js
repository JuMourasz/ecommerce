
const formCheckout = document.getElementById("formCheckout");
const totalCheckout = document.getElementById("totalCheckout");
const mensagemCheckout = document.getElementById("mensagemCheckout");

const carrinhoAtual = obterDados("carrinho");

function calcularTotal() {
    return carrinhoAtual.reduce((total, item) => {
        return total + item.preco * item.quantidade;
    }, 0);
}

if (totalCheckout) {
    totalCheckout.textContent = formatarMoeda(calcularTotal());
}

if (formCheckout) {
    formCheckout.addEventListener("submit", function(event) {
        event.preventDefault();

        const carrinho = obterDados("carrinho");

        if (carrinho.length === 0) {
            mensagemCheckout.textContent = "Seu carrinho está vazio. Adicione produtos antes de finalizar.";
            mensagemCheckout.style.color = "#dc2626";
            return;
        }

        const nome = document.getElementById("nomeCliente").value.trim();
        const email = document.getElementById("emailCliente").value.trim();
        const cep = document.getElementById("cep").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const pagamento = document.getElementById("pagamento").value;

        if (!nome || !email || !cep || !endereco || !cidade || !pagamento) {
            mensagemCheckout.textContent = "Preencha todos os campos.";
            mensagemCheckout.style.color = "#dc2626";
            return;
        }

        const pedido = {
            numero: Date.now(),
            cliente: nome,
            email: email,
            cep: cep,
            endereco: endereco,
            cidade: cidade,
            pagamento: pagamento,
            produtos: carrinho,
            total: calcularTotal(),
            data: new Date().toLocaleString("pt-BR")
        };

        const pedidos = obterDados("pedidos");

        pedidos.push(pedido);

        salvarDados("pedidos", pedidos);
        salvarDados("carrinho", []);

        localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

        window.location.href = "pedido-confirmado.html";
    });
}
