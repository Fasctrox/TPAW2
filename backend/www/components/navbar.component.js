export const navbarComponent = (user) => {
    const navElements = [
        { title: 'Home', link: '../../pages/home/home.html' },
        { title: 'Clases', link: '../../pages/clases/clases.html' },
        { title: 'Productos', link: '../../pages/productos/productos.html' },
        { title: 'Ropa', link: '../../pages/ropa/ropa.html' },
        { title: 'Carrito', link: '../../pages/carrito/carrito.html' }
    ];

    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../pages/home/home.html">
                <img src="../../assets/images/logo.webp" width="80" height="80"> FitStore
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    ${
                        navElements.map(e => `
                            <li class="nav-item"><a class="nav-link" href="${e.link}">${e.title}</a></li>
                        `).join('')
                    }
                    ${user ? `
                        <li class="nav-item d-flex align-items-center mx-2">
                            <img src="${user.foto || '/assets/images/perfil.webp'}" width="30" class="rounded-circle me-2" />
                            <span>${user.name}</span>
                        </li>` : ''}
                    <li class="nav-item">
                        <button id="logoutBtn" class="btn btn-danger ms-2"><i class="bi bi-box-arrow-left"></i></button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
}
