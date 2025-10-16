import { cardComponent } from "../../components/cardCategory.component.js"
import { loadCards } from '../../utils/loadCards.js'

window.addEventListener('DOMContentLoaded', () => {
    loadCards({
        categoria: 'categoria',
        containerSelector: '#cardContainer',
        cardComponent: cardComponent
    })
})