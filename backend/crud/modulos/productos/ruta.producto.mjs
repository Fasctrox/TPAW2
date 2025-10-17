//Enrutamieto de los endpoints
import express from 'express'
import * as controlador from './controlador.producto.mjs'

const RUTA_BASE = '/productos'

const rutasProductos = new express.Router()
rutasProductos.use(express.json())

rutasProductos.get(RUTA_BASE, controlador.obtenerDatos)

rutasProductos.get(RUTA_BASE + '/:id', controlador.obtenerDato)

rutasProductos.post(RUTA_BASE, controlador.darAlta)

rutasProductos.put(RUTA_BASE + '/:id', controlador.modificar)

rutasProductos.delete(RUTA_BASE + '/:id', controlador.eliminar)

export default rutasProductos