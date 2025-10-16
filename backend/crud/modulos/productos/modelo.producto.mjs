import path from 'node:path'
import pool from '../../../config/db.mjs'

//const RUTA_ARCHIVO = path.join('./bd/bd.json')

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

}

export async function altaProducto(datosProducto) {

    //Datos del producto <------ ya deben estar los datos chequeados
    const { img, title, descripcion, precio } = datosProducto

    try {

        const resultado = await pool.query(
            `INSERT INTO 
                producto(img, title, descripcion, precio) 
            VALUES($1, $2, $3, $4) RETURNING id`,
            [img, title, descripcion, precio]
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