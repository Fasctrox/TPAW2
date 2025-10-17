export const loadCards = async ({ containerSelector, cardComponent }) => {
    try {
        const response = await fetch('/fitstore/categorias')
        if (!response.ok) throw new Error('Error al obtener las categorías');

        const categorias = await response.json()

        const cards = categorias
            .map(categoria => cardComponent(categoria))
            .join('')

        const container = document.querySelector(containerSelector);
        if (container) container.innerHTML = cards;

    } catch (e) {
        console.error('Error al cargar los productos:', e)
    }
}
