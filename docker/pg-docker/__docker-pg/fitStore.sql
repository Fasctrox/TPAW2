-- Conectar a la base de datos 'tienda'
\c tienda;

-- ===========================================
-- Base de datos: FitStore
-- ===========================================
CREATE DATABASE IF NOT EXISTS gimnasio;
USE gimnasio;

-- ===========================================
-- Tabla: clases
-- ===========================================
CREATE TABLE clases (
    id INT PRIMARY KEY AUTO_INCREMENT,
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
    id INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);

-- ===========================================
-- Tabla: ropa
-- ===========================================
CREATE TABLE ropa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);


-- ===========================================
-- Carga tabla clases
-- ===========================================
INSERT INTO clases (id, img, title, descripcion, tiempo, precio) VALUES
(1, '../../assets/images/gap.webp', 'GAP', 'Entrenamiento de glúteos, abdominales y piernas.', '45 min', 3000),
(2, '../../assets/images/crossfit.webp', 'Crossfit', 'Ejercicio de alta intensidad que combina levantamiento de pesas y gimnasia', '60 min', 3000),
(3, '../../assets/images/funcional.webp', 'Funcional', 'Cardio intensivo que busca mejorar tu fuerza y resistencia', '60 min', 2500),
(4, '../../assets/images/zumba.webp', 'Zumba', 'Una forma de ejercicio que se enfoca en la diversión y la energía.', '45 min', 2500),
(5, '../../assets/images/bachata.webp', 'Bachata', 'Una introducción al apasionante mundo de la danza latina.', '50 min', 2500),
(6, '../../assets/images/salsa.webp', 'Salsa', 'Una experiencia dinámica y divertida que te sumerge en el ritmo de la música latina.', '60 min', 2500);

-- ===========================================
-- Carga tabla producto
-- ===========================================
INSERT INTO producto (id, img, title, descripcion, precio) VALUES
(7, '../../assets/images/proteina.webp', 'Proteína', 'Sumplemento deportivo para ganar esa masa muscular que tanto deseas.', 15000),
(8, '../../assets/images/creatina.webp', 'Creatina', 'Sustancia natural que ayuda a los músculos a producir energía', 12000),
(9, '../../assets/images/gel.webp', 'Gel energetico', 'Para un aporte rápido de carbohidratos durante entrenamientos de larga duración.', 5000);

-- ===========================================
-- Carga tabla ropa
-- ===========================================
INSERT INTO ropa (id, img, title, descripcion, precio) VALUES
(10, '../../assets/images/zapas.webp', 'Zapatillas', 'Zapatillas deportivas para hacer tus actividades favoritas.', 25000),
(11, '../../assets/images/musculosa.webp', 'Musculosa', 'Musculosa para entrenamiento de alto impacto.', 20000);
