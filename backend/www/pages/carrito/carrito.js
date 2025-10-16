import { getCart, setCart, clearCart } from '../../utils/localStorageController.js';

let cartContainer = document.getElementById('cartContainer');
let clearCartBtn = document.getElementById('clearCartBtn');

window.addEventListener('DOMContentLoaded', async () => {
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center mt-4">El carrito está vacío.</p>';
        return;
    }

    // cargar datos completos desde JSON para mostrar títulos, imágenes, etc.
    const response = await fetch('../../assets/data/product.json');
    const productosData = await response.json();

    const items = cart.map(item => {
        const producto = productosData.find(p => p.id === item.id);

        return `
            <div class="card mb-3 p-3">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${producto.img}" alt="${producto.title}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h5>${producto.title}</h5>
                        <p>${producto.desc}</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <p>Cantidad: ${item.cantidad}</p>
                        <button class="btn btn-danger btn-sm" data-id="${item.id}" data-tipo="${item.tipo}">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartContainer.innerHTML = items;

    // NUEVO: listeners para eliminar un producto
    document.querySelectorAll('.btn-danger.btn-sm').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const tipo = btn.getAttribute('data-tipo');
            eliminarItemCarrito(id, tipo);
        });
    });
});

// NUEVO: vaciar carrito completo
clearCartBtn?.addEventListener('click', () => {
    clearCart();
    window.location.reload();
});

// NUEVO: eliminar un solo item
const eliminarItemCarrito = (id, tipo) => {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.tipo === tipo));
    setCart(cart);
    window.location.reload();
};
