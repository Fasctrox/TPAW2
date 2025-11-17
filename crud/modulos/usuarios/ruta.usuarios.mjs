import express from 'express'
import * as controlador from './controlador.usuarios.mjs'

const RUTA_BASE = '/usuarios-admin'

const rutasUsuarios = new express.Router()
rutasUsuarios.use(express.json())

rutasUsuarios.post('/registro', controlador.registrarUsuario)

rutasUsuarios.post('/login', controlador.loginUsuario)

rutasUsuarios.get('/logout', controlador.logoutUsuario)

rutasUsuarios.get(RUTA_BASE + '/', controlador.obtenerTodos);

rutasUsuarios.get(RUTA_BASE + '/:id', controlador.obtenerUsuario);

rutasUsuarios.put(RUTA_BASE + '/:id', controlador.modificarUsuario);

rutasUsuarios.delete(RUTA_BASE + '/:id', controlador.eliminarUsuario);

export default rutasUsuarios

