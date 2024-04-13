const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
} )

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
} )

document.addEventListener("DOMContentLoaded", function() {
    const botonCarrito = document.querySelector('.botoncarrito');
    const cart = document.querySelector('.cart');

    // Agregar evento de clic al botón del carrito
    botonCarrito.addEventListener('click', toggleCart);

    function toggleCart() {
        // Alternar la visibilidad del carrito cambiando su clase
        cart.classList.toggle('show');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll('.product');
    const cartList = document.querySelector('.cart-list');
    const totalElement = document.querySelector('.total span');
    const clearCartButton = document.querySelector('.clear-cart');

    let cart = [];

    // Agregar evento al botón "Añadir al carrito"
    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(product));
    });

    // Agregar evento al botón "Limpiar carrito"
    clearCartButton.addEventListener('click', clearCart);

    // Función para agregar un producto al carrito
    function addToCart(product) {
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.querySelector('.price').textContent.replace(/\./g, '').replace('$', ''));

        const existingProduct = cart.find(item => item.id === productId);

        if(existingProduct) {
            existingProduct.quantity +=1;
        } else {
            cart.push({id:productId, name: productName, price: productPrice, quantity: 1});
        }

        updateCartUI();
    }

    function updateCartUI() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            // Formatea el precio del producto con separadores de miles
            const formattedPrice = (item.price * item.quantity).toLocaleString('es-AR');
            listItem.innerHTML = `${item.name} x${item.quantity} - $${formattedPrice} <button class="remove-item" data-id="${item.id}">Eliminar</button>`;
            cartList.appendChild(listItem);
            total += item.price * item.quantity;
        });
    
        totalElement.textContent = `$${total.toLocaleString('es-AR')}`;
    
    

        // Agregar evento a los botones de eliminar productos
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });
    }

    // Función para eliminar un producto del carrito
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    // Función para limpiar el carrito
    function clearCart() {
        cart = [];
        updateCartUI();
    }
});


