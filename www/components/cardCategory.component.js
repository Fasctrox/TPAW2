export const cardComponent = (data) => {
    return `
        <div class="col-md-4">
            <a href="${data.url}" class="text-decoration-none text-dark">
                <div class="card h-100 shadow">
                    <img src="${data.imgcat}" loading="lazy" class="card-img-top img-fixed" alt="${data.imgcat}">
                        <div class="card-body">
                            <h5 class="card-title">${data.nombre}</h5>
                            <p class="card-text">${data.descripcion}</p>
                        </div>
                </div>
            </a>
        </div>
    `
}