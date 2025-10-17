//Enrutamieto de los endpoints
import express from 'express'
import * as controlador from './controlador.clases.mjs'

const RUTA_BASE = '/clases'

const rutasClases = new express.Router()

rutasClases.use(express.json())

rutasClases.get(RUTA_BASE, controlador.obtenerDatos)

rutasClases.get(RUTA_BASE + '/:id', controlador.obtenerDato)

rutasClases.post(RUTA_BASE, controlador.darAlta)

rutasClases.put(RUTA_BASE + '/:id', controlador.modificar)

rutasClases.delete(RUTA_BASE + '/:id', controlador.eliminar)

export default rutasClases