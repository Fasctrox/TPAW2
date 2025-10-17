import { setSessionData } from "../../../utils/sessionStorageController.js";

window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        const res = await fetch("../../../assets/data/users.json");
        const users = await res.json();

        const user = users.find(u => u.email === email && u.pass === password);

        if (user) {
            setSessionData("userLogged", user);
            window.location.href = "../../home/home.html";
        } else {
            alert("Credenciales incorrectas");
        }
    });
});