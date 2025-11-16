window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        try {

            const response = await fetch('/fitstore/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (response.ok) {
                const data = await response.json()

                window.location.href = data.redirect || "/"
            } else {
                const error = await response.json()
                alert(error.mensaje || "Credenciales incorrectas")
            }

        } catch (e) {
            console.log('Error de conexion: ', e)
            alert("Ocurrio un error al intentar iniciar sesion")
        }
    });

});