import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { verificarTokenAPI, verificarAccesoWeb} from './crud/modulos/utils/utils.mjs'

import rutasProductos from './crud/modulos/productos/ruta.producto.mjs'
import rutasClases from './crud/modulos/clases/ruta.clases.mjs'
import rutasCategorias from './crud/modulos/categorias/ruta.categorias.mjs'
import rutasUsuarios from './crud/modulos/usuarios/ruta.usuarios.mjs'

const PUERTO = process.env.PORT || 3000

const app = express()

app.use(cookieParser())
app.use(express.json())

app.listen(PUERTO)

app.use('/fitstore/ingreso', express.static('www-login/auth/login'))

app.use('/fitstore/admin', verificarAccesoWeb, express.static('www-admin'))

app.use('/fitstore', rutasUsuarios)
app.use('/fitstore', rutasCategorias)

app.use('/fitstore', verificarAccesoWeb, express.static('www'))

app.use('/fitstore', verificarTokenAPI, rutasProductos)
app.use('/fitstore', verificarTokenAPI, rutasClases)




