const formulario = document.getElementById('alta')

formulario.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const objForm = new FormData(formulario)
    const datos = Object.fromEntries(objForm) // <-- un objeto
    
    const respuesta = await fetch('/productos', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(datos)
    })

    if(respuesta.ok){
        console.log('Registro dado de alta')
    }

})