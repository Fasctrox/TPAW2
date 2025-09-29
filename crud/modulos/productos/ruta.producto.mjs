//Enrutamieto de los endpoints
import express from 'express'
import * as controlador from './controlador.productos.mjs'
import { chequearDatosProductos } from './utils.mjs'

const RUTA_BASE = '/api/v1/productos'

const rutasProductos = new express.Router()

rutasProductos.get(RUTA_BASE, controlador.obtenerProductos)

rutasProductos.get(RUTA_BASE + '/:id', controlador.obtenerProducto)

rutasProductos.post(RUTA_BASE, chequearDatosProductos, controlador.altaProducto)

rutasProductos.put(RUTA_BASE + '/:id', controlador.modificarProducto)

rutasProductos.delete(RUTA_BASE + '/:id', controlador.eliminarProductos)

export default rutas