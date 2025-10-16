import { cardClassComponent } from '../../components/cardClass.component.js'
import { inscribirClase } from '../../utils/localStorageController.js'
import { searchBarComponent } from '../../components/searchBar.component.js';

let cardClassContainer = document.getElementById('cardClassContainer')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('searchBarContainer').innerHTML = searchBarComponent;
        const response = await fetch('../../assets/data/product.json')
        const productosData = await response.json()

        const cards = productosData
            .filter(producto => producto.categoria === 'clases')
            .map(producto => cardClassComponent(producto))
            .join('');

        cardClassContainer.innerHTML = cards
        
        productosData
            .filter(producto => producto.categoria === 'clases')
            .forEach(producto => {
                const btn = document.getElementById(`insc-${producto.id}`)
                if (btn) {
                    btn.addEventListener('click', () => {
                        inscribirClase(producto.id)
                    })
                }
            })

        //Barra de busqueda
        const searchInput = document.getElementById('searchInput')

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase()
            const container = document.getElementById('cardClassContainer')
            container.innerHTML = ''

            const filteredProducts = productosData
                .filter(producto => 
                    producto.categoria === 'clases' &&
                    producto.title.toLowerCase().includes(query)
                )

            const cards = filteredProducts
                .map(producto => cardClassComponent(producto))
                .join('')

            container.innerHTML = cards

            filteredProducts.forEach(producto => {
                const btn = document.getElementById(`insc-${producto.id}`)
                if (btn) {
                    btn.addEventListener('click', () => {
                        inscribirClase(producto.id)
                    })
                }
            })
        })

    } catch (e) {
        console.error('Error al cargar las clases:', e)
    }
})
