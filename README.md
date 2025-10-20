# 🏪 FitStore — Tienda Deportiva

**FitStore** es una aplicación web para la gestión y visualización de productos deportivos.  
Cuenta con un **sitio público** donde los usuarios pueden ver los productos y un **panel de administración** para gestionar el catálogo (crear, editar y eliminar productos).

---

## 🚀 Características principales

- Visualización de productos por categorías.  
- Panel administrativo con login de acceso.  
- Creación, edición y eliminación de productos.  
- Imágenes, descripciones y precios dinámicos.  
- Conexión a base de datos (PostgreSQL).  
- API REST para la comunicación entre frontend y backend.

---

## 🧩 Tecnologías utilizadas

- **Frontend:** HTML, CSS, JavaScript (Fetch API)  
- **Backend:** Node.js + Express  
- **Base de datos:** PostgreSQL  
- **Servidor:** API REST con endpoints CRUD para productos y categorías  

---

## ⚙️ Instalación y configuración

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/[tu-usuario]/fitstore.git
   cd fitstore

2. Instalá las dependencias:

   ```bash
   npm install

3. Iniciá el servidor:

   ```bash
   npm run dev

## 👥 Usuario de prueba
Podés acceder al panel de administración con las siguientes credenciales:

| Nombre | Email | Contraseña |
|:--------|:------------------------|:------------|
| Usuario1 | usuario1@example.com | pass1 |
| Usuario2 | usuario2@example.com | pass2 |
| Usuario3 | usuario3@example.com | pass3 |
| Usuario4 | usuario4@example.com | pass4 |
| Usuario5 | usuario5@example.com | pass5 |
| Usuario6 | usuario6@example.com | pass6 |


## 📡 Endpoints principales

| Método | Ruta | Descripción |
|:-------|:------|:-------------|
| GET | `/fitstore/productos` | Obtiene todos los productos |
| GET | `/fitstore/productos/:id` | Obtiene un producto por ID |
| POST | `/fitstore/productos` | Crea un nuevo producto |
| PUT | `/fitstore/productos/:id` | Edita un producto existente |
| DELETE | `/fitstore/productos/:id` | Elimina un producto |

