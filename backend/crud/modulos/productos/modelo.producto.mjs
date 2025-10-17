import pool from '../../../config/db.mjs'


export async function obtenerProductos() {

    try {

        const resultado = await pool.query('SELECT * FROM producto')
        const productos = resultado.rows
        return productos;

    } catch (e) {

        console.log(e)
        throw e

    }

}

export async function obtenerProducto(id) {

    try {
        
        const resultado = await pool.query(
            `SELECT * FROM producto WHERE id = $1`,
            [id]
        )

        return resultado.rows[0];

    } catch (e) {
        console.log(e)
        throw e
    }

}

export async function altaProducto(datosProducto) {

    //Datos del producto <------ ya deben estar los datos chequeados
    const { img, title, descripcion, precio, categoria_id } = datosProducto

    try {

        const resultado = await pool.query(
            `INSERT INTO 
                producto(img, title, descripcion, precio, categoria_id) 
            VALUES($1, $2, $3, $4, $5) RETURNING id`,
            [img, title, descripcion, precio, categoria_id]
        )

        return resultado.rows

    } catch (e) {
        console.log(e)
        throw e
    }

}

export function modificarProducto(id, datos) {

}

export function eliminarProductos(id) {

}