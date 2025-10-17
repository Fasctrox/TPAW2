import express from 'express'
import rutasProductos from './crud/modulos/productos/ruta.producto.mjs'
import rutasClases from './crud/modulos/clases/ruta.clases.mjs'

const PUERTO = 3000

const app = express()

app.listen(PUERTO)

app.use('/fitstore', rutasProductos)
app.use('/fitstore', rutasClases)

//frontend
//app.use('/', )