"use strict";
// Classe Produto
class Produto {
    constructor(id, nome, valor, categoria, imagemUrl) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.imagemUrl = imagemUrl;
    }
    // Getters
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getValor() {
        return this.valor;
    }
    getCategoria() {
        return this.categoria;
    }
    getImagemUrl() {
        return this.imagemUrl;
    }
}
// Classe ShoppingCart
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    addToCart(produto) {
        this.items.push(produto);
        this.updateCartUI();
        mostrarNotificacao(`${produto.getNome()} foi adicionado ao carrinho.`);
    }
    getItems() {
        return this.items;
    }
    clearCart() {
        this.items = [];
        this.updateCartUI();
    }
    updateCartUI() {
        atualizarCarrinho(this.items);
    }
}
// Lista de produtos com imagens da internet e nomes em português
const produtos = [
    new Produto(1, 'Waffle com Frutas', 27.50, 'Sobremesa', './imagens/Captura de tela 2024-09-17 122650.jpg'),
    new Produto(2, 'Crème Brûlée de Baunilha', 35.00, 'Sobremesa', './imagens/front-view-delicious-creamy-dessert-with-fresh-strawberries-light-white-wall-dessert-ice-cream-sweet-fruit-taste.jpg'),
    new Produto(3, 'Macaron Mix de Cinco', 42.50, 'Sobremesa', './imagens/Captura de tela 2024-09-17 2.jpg'),
    new Produto(4, 'Tiramisu Clássico', 27.50, 'Sobremesa', './imagens/3.jpg'),
    new Produto(5, 'Baklava de Pistache', 20.00, 'Sobremesa', './imagens/Baklava-de-pistache.jpg'),
    new Produto(6, 'Torta de Limão Merengue', 30.00, 'Sobremesa', './imagens/6.jpg'),
    new Produto(7, 'Bolo Red Velvet', 27.50, 'Sobremesa', './imagens/7.jpg'),
    new Produto(8, 'Brownie de Caramelo Salgado', 30.00, 'Sobremesa', './imagens/8.jpg'),
    new Produto(9, 'Panna Cotta de Baunilha', 32.50, 'Sobremesa', './imagens/9.jpg')
];
// Função para renderizar os produtos no HTML
function renderizarProdutos(produtos) {
    const container = document.getElementById('produto-container');
    if (!container)
        return;
    produtos.forEach((produto, index) => {
        const produtoElement = document.createElement('div');
        produtoElement.classList.add('produto');
        produtoElement.dataset.index = index.toString();
        produtoElement.innerHTML = `
      <img src="${produto.getImagemUrl()}" alt="${produto.getNome()}">
      <div class="produto-info">
        <h3>${produto.getNome()}</h3>
        <p>Categoria: ${produto.getCategoria()}</p>
        <p>Preço: R$${produto.getValor().toFixed(2)}</p>
        <button class="add-to-cart">Adicionar ao Carrinho</button>
      </div>
    `;
        container.appendChild(produtoElement);
    });
}
// Função para exibir a notificação
function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.style.display = 'block';
    // Ocultar a notificação após 3 segundos
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}
// Inicializando o carrinho de compras
const cart = new ShoppingCart();
// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    cart.addToCart(produto);
}
// Função para atualizar o carrinho na tela
function atualizarCarrinho(carrinho) {
    const carrinhoCount = document.getElementById('carrinho-count');
    const carrinhoList = document.getElementById('carrinho-list');
    let total = 0;
    // Atualiza o número de itens no carrinho
    carrinhoCount.textContent = carrinho.length.toString();
    // Atualiza a lista de produtos no carrinho
    carrinhoList.innerHTML = carrinho.map(produto => {
        total += produto.getValor();
        return `<p>${produto.getNome()} - R$${produto.getValor().toFixed(2)}</p>`;
    }).join('');
    // Adiciona o total ao final da lista
    carrinhoList.innerHTML += `<p class="total">Total: R$${total.toFixed(2)}</p>`;
}
// Função para mostrar ou esconder a lista de produtos do carrinho
function toggleCarrinho() {
    const carrinhoList = document.getElementById('carrinho-list');
    carrinhoList.style.display = carrinhoList.style.display === 'block' ? 'none' : 'block';
}
// Event listener para o botão "Add to Cart"
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
        const produtoElement = target.closest('.produto');
        const produtoIndex = produtoElement === null || produtoElement === void 0 ? void 0 : produtoElement.dataset.index;
        if (produtoIndex !== undefined) {
            adicionarAoCarrinho(produtos[Number(produtoIndex)]);
        }
    }
    // Event listener para o ícone do carrinho
    if (target.closest('.carrinho-icon')) {
        toggleCarrinho();
    }
    // Event listener para o botão "Finalizar Compra"
    if (target.id === 'finalizar-compra') {
        if (cart.getItems().length > 0) {
            alert('Obrigado pela compra!');
            cart.clearCart(); // Limpa o carrinho após confirmação
        }
        else {
            alert('Seu carrinho está vazio.');
        }
    }
});
// Inicializar a renderização dos produtos
renderizarProdutos(produtos);
