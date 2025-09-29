//Enrutamieto de los endpoints
import express from 'express'
import * as controlador from './controlador.productos.mjs'
import { chequearDatosProductos } from './utils.mjs'

const RUTA_BASE = '/api/v1/productos'

const rutasProductos = new express.Router()

rutasProductos.get(RUTA_BASE, controlador.obtenerDatos)

rutasProductos.get(RUTA_BASE + '/:id', controlador.obtenerDato)

rutasProductos.post(RUTA_BASE, chequearDatosProductos, controlador.darAlta)

rutasProductos.put(RUTA_BASE + '/:id', controlador.modificar)

rutasProductos.delete(RUTA_BASE + '/:id', controlador.eliminar)

export default rutas