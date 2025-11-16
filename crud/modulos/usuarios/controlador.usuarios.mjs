import * as modelo from "./modelo.usuarios.mjs"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const LLAVE_PRIVADA = process.env.JWT_SECRET;

export async function registrarUsuario(req, res) {
    const { nombre, email, password } = req.body;
    
    const role = 'cliente'; 

    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const nuevoUsuario = await modelo.crearUsuario(email, nombre, passwordHash, role);

        res.status(201).json({ 
            mensaje: 'Usuario registrado exitosamente',
            usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email, role: nuevoUsuario.role }
        });

    } catch (e) {
        console.error("Error en registro:", e);
        if (e.message.includes('email ya está registrado')) {
            return res.status(409).json({ mensaje: 'El email ya se encuentra en uso.' });
        }
        res.status(500).json({ mensaje: 'Error interno del servidor durante el registro.' });
    }
}

export async function loginUsuario(req, res) {
    
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({mensjae: 'Email y contraseña requeridos'})
    }

    try {
        
        const user = await modelo.obtenerUsuario(email)

        if(!user){
            console.log("Intento de login fallido: Usuario no encontrado")
            return res.status(401).json({mensaje: 'Credenciales no validas'})
        }

        const match = await bcrypt.compare(password, user.password_hash)

        if(match){
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            }, LLAVE_PRIVADA, {expiresIn: '1h'})

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })

            const redirectUrl = user.role === 'admin' ? '/fitstore/admin' : '/fitstore/pages/home/home.html'

            return res.status(200).json({
                mensaje: 'Inicio de sesion exitoso',
                redirect: redirectUrl
            })
        } else {
            console.log('Intento de login fallido: Contraseña incorrecta')
            return res.status(401).json({mensaje: 'credenciales no validas'})
        }


    } catch (e) {
        console.log("Error durante el LogIn: ", e)
        res.status(500).json({mensaje: 'Error interno del servidor'})
    }

}

export function logoutUsuario(req, res) {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict' 
    });
    
    res.status(200).json({ mensaje: 'Sesión cerrada exitosamente.' });
}