import pool from '../../../config/db.mjs'


export async function obtenerClases() {

    try {

        const resultado = await pool.query('SELECT * FROM clases')
        const clases = resultado.rows
        return clases;

    } catch (e) {

        console.log(e)
        throw e

    }

}

export async function obtenerClase(id) {

    try {
        
        const resultado = await pool.query(
            `SELECT * FROM clases WHERE id = $1`,
            [id]
        )

        return resultado.rows;

    } catch (e) {
        console.log(e)
        throw e
    }

}

export async function altaClase(datosClase) {

    //Datos del producto <------ ya deben estar los datos chequeados
    const { img, title, descripcion, tiempo, precio } = datosClase

    try {

        const resultado = await pool.query(
            `INSERT INTO 
                clases(img, title, descripcion, tiempo, precio) 
            VALUES($1, $2, $3, $4, $5) RETURNING id`,
            [img, title, descripcion, tiempo, precio]
        )

        return resultado.rows

    } catch (e) {
        console.log(e)
        throw e
    }

}

export async function modificarClase(id, datos) {

    try {
        
        const {img, title, descripcion, tiempo, precio} = datos

        const resultado = await pool.query(
            `UPDATE clases 
                SET img = $1,
                    title = $2,
                    descripcion = $3,
                    tiempo = $4,
                    precio = $5
                WHERE id = $6
                RETURNING id`,
                [img, title, descripcion, tiempo, precio, id]
        )

        return resultado.rows


    } catch (e) {

        console.log(e)
        throw e
    }

}

export async function eliminarClase(id) {

    try {
        
        const resultado = pool.query(
            `DELETE FROM clases WHERE id = $1 RETURNING id`,
            [id]
        )

        return resultado.rows


    } catch (e) {
        console.log(e)
        throw e
    }

}