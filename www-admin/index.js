const API_URL = 'http://localhost:3000/fitstore/productos';
const tabla = document.getElementById('tabla-productos');
const formAlta = document.getElementById('form-alta');
const formEditar = document.getElementById('form-editar');
const formBuscar = document.getElementById('form-buscar');
const resultadoBusqueda = document.getElementById('resultado-busqueda');

const API_USUARIOS = 'http://localhost:3000/fitstore/usuarios-admin';
const tablaUsuarios = document.getElementById('tabla-usuarios');
const formUsuarios = document.getElementById('form-usuarios');
const formTitle = document.getElementById('form-usuarios-title');
const formSubmit = document.getElementById('form-usuarios-submit');


// === BUSCAR PRODUCTO POR ID ===
formBuscar.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('buscar-id').value;

  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    resultadoBusqueda.innerHTML = `<p class="text-danger">Producto no encontrado.</p>`;
    return;
  }

  const data = await res.json()

  const p = Array.isArray(data) ? data[0] : data;

  if (!p) {
    resultadoBusqueda.innerHTML = `<p class="text-danger">Producto no encontrado.</p>`;
    return;
  }

  resultadoBusqueda.innerHTML = `
    <div class="card p-3">
      <p><strong>ID:</strong> ${p.id}</p>
      <p><strong>Título:</strong> ${p.title}</p>
      <p><strong>Descripción:</strong> ${p.descripcion}</p>
      <p><strong>Precio:</strong> $${p.precio}</p>
      <p><strong>Imagen:</strong> ${p.img}</p>
    </div>
  `;
});

// === CARGAR PRODUCTOS ===
async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();

  tabla.innerHTML = productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.img}</td>
      <td>${p.title}</td>
      <td>${p.descripcion}</td>
      <td>$${p.precio}</td>
      <td>
        <button onclick="llenarFormularioEdicion(${p.id})">✏️</button>
        <button onclick="eliminarProducto(${p.id})">🗑️</button>
      </td>
    </tr>
  `).join('');
}

// === AGREGAR PRODUCTO ===
formAlta.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(formAlta));

  try {

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

  } catch (e) {

    console.log(e)

  }

  formAlta.reset();
  cargarProductos();
});

// === ELIMINAR PRODUCTO ===
async function eliminarProducto(id) {
  if (!confirm('¿Seguro que querés eliminar este producto?')) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarProductos();
}

// === LLENAR FORMULARIO DE EDICIÓN ===
async function llenarFormularioEdicion(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    alert('No se pudo obtener el producto')
    return;
  }

  const data = await res.json();
  const p = Array.isArray(data) ? data[0] : data

  if (!p) {
    alert('Producto no encontrado');
    return;
  }

  formEditar.elements['id'].value = p.id;
  formEditar.elements['img'].value = p.img;
  formEditar.elements['title'].value = p.title;
  formEditar.elements['descripcion'].value = p.descripcion;
  formEditar.elements['precio'].value = p.precio;
  formEditar.elements['categoria_id'].value = p.categoria_id;

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

// === EDITAR PRODUCTO (PUT) ===
formEditar.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = formEditar.id.value;
  const datos = Object.fromEntries(new FormData(formEditar));

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  formEditar.reset();
  cargarProductos();
});

// === LOGOUT ===
window.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
});

//=== LOGOUT: Borrado de access_token ===
async function handleLogout() {
    try {
        const response = await fetch('/fitstore/logout', {
            method: 'GET' 
        });

        if (response.ok) {
            sessionStorage.clear(); 
            
            window.location.href = '/fitstore/auth/login/login.html'; 
        } else {
            console.error('Error al cerrar sesión:', await response.json());
            alert('Error al cerrar sesión. Intente de nuevo.');
        }
    } catch (e) {
        console.error('Error de red al intentar cerrar sesión:', e);
        alert('Error de red. No se pudo cerrar la sesión.');
    }
}

// === CRUD USUARIOS: CARGAR ===
async function cargarUsuarios() {
    const res = await fetch(API_USUARIOS);
    if (res.status === 401) {
        handleLogout(); 
        return;
    }
    const usuarios = await res.json();

    tablaUsuarios.innerHTML = usuarios.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
                <button onclick="llenarFormularioUsuario(${u.id})">✏️</button>
                <button onclick="eliminarUsuario(${u.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

// === CRUD USUARIOS: ALTA/EDICIÓN ===
formUsuarios.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('usuario-id').value;
    const datos = Object.fromEntries(new FormData(formUsuarios));
    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_USUARIOS}/${id}` : `${API_USUARIOS}/registro`;

    if (metodo === 'PUT' && !datos.password) {
        delete datos.password;
    }
    

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    formUsuarios.reset();
    formTitle.textContent = 'Crear Nuevo Usuario/Admin';
    formSubmit.textContent = 'Guardar Usuario';
    document.getElementById('usuario-id').value = '';
    cargarUsuarios();
});


// === CRUD USUARIOS: BAJA ===
async function eliminarUsuario(id) {
    if (!confirm('¿Seguro que querés eliminar este usuario?')) return;

    await fetch(`${API_USUARIOS}/${id}`, { method: 'DELETE' });
    cargarUsuarios();
}

// === CRUD USUARIOS: LLENAR FORMULARIO (para edición) ===
async function llenarFormularioUsuario(id) {
    const res = await fetch(`${API_USUARIOS}/${id}`);
    if (!res.ok) { alert('No se pudo obtener el usuario'); return; }

    const u = await res.json();
    
    // Configurar el formulario para edición
    document.getElementById('usuario-id').value = u.id;
    formUsuarios.elements['nombre'].value = u.nombre;
    formUsuarios.elements['email'].value = u.email;
    formUsuarios.elements['role'].value = u.role;
    document.getElementById('usuario-password').required = false;
    
    formTitle.textContent = `Editar Usuario: ${u.nombre}`;
    formSubmit.textContent = 'Guardar Cambios';

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}


// === INICIALIZAR ===
cargarProductos()
cargarUsuarios()