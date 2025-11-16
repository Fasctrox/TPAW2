export async function handleLogout() {
    try {
        const response = await fetch('/fitstore/logout', {
            method: 'GET' 
        });

        if (response.ok) {
            sessionStorage.clear(); 
            
            window.location.href = '/fitstore/auth/login/login.html'; 
        } else {
            console.error('Error al cerrar sesión:', await response.json());
            alert('Error al cerrar sesión. Intente de nuevo.');
        }
    } catch (e) {
        console.error('Error de red al intentar cerrar sesión:', e);
        alert('Error de red. No se pudo cerrar la sesión.');
    }
}