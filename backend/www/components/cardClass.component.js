export const cardClassComponent = (data) => {
    return `
        <div class="col">
            <div class="card h-100 shadow">
                <img src="${data.img}" loading="lazy" class="card-img-top" alt="${data.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.desc}</p>
                        <p class="fw-bold">Duración: ${data.time}</p>
                        <p class="fw-bold">$${data.precio}</p>
                    </div>


                    <button class="btn btn-success mt-3" id="insc-${data.id}">Inscribirme</button>
                </div>
            </div>
        </div>      
    `     
}
