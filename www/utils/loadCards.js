export const loadCards = async ({ categoria, containerSelector, cardComponent }) => {
    try {
        const response = await fetch('../../assets/data/product.json')
        const productosData = await response.json()

        const cards = productosData
            .filter(producto => producto.categoria === categoria)
            .map(producto => cardComponent(producto))
            .join('')

        const container = document.querySelector(containerSelector)
        if (container) {
            container.innerHTML = cards
        }

    } catch (e) {
        console.error('Error al cargar los productos:', e)
    }
}
