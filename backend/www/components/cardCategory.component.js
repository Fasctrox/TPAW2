export const cardComponent = (data) => {
    return `
        <div class="col-md-4">
            <a href="../../pages/${data.href}" class="text-decoration-none text-dark">
                <div class="card h-100 shadow">
                    <img src="${data.img}" loading="lazy" class="card-img-top img-fixed" alt="${data.img}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.desc}</p>
                        </div>
                </div>
            </a>
        </div>
    `
}