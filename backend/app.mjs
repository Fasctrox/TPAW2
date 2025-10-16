import express from 'express'
import rutasProductos from './crud/modulos/productos/ruta.producto.mjs'

const PUERTO = 3000

const app = express()

app.listen(PUERTO)

app.use('/fitstore', rutasProductos)

//frontend
//app.use('/', )