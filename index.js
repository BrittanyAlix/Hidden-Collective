/// Aqui hago elcodigo de los productos q tiene el negocio, pongo la infromacion de los prodcutos y su imagen correspondiente.
const products = [
    {
        id: 1,
        title: "Camisa Manga Larga Edicion Rambike",
        brand: "Rambike x Hidden",
        size: "L",
        gender: "Hombre",
        category: "Colaboracion",
        price: 15000,
        image: "camisa manga larga rambike.jpg"
    },
    {
        id: 2,
        title: "Suéter Gris Under Armour",
        brand: "Under Armour",
        size: "L",
        gender: "Hombre",
        category: "popular",
        price: 10000,
        image: "sueter under armour.jpg"
    },
    {
        id: 3,
        title: "Short Lakers Kobe Bryant",
        brand: "NBA",
        size: "L",
        gender: "Hombre",
        category: "hidden",
        price: 20000,
        image: "short lakers.jpg"
    },
    {
        id: 4,
        title: "Suéter Nike Trail",
        brand: "NIKE",
        size: "L",
        gender: "Hombre",
        category: "popular",
        price: 10000,
        image: "sueter nike.jpg"
    },
    {
        id: 5,
        title: "Hoodie Kiss My",
        brand: "Kiss",
        size: "XL",
        gender: "Unisex",
        category: "Artistas",
        price: 40000,
        image: "sueter kiss.jpg"
    },
    {
        id: 6,
        title: "Camisa Dennis Rodman",
        brand: "Hidden Collective",
        size: "XL",
        gender: "Hombre",
        category: "hidden",
        price: 25000,
        image: "camisa basket.jpg"
    },
    {
        id: 7,
        title: "Camisa Crop Rosa ZARA",
        brand: "Zara",
        size: "26 (S)",
        gender: "Mujer",
        category: "popular",
        price: 8000,
        image: "camisa rosa ZARA.jpg"
    },
    {
        id: 8,
        title: "Pantalón de Mezclilla Recto",
        brand: "Massimo Dutti",
        size: "8",
        gender: "Mujer",
        category: "popular",
        price: 10000,
        image: "pantalon mezclilla elegante.jpg"
    },
    {
        id: 9,
        title: "Blusa Elegante Rosa",
        brand: "Love Couture",
        size: "M",
        gender: "Mujer",
        category: "vintage",
        price: 2500,
        image: "camisa elegante rosa.jpg"
    }
];

let cart = [];

///// FUNCIONALIDAD numero 1 codigos con filtro Dinámico de Productos /////
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    /// Filtrar por categoria, genero y etc......
    const filtered = products.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'Hombre' || filter === 'Mujer') return p.gender === filter;
        return p.category === filter;
    });

    if(filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No hay prendas en esta colección por ahora.</p>';
        return;
    }

    filtered.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-img" onerror="this.src='https://via.placeholder.com/300x300?text=Imagen+No+Encontrada'">
                <div class="product-info">
                    <div class="product-meta">
                        <span><i class="fa-solid fa-tag"></i> ${product.brand}</span>
                        <span>Talla: ${product.size}</span>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <small style="color: var(--gray); margin-bottom: 10px; display:block;">Para: ${product.gender}</small>
                    <div class="product-price">¢${product.price.toLocaleString('es-CR')}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
    });
}

function filterProducts(category, botonClickeado) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (botonClickeado) {
        botonClickeado.classList.add('active');
    }
    renderProducts(category);
}

// FUNCIONALIDAD numero 2: Menu 
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// aqui el codigo de pertura y Cierre del Carrito...
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('open');
}

// FUNCIONALIDAD numero 3: suma logica matematica del carrito (las cuentas)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    // Feedback visual pequeño
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart-text">El carrito está vacío</p>`;
        cartTotal.innerText = `Total: ¢0`;
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <p style="font-weight: 600; font-size: 0.9rem;">${item.title}</p>
                    <small style="color: var(--gray);">¢${item.price.toLocaleString('es-CR')}</small>
                </div>
                <i class="fa-solid fa-trash" style="cursor: pointer; color: var(--accent);" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    cartTotal.innerText = `Total: ¢${total.toLocaleString('es-CR')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// FUNCIONALIDAD numero 4: aqui hago primero en caso de el carrito este vacio.
// y hago que la direccion de compra sea via Whatsaapp.
function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. ¡Agrega unas prendas primero!");
        return;
    }

    //// aqui hago el mensaje para WhatsApp de la compra
    let mensaje = "¡Hola Hidden Collective! Me gustaría realizar la siguiente compra:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.title} (${item.brand}) - Talla ${item.size} - ¢${item.price.toLocaleString('es-CR')}\n`;
        total += item.price;
    });

    mensaje += `\n*Total a pagar: ¢${total.toLocaleString('es-CR')}*\n\n¿Me ayudan con la información de pago por favor?`;

    const numeroWhatsApp = "50672074687";
    
    //// este codigo hace que abra el Whatsaapp en una nueva pestaña//
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    //// este codigo Vacia el carrito después de enviar el mensaje///
    cart = [];
    updateCartUI();
    toggleCart();
}

// FUNCIONALIDAD numero 5: Validación del Formulario de Contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        const feedback = document.getElementById('formFeedback');

        if(nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
            feedback.style.color = "red";
            feedback.innerText = "Por favor, completa todos los campos.";
            feedback.style.display = "block";
        } else {
            feedback.style.color = "green";
            feedback.innerText = "¡Mensaje enviado con éxito! Te contactaremos pronto.";
            feedback.style.display = "block";
            this.reset(); //// Esto ayuda a lmpiar el formularioo.
            
            /// aca define el tiempo para ocultar el mensaje de envio exitoso..
            setTimeout(() => {
                feedback.style.display = "none";
            }, 4000);
        }
    });
}

//// muestra el incio de cargando la vista de productoss
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
});