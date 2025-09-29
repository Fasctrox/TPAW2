import express from 'express'
import rutas from './crud/modulos/productos/ruta.producto.mjs'

const app = express()
const PUERTO = 3000

app.listen(PUERTO, ()=>{
    console.log(`Servidor ejecutandose en http://localhost:${PUERTO}`)
})

app.use(express.json()) //Siempre arriba
app.use(rutas)