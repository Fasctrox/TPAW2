export const cardProductComponent = (data) => {
    return `
        <div class="col">
            <div class="card h-100 shadow">
                <img src="${data.img}" loading="lazy" class="card-img-top" alt="${data.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.desc}</p>
                        <p class="fw-bold">$${data.precio}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <label class="form-label mb-0">Cantidad:</label>
                            <input type="number" min="1" value="1" class="form-control form-control-sm w-50" id="qty-${data.id}">
                        </div>
                        <button class="btn btn-primary btn-sm" id="add-${data.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `
}