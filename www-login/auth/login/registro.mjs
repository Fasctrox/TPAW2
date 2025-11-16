window.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");

    registroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreInput").value;
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        const role = 'cliente'; 

        try {
            const API_URL = '/fitstore/registro'; 

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, nombre, password, role })
            });

            if (response.ok) {
                alert("¡Registro exitoso! Por favor, inicie sesión.");
                window.location.href = "../login/login.html"; 
            } else {
                const errorData = await response.json();
                alert(errorData.mensaje || "Error en el registro. Verifique sus datos.");
            }

        } catch (error) {
            console.error('Error de conexión:', error);
            alert("Ocurrió un error en la conexión con el servidor.");
        }
    });
});