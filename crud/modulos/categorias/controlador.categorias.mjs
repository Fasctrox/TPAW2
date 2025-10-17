import * as modelo from "./modelo.categorias.mjs"

export async function obtenerDatos(req, res) {

    try {

        const categorias = await modelo.obtenerCategorias()

        if (categorias.length > 0) {
            res.json(categorias)
        } else {
            res.status(400).json({ mensaje: 'No se encontraron las categorias' })
        }

    } catch (e) {
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }

}

