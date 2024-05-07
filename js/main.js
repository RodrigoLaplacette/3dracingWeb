document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });

    const botonCarrito = document.querySelector('.botoncarrito');
    const cartElement = document.querySelector('.cart');
    botonCarrito.addEventListener('click', toggleCart);

    let cart = [];

    function toggleCart() {
        cartElement.classList.toggle('show');
    }

    const products = document.querySelectorAll('.product');
    const cartList = document.querySelector('.cart-list');
    const totalElement = document.querySelector('.total span');
    const clearCartButton = document.querySelector('.clear-cart');
    const contadorCarrito = document.querySelector('.contador'); 

    // Recuperar los items del carrito guardado del almacenamiento local
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCartUI();
        updateCartCounter();
    }

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            updateCartCounter(); 
        });
    });

    clearCartButton.addEventListener('click', clearCart);

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

        // Guardar los items del carrito en el almacenamiento local
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartUI();
    }

    function updateCartCounter() {
        const cartCounter = cart.reduce((total, item) => total + item.quantity, 0);
        contadorCarrito.textContent = cartCounter;
    }

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

    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        // Actualizar el carrito en el almacenamiento local después de eliminar un elemento
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        updateCartCounter();
    }

    function clearCart() {
        cart = [];
        // Limpiar el carrito en el almacenamiento local
        localStorage.removeItem('cart');
        updateCartUI();
        updateCartCounter();
    }
});
