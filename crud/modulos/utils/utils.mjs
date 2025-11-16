import jwt from 'jsonwebtoken';

const LLAVE_PRIVADA = process.env.JWT_SECRET; 


// Middleware para proteger rutas de API REST (devuelve JSON/Status)
export function verificarTokenAPI(req, res, next) {
    const token = req.cookies.access_token;
    
    // Si no hay token, el cliente de la API (frontend) espera un 401
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }
    
    try {
        const datosUsuario = jwt.verify(token, LLAVE_PRIVADA);
        req.usuario = datosUsuario; 
        next(); 
    } catch (error) {
        // Token inválido/expirado
        return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }
}

// NUEVO: Middleware para proteger acceso a directorios (devuelve Redirección)
export function verificarAccesoWeb(req, res, next) {
    const token = req.cookies.access_token;
    
    const LOGIN_URL = '/fitstore/ingreso/login.html'; 

    if (!token) {
        // 1. Si NO hay token, redirigir al Login. (Esto protege todo el front)
        return res.redirect(LOGIN_URL); 
    }
    
    try {
        const datosUsuario = jwt.verify(token, LLAVE_PRIVADA);
        req.usuario = datosUsuario; 
        
        // 2. Determinar el destino de la redirección
        const intendedPath = req.originalUrl.split('?')[0];

        // LÓGICA DE AUTORIZACIÓN:
        
        // Si el usuario es un cliente y está intentando acceder al ADMIN
        if (datosUsuario.role === 'cliente' && intendedPath.startsWith('/fitstore/admin')) {
             return res.redirect(`${LOGIN_URL}?error=noadmin`);
        }
        
        // Si el usuario es ADMIN, el next() lo llevará a 'www-admin'
        // Si el usuario es CLIENTE, el next() lo llevará a 'www'
        // EN AMBOS CASOS, EL ACCESO ESTÁ PERMITIDO.
        next(); 
        
    } catch (error) {
        // Token inválido/expirado, redirige
        return res.redirect(`${LOGIN_URL}?error=expired`);
    }
}

export function verificarRolAdmin(req, res, next) {
    if (req.usuario && req.usuario.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ mensaje: 'Acceso denegado. Requiere rol de Administrador.' });
    }
}