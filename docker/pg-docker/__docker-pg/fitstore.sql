\c fitstore;

-- ===========================================
-- Tabla: clases
-- ===========================================
CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    tiempo VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);

-- ===========================================
-- Tabla: producto
-- ===========================================
CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL
    categoria_id INT REFERENCES categorias(id)
);


-- ===========================================
-- Tabla: categorias
-- ===========================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    url VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- ===========================================
-- Tabla: usuarios
-- ===========================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);


-- ===========================================
-- Carga tabla clases
-- ===========================================
INSERT INTO clases (img, title, descripcion, tiempo, precio) VALUES
('../../assets/images/gap.webp', 'GAP', 'Entrenamiento de glúteos, abdominales y piernas.', '45 min', 3000),
('../../assets/images/crossfit.webp', 'Crossfit', 'Ejercicio de alta intensidad que combina levantamiento de pesas y gimnasia', '60 min', 3000),
('../../assets/images/funcional.webp', 'Funcional', 'Cardio intensivo que busca mejorar tu fuerza y resistencia', '60 min', 2500),
('../../assets/images/zumba.webp', 'Zumba', 'Una forma de ejercicio que se enfoca en la diversión y la energía.', '45 min', 2500),
('../../assets/images/bachata.webp', 'Bachata', 'Una introducción al apasionante mundo de la danza latina.', '50 min', 2500),
('../../assets/images/salsa.webp', 'Salsa', 'Una experiencia dinámica y divertida que te sumerge en el ritmo de la música latina.', '60 min', 2500);


-- ===========================================
-- Carga tabla producto
-- ===========================================
INSERT INTO producto (img, title, descripcion, precio, categoria_id) VALUES
('../../assets/images/proteina.webp', 'Proteína', 'Suplemento deportivo para ganar masa muscular.', 15000, 2),
('../../assets/images/creatina.webp', 'Creatina', 'Sustancia natural que ayuda a los músculos a producir energía', 12000, 2),
('../../assets/images/gel.webp', 'Gel energético', 'Para un aporte rápido de carbohidratos durante entrenamientos largos.', 5000, 2),
('../../assets/images/zapas.webp', 'Zapatillas', 'Zapatillas deportivas para hacer tus actividades favoritas.', 25000, 3),
('../../assets/images/musculosa.webp', 'Musculosa', 'Musculosa para entrenamiento de alto impacto.', 20000, 3);


-- ===========================================
-- Carga tabla categorias
-- ===========================================
INSERT INTO categorias (nombre, descripcion) VALUES
('Clases', 'Funcional, GAP, Salsa, Crossfit, Bachata y más.'),
('Productos alimenticios', 'Proteínas, creatina, pre-entrenos y más suplementos.'),
('Ropa deportiva', 'Ropa cómoda, funcional y con estilo para entrenar.');


