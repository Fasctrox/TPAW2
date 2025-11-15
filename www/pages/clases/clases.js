import { cardClassComponent } from '../../components/cardClass.component.js'
import { inscribirClase } from '../../utils/localStorageController.js'
import { searchBarComponent } from '../../components/searchBar.component.js';

let cardClassContainer = document.getElementById('cardClassContainer')

window.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('searchBarContainer').innerHTML = searchBarComponent;

        const response = await fetch('/fitstore/clases')
        if(!response.ok) throw new Error('Error al obtener la clase')

        const clasesData = await response.json()

        const cards = clasesData.map(c => cardClassComponent(c)).join('');
        cardClassContainer.innerHTML = cards
        
        clasesData.forEach(p => {
            const btn = document.getElementById(`insc-${p.id}`)
            if (btn) {
                btn.addEventListener('click', () => inscribirClase(p.id))
            }
        })

        //Barra de busqueda
        const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase()
            const filtered = clasesData.filter(c => c.title.toLowerCase().includes(query))
            cardClassContainer.innerHTML = filtered.map(c => cardClassComponent(c)).join('')

            filtered.forEach(c => {
                const btn = document.getElementById(`add-${c.id}`)
                if (btn) {
                    btn.addEventListener('click', () => addToCart(p.id))
                }
            })
        })

    } catch (e) {
        console.error('Error al cargar las clases:', e)
    }
})
