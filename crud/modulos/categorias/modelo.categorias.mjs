import pool from '../../../config/db.mjs'


export async function obtenerCategorias() {

    try {

        const resultado = await pool.query('SELECT * FROM categorias')
        const categorias = resultado.rows
        return categorias;

    } catch (e) {

        console.log(e)
        throw e

    }
}

