import { getSessionData, deleteSessionData } from './utils/sessionStorageController.js';
import { navbarComponent } from "./components/navbar.component.js"

window.addEventListener('DOMContentLoaded', () => {
    const user = getSessionData('userLogged');

    const navContainer = document.querySelector('header')
    if (navContainer){
        navContainer.innerHTML = navbarComponent(user);
    }

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        deleteSessionData('userLogged');
        window.location.href = '../../pages/auth/login/login.html';
    });

    const pageName = document.getElementById('pageName')?.value
    const title = document.getElementById('title')

    if (pageName && title) {
        title.textContent = `Bienvenido a ${pageName}`
        document.title = pageName
    }
});
