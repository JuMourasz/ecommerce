
const produtosLoja = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        descricao: "Fone sem fio com ótima qualidade de som.",
        preco: 89.90,
        imagem: "assets/images/produto1.jpg" 
    },
    {
        id: 2,
        nome: "Smartwatch",
        descricao: "Relógio inteligente para o dia a dia.",
        preco: 159.90,
        imagem: "assets/images/produto2.jpg" 
    },
    {
        id: 3,
        nome: "Mochila Casual",
        descricao: "Mochila moderna e espaçosa.",
        preco: 119.90,
        imagem: "assets/images/produto3.jpg" 
    },
    {
        id: 4,
        nome: "Tênis Esportivo",
        descricao: "Conforto para acompanhar sua rotina.",
        preco: 199.90,
        imagem: "assets/images/produto4.jpg" 
    },
    {
        id: 5,
        nome: "Câmera Digital",
        descricao: "Registre seus melhores momentos.",
        preco: 349.90,
        imagem: "assets/images/produto5.jpg" 
    },
    {
        id: 6,
        nome: "Caixa de Som",
        descricao: "Som potente e conexão Bluetooth.",
        preco: 129.90,
        imagem: "assets/images/produto6.jpg" 
    }
];

function obterDados(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

window.produtosLoja = produtosLoja;
window.obterDados = obterDados;
window.salvarDados = salvarDados;
window.formatarMoeda = formatarMoeda;
