import { getCart, setCart, clearCart } from '../../utils/localStorageController.js';

let cartContainer = document.getElementById('cartContainer');
let clearCartBtn = document.getElementById('clearCartBtn');

window.addEventListener('DOMContentLoaded', async () => {
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center mt-4">El carrito está vacío.</p>';
        return;
    }

    try {

        const [productosResponse, clasesResponse] = await Promise.all([
            fetch('/fitstore/productos'),
            fetch('/fitstore/clases')
        ])

        if (!productosResponse.ok) throw new Error('Error al obtener productos desde la API')
        if (!clasesResponse.ok) throw new Error('Error al obtener clases desde la API')

        const productosData = await productosResponse.json()
        const clasesData = await clasesResponse.json()

        const items = cart.map(item => {
            let data = null;
            let esClase = false;
            let cantidadMostrar = item.cantidad;

            if (item.tipo === 'producto') {
                data = productosData.find(p => p.id === item.id);
            } else if (item.tipo === 'clase') {
                data = clasesData.find(c => c.id === item.id);
                esClase = true;
                cantidadMostrar = 'Inscrito'; // Las clases se suelen mostrar como 1 o "inscrito"
            }

            // Si no se encuentra el dato (ej: producto eliminado de la BD)
            if (!data) return '';

            // Plantilla de renderizado genérica
            return `
                <div class="card mb-3 p-3 ${esClase ? 'border-primary' : ''}">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${data.img}" alt="${data.title}" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <span class="badge bg-secondary mb-2">${esClase ? 'Clase' : 'Producto'}</span>
                            <h5>${data.title}</h5>
                            <p>${data.descripcion}</p>
                            <p class="fw-bold">$${data.precio}</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <p>Cantidad: ${cantidadMostrar}</p>
                            <button class="btn btn-danger btn-sm" data-id="${item.id}" data-tipo="${item.tipo}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        cartContainer.innerHTML = items;

        document.querySelectorAll('.btn-danger.btn-sm').forEach(btn => {
            btn.addEventListener('click', () => {
                // Aseguramos que el id es un número para la función eliminarItemCarrito
                const id = parseInt(btn.getAttribute('data-id'));
                const tipo = btn.getAttribute('data-tipo');
                eliminarItemCarrito(id, tipo);
            });
        });

    } catch (e) {
        console.error('Error al cargar datos del carrito:', e);
        cartContainer.innerHTML = '<p class="text-danger text-center mt-4">Hubo un error al cargar los datos. Intente más tarde.</p>';
    }

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

