import express from 'express'
import * as controlador from './controlador.usuarios.mjs'

const rutasUsuarios = new express.Router()
rutasUsuarios.use(express.json())


rutasUsuarios.post('/registro', controlador.registrarUsuario)

rutasUsuarios.post('/login', controlador.loginUsuario)

rutasUsuarios.get('/logout', controlador.logoutUsuario)
/*
rutasUsuarios.get('/', controlador.obtenerTodos); 
rutasUsuarios.get('/:id', controlador.obtenerUsuario);
rutasUsuarios.put('/:id', controlador.modificarUsuario);
rutasUsuarios.delete('/:id', controlador.eliminarUsuario);
*/
export default rutasUsuarios

