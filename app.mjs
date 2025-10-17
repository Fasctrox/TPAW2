import express from 'express'
import rutasProductos from './crud/modulos/productos/ruta.producto.mjs'
import rutasClases from './crud/modulos/clases/ruta.clases.mjs'
import rutasCategorias from './crud/modulos/categorias/ruta.categorias.mjs'

const PUERTO = 3000

const app = express()

app.listen(PUERTO)

// Rutas de la API
app.use('/fitstore', rutasProductos)
app.use('/fitstore', rutasClases)
app.use('/fitstore', rutasCategorias)

// Frontend del sitio web
app.use('/fitstore', express.static('www'))

// Frontend de gestion del admin
app.use('/fitstore/admin', express.static('www-admin'))
