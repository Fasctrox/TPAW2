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

/*
export async function obtenerTodosUsuarios() {
    try {
        const query = 'SELECT id, email, nombre, role FROM usuarios ORDER BY id';
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (e) {
        console.error("Error al obtener todos los usuarios:", e);
        throw e;
    }
}

export async function obtenerUsuarioPorId(id) {
    try {
        const query = 'SELECT id, email, nombre, role FROM usuarios WHERE id=$1';
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    } catch (e) {
        console.error("Error al obtener usuario por ID:", e);
        throw e;
    }
}

export async function actualizarUsuario(id, nombre, email, passwordHash, role) {
    let query;
    let params;

    if (passwordHash) {
        query = `
            UPDATE usuarios 
            SET nombre=$2, email=$3, password_hash=$4, role=$5
            WHERE id=$1 RETURNING id`;
        params = [id, nombre, email, passwordHash, role];
    } else {
        query = `
            UPDATE usuarios 
            SET nombre=$2, email=$3, role=$4
            WHERE id=$1 RETURNING id`;
        params = [id, nombre, email, role];
    }
    
    try {
        const resultado = await pool.query(query, params);
        return resultado.rowCount > 0;
    } catch (e) {
        console.error("Error al actualizar usuario:", e);
        throw e;
    }
}

export async function eliminarUsuario(id) {
    try {
        const query = 'DELETE FROM usuarios WHERE id=$1';
        const resultado = await pool.query(query, [id]);
        return resultado.rowCount > 0;
    } catch (e) {
        console.error("Error al eliminar usuario:", e);
        throw e;
    }
}

*/