import { getSessionData, deleteSessionData } from './utils/sessionStorageController.js';
import { navbarComponent } from "./components/navbar.component.js"
import { handleLogout } from './utils/logoutFunction.mjs';

window.addEventListener('DOMContentLoaded', () => {
    const user = getSessionData('userLogged');

    const navContainer = document.querySelector('header')
    if (navContainer){
        navContainer.innerHTML = navbarComponent(user);
    }

    const logoutButton = document.getElementById('logoutBtn');
    
    if (logoutButton) {
        // Adjuntamos la función que borra el token del backend y redirige
        logoutButton.addEventListener('click', handleLogout); 
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