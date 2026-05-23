-- Esquema de Base de Datos para LabTrack (PostgreSQL / MySQL )
CREATE TABLE IF NOT EXISTS reactivos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    formula VARCHAR(50),
    cantidad INT NOT NULL,
    unidad VARCHAR(10) NOT NULL DEFAULT 'g',
    ubicacion VARCHAR(50),
    estado VARCHAR(20) NOT NULL DEFAULT 'Disponible', -- 'Disponible', 'Critico', 'Agotado'
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

-- Datos semilla iniciales 
INSERT INTO reactivos (nombre, formula, cantidad, unidad, ubicacion, estado) VALUES
('Ácido Clorhídrico', 'HCl', 500, 'ml', 'Estante A-1', 'Disponible'),
('Hidróxido de Sodio', 'NaOH', 50, 'g', 'Estante B-2', 'Critico'),
('Sulfato de Cobre', 'CuSO4', 0, 'g', 'Estante A-3', 'Agotado');
