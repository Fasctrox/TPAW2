export const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
export const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
export const clearCart = () => localStorage.removeItem('cart');

export const addToCart = (productId) => {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;

    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId && item.tipo === 'producto');

    if (itemIndex >= 0) {
        cart[itemIndex].cantidad += qty;
    } else {
        cart.push({ id: productId, cantidad: qty, tipo: 'producto' });
    }

    setCart(cart);
    alert('Producto agregado al carrito.');
};

export const inscribirClase = (claseId) => {
    let cart = getCart();

    const yaInscripto = cart.some(item => item.id === claseId && item.tipo === 'clase');
    if (yaInscripto) {
        alert('Ya estás inscripto en esta clase.');
        return;
    }

    cart.push({ id: claseId, cantidad: 1, tipo: 'clase' });
    setCart(cart);
    alert('Inscripción confirmada.');
};