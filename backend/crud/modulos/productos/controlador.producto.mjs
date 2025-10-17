import * as modelo from "./modelo.producto.mjs"

export async function obtenerDatos(req, res) {

    try {

        const productos = await modelo.obtenerProductos()

        if (productos.length > 0) {
            res.json(productos)
        } else {
            res.status(400).json({ mensaje: 'No se encontro' })
        }

    } catch (e) {
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }

}

export async function obtenerDato(req, res) {

    const id = req.params.id
    
    try {
        
        const producto = await modelo.obtenerProducto(id);

        if(producto){
            res.json(producto)
        }else{
            res.status(404).json({mensaje: 'Producto no encontrado'})
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({mensaje: 'Error del servidor'})
    }

}

export async function darAlta(req, res) {

    const datosNuevoProducto = req.body

    if (!datosNuevoProducto.img || !datosNuevoProducto.title || !datosNuevoProducto.descripcion || !datosNuevoProducto.precio || !datosNuevoProducto.categoria_id) {
        res.status(400).json({mensaje: 'Datos incompletos!'})
    }

    try {

        const nuevoProducto = await modelo.altaProducto(datosNuevoProducto)
        console.log(nuevoProducto)
        res.status(201).json({ mensaje: 'El producto fue dado de alta', producto: nuevoProducto })

    } catch (e) {
        console.log(e)
        res.status(500).json({mensaje: 'Hubo error en el servidor'})
    }
}

export async function modificar() {

}

export async function eliminar() {

}