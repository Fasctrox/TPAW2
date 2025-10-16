import { cardProductComponent } from '../../components/cardProduct.component.js'
import { addToCart } from '../../utils/localStorageController.js'
import { searchBarComponent } from '../../components/searchBar.component.js'

let cardProductContainer = document.getElementById('cardProductContainer')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('searchBarContainer').innerHTML = searchBarComponent;
        const response = await fetch('../../assets/data/product.json')
        const productosData = await response.json()

        const cards = productosData
            .filter(producto => producto.categoria === 'producto')
            .map(producto => cardProductComponent(producto))
            .join('');
        cardProductContainer.innerHTML = cards;

        productosData
            .filter(producto => producto.categoria === 'producto')
            .forEach(producto => {
                const btn = document.getElementById(`add-${producto.id}`)
                if (btn) {
                    btn.addEventListener('click', () => {
                        addToCart(producto.id);
                    });
                }
            })

        //Barra de busqueda
        const searchInput = document.getElementById('searchInput')

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const container = document.getElementById('cardProductContainer')
            container.innerHTML = ''

            const filteredProducts = productosData
                .filter(producto => 
                    producto.categoria === 'producto' &&
                    producto.title.toLowerCase().includes(query)
                )

            const cards = filteredProducts
                .map(producto => cardProductComponent(producto))
                .join('')

            container.innerHTML = cards;


            filteredProducts.forEach(producto => {
                const btn = document.getElementById(`add-${producto.id}`)
                if (btn) {
                    btn.addEventListener('click', () => {
                        addToCart(producto.id)
                    })
                }
            })
        })

    } catch (e) {
        console.error('Error al cargar los productos:', e)
    }
})