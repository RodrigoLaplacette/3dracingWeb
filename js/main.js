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

    botonCarrito.addEventListener('click', toggleCart);

    function toggleCart() {
        cart.classList.toggle('show');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll('.product');
    const cartList = document.querySelector('.cart-list');
    const totalElement = document.querySelector('.total span');
    const clearCartButton = document.querySelector('.clear-cart');
    const contadorCarrito = document.querySelector('.contador'); 

    let cart = [];
    let cartCounter = 0; 

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            updateCartCounter(); 
        });
    });

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

    // Función para actualizar el contador de productos en el carrito
    function updateCartCounter() {
        cartCounter++;
        contadorCarrito.textContent = cartCounter;
    }

    // Función para actualizar el carrito en la interfaz de usuario
    function updateCartUI() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            const formattedPrice = (item.price * item.quantity).toLocaleString('es-AR');
            listItem.innerHTML = `${item.name} x${item.quantity} - $${formattedPrice} <button class="remove-item" data-id="${item.id}">Eliminar</button>`;
            cartList.appendChild(listItem);
            total += item.price * item.quantity;
        });
        totalElement.textContent = `$${total.toLocaleString('es-AR')}`;

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });
    }

 // Función para eliminar un producto del carrito
function removeItem(productId) {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) {
        const quantityToRemove = itemToRemove.quantity;
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        cartCounter -= quantityToRemove;
        contadorCarrito.textContent = cartCounter; 
    }
}

    // Función para limpiar el carrito
    function clearCart() {
        cart = [];
        updateCartUI();
        cartCounter = 0; 
        contadorCarrito.textContent = cartCounter;
    }
});
