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

        return resultado.rows;

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

export async function modificarProducto(id, datos) {

    try {
        
        const {img, title, descripcion, precio, categoria_id} = datos

        const resultado = await pool.query(
            `UPDATE producto 
                SET img = $1,
                    title = $2,
                    descripcion = $3,
                    precio = $4,
                    categoria_id = $5
                WHERE id = $6
                RETURNING id`,
                [img, title, descripcion, precio, categoria_id, id]
        )

        return resultado.rows


    } catch (e) {

        console.log(e)
        throw e
    }

}

export async function eliminarProductos(id) {

    try {
        
        const resultado = pool.query(
            `DELETE FROM producto WHERE id = $1 RETURNING id`,
            [id]
        )

        return resultado.rows


    } catch (e) {
        console.log(e)
        throw e
    }

}