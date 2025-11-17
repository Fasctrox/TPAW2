# 🏪 FitStore — Tienda Deportiva 🛡️

**FitStore** es una aplicación web full-stack para la gestión y visualización de productos deportivos. La aplicación implementa un sistema de autenticación robusto basado en JWT y roles.

***

## 🚀 Características principales

* **Autenticación Segura (JWT):** Acceso a la API y al panel de administración protegido mediante **JSON Web Tokens (JWT)**, almacenados en *cookies* `HttpOnly`.
* **Gestión de Roles:** Diferenciación en el acceso y redirección para usuarios (`cliente`) y administradores (`admin`).
* **Módulo de Usuarios CRUD:** Gestión completa de usuarios administradores y clientes (Creación, Edición y Baja).
* **CRUD de Productos y Clases:** Panel administrativo dedicado para la gestión del catálogo.
* **Frontend Privado:** El sitio principal (`/fitstore/www`) requiere autenticación para acceder a los productos y clases.
* **Seguridad de Contraseñas:** Hashing de claves mediante **Bcrypt**.
* **Despliegue Flexible:** Configuración centralizada de claves secretas y puertos vía **Dotenv**.

***

## 🧩 Tecnologías y Seguridad utilizadas

| Categoría | Tecnología | Uso Específico |
| :--- | :--- | :--- |
| **Frontend** | HTML, CSS, JavaScript (ESM) | Interfaz de usuario, manejo de eventos y llamadas a la API (Fetch API). |
| **Backend** | Node.js + Express | Servidor, lógica de negocio y arquitectura MVC. |
| **Base de datos** | PostgreSQL | Almacenamiento persistente (`productos`, `categorias`, **`usuarios`**). |
| **Seguridad** | **JWT / Bcrypt** | Estándar de autenticación y hashing de contraseñas. |
| **Configuración** | **Dotenv** | Gestión segura de variables de entorno (`JWT_SECRET`). |

***

## ⚙️ Instalación y configuración

1.  Cloná el repositorio e ingresá al directorio:

    ```bash
    git clone [https://github.com/](https://github.com/)[tu-usuario]/fitstore.git
    cd fitstore
    ```

2.  **Configurá la Base de Datos:**
    Asegurate de tener PostgreSQL configurado con las tablas `productos`, `categorias` y **`usuarios`** (con las columnas `email`, `password_hash`, y `role`).

3.  **Creá el archivo de entorno `.env`:**
    Creá un archivo llamado `.env` en la raíz del proyecto y definí tu clave secreta:

    ```env
    # Clave secreta para firmar los JWT
    JWT_SECRET="LLave mega ultra secreta, digna de la CIA"
    ```

4.  Instalá las dependencias:

    ```bash
    npm install
    ```

5.  Iniciá el servidor:

    ```bash
    npm run dev
    ```

***

## 👥 Usuarios de Prueba

Para acceder al panel de administración (`/fitstore/admin`), el usuario debe tener el rol **`admin`**.

| Rol | Email | Contraseña | Acceso |
| :--------| :------------------------| :------------| :--- |
| **Administrador** | *admin@example.com* | *123* | `/fitstore/admin` |
| **Cliente** | *usuario1@example.com* | *pass1* | `/fitstore/pages/home/home.html` |

***

## 📡 Endpoints de la API REST

Todas las rutas de la API (`/fitstore/productos`, `/fitstore/clases`, `/fitstore/usuarios`) son gestionadas por routers y son automáticamente **protegidas con JWT** y el **rol `admin`** para operaciones CRUD.

### 🔐 Rutas de Autenticación (Públicas)

| Método | Ruta | Descripción | Seguridad |
| :--- | :--- | :--- | :--- |
| `POST` | `/fitstore/registro` | Crea un nuevo usuario cliente. | Pública |
| `POST` | `/fitstore/login` | Autentica al usuario y establece la *cookie* **`access_token`**. | Pública |
| `GET` | `/fitstore/logout` | Cierra la sesión y elimina la *cookie* de autenticación. | Pública |

### 🛡️ Módulos Protegidos (CRUD)

Estas rutas aplican el *middleware* `verificarTokenAPI` y `verificarRolAdmin`.

| Módulo | Método | Ruta | Uso |
| :--- | :--- | :--- | :--- |
| **Productos/Clases** | `GET` | `/fitstore/[modulo]` | Lectura del catálogo (disponible públicamente si la ruta no pasa por el middleware). |
| **Productos/Clases** | `POST` | `/fitstore/[modulo]` | Alta de ítem. |
| **Productos/Clases** | `PUT` | `/fitstore/[modulo]/:id` | Modificación de ítem. |
| **Productos/Clases** | `DELETE`| `/fitstore/[modulo]/:id` | Baja de ítem. |
| **Usuarios** | `GET` | `/fitstore/usuarios` | Obtiene lista de todos los usuarios (requiere `admin`). |
| **Usuarios** | `DELETE`| `/fitstore/usuarios/:id`| Elimina un usuario. |
| **Usuarios** | `PUT` | `/fitstore/usuarios/:id` | Modifica datos o rol de un usuario. |

***


