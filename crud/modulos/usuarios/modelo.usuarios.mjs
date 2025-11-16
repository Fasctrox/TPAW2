import pool from '../../../config/db.mjs'

export async function crearUsuario(email, nombre, password_hash, role = 'cliente') {
    try {
        const query = `
            INSERT INTO usuarios (email, nombre, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, nombre, role`;
            
        const resultado = await pool.query(query, [email, nombre, password_hash, role]);
        return resultado.rows[0];
    } catch (e) {
        if (e.code === '23505') { 
             throw new Error('El email ya está registrado.');
        }
        console.error("Error al crear usuario:", e);
        throw new Error('Error en la base de datos al crear usuario.');
    }
}

export async function obtenerUsuario(email){
    try {
        
        const query = 'SELECT id, email, password_hash, role FROM usuarios WHERE email = $1 LIMIT 1';
        const resultado = await pool.query(query, [email])
        return resultado.rows[0]

    } catch (e) {
        console.log("Error al obtener el usuario: ", e)
        throw new Error('Error de base de datos durante el login')
    }
}