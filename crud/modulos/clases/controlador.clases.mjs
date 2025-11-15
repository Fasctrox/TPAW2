import * as modelo from "./modelo.clases.mjs"

export async function obtenerDatos(req, res) {

    try {

        const clases = await modelo.obtenerClases()

        if (clases.length > 0) {
            res.json(clases)
        } else {
            res.status(404).json({ mensaje: 'No se encontro las clases' })
        }

    } catch (e) {
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }

}

export async function obtenerDato(req, res) {

    const id = req.params.id

    try {

        const clase = await modelo.obtenerClase(id);

        if (clase) {
            res.json(clase)
        } else {
            res.status(404).json({ mensaje: 'Clase no encontrada' })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: 'Error del servidor' })
    }

}

export async function darAlta(req, res) {

    const datosNuevaClase = req.body

    if (!datosNuevaClase.img || !datosNuevaClase.title || !datosNuevaClase.descripcion || !datosNuevaClase.tiempo || !datosNuevaClase.precio) {
        res.status(400).json({ mensaje: 'Datos incompletos!' })
    }

    try {

        const nuevaClase = await modelo.altaClase(datosNuevaClase)
        console.log(nuevaClase)
        res.status(201).json({ mensaje: 'La clase fue dada de alta', producto: nuevaClase })

    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: 'Hubo error en el servidor' })
    }
}

export async function modificar(req, res) {

    const id = req.params.id
    const datos = req.body

    try {

        const claseActualizada = await modelo.modificarClase(id, datos);

        if (claseActualizada) {
            res.json(claseActualizada)
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ mensjae: 'Error del servidor' })
    }


}

export async function eliminar(req, res) {
    const id = req.params.id

    try {

        const claseEliminada = await modelo.eliminarClase(id)
        res.json({ mensaje: 'clase eliminada!', claseEliminada })


    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: 'Error del servidor' })
    }
}