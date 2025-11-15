import { cardProductComponent } from '../../components/cardProduct.component.js'
import { addToCart } from '../../utils/localStorageController.js'
import { searchBarComponent } from '../../components/searchBar.component.js'

let cardProductContainer = document.getElementById('cardProductContainer')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('searchBarContainer').innerHTML = searchBarComponent;

        const response = await fetch('/fitstore/productos')
        if (!response.ok) throw new Error('Error al obtener productos')

        const productosData = await response.json()

        const productos = productosData.filter(p => p.categoria_id === 3)

        const cards = productos.map(p => cardProductComponent(p)).join('')
        cardProductContainer.innerHTML = cards

        productos.forEach(p => {
            const btn = document.getElementById(`add-${p.id}`)
            if (btn) {
                btn.addEventListener('click', () => addToCart(p.id))
            }
        })

        //Barra de busqueda
        const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase()
            const filtered = productos.filter(p => p.title.toLowerCase().includes(query))
            cardProductContainer.innerHTML = filtered.map(p => cardProductComponent(p)).join('')

            filtered.forEach(p => {
                const btn = document.getElementById(`add-${p.id}`)
                if (btn) {
                    btn.addEventListener('click', () => addToCart(p.id))
                }
            })
        })

    } catch (e) {
        console.error('Error al cargar los productos:', e)
    }
})
