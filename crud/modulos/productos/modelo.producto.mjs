//Se encarga de conectarse a la capa de datos
import path from 'node:path'
import fs from 'node:fs/promises'

//const dirname = import.meta.dirname
const RUTA_ARCHIVO = path.join('./bd/bd.json')

export async function obtenerProductos() {

    const datos = await fs.readFile(RUTA_ARCHIVO, 'utf8')
    return JSON.parse(datos)
}

export async function obtenerProducto(id) {
    try {
        const datos = await fs.readFile(RUTA_ARCHIVO, 'utf-8')
        const arregloProducto = JSON.parse(datos)

        const productoBuscado = arregloProducto.find((producto) => parseInt(producto.id) === id)

        console.log("Producto filtrado: " + JSON.stringify(productoBuscado))

        return productoBuscado

    } catch (e) {
        console.log(e)
        throw(e)
    }
}

export async function altaProducto(datosProducto) {
    try {
        const datos = await fs.readFile(RUTA_ARCHIVO, 'utf8') //Leemos el archivo
        const arregloProducto = JSON.parse(datos) // -> Tenemos un array (Pasamos de string a array)
        const id = arregloProducto.length + 1 //Creamos un ID

        console.log(datosProducto)

        // Construimos un obejto que representa el nuevo producto
        const nuevoProducto = {
            id,
            nombre: datosProducto.nombre,
            precio: datosProducto.precio
        }

        //Agregamos un nuevo producto al arreglo
        arregloProducto.push(nuevoProducto)

        await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(arregloProducto, null, 4), 'utf-8')

        return nuevoProducto

    } catch (e) {
        throw e
    }


}

export function modificarProducto(id, datos) {

}

export function eliminarProductos(id) {

}