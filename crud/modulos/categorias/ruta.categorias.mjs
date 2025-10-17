//Enrutamieto de los endpoints
import express from 'express'
import * as controlador from './controlador.categorias.mjs'

const RUTA_BASE = '/categorias'

const rutasCategorias = new express.Router()

rutasCategorias.use(express.json())

rutasCategorias.get(RUTA_BASE, controlador.obtenerDatos)

export default rutasCategorias