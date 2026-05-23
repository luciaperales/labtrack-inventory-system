# LabTrack 🧪 | Sistema de Control de Stock para Laboratorios Químicos

## 🌟 Automatización y Rigurosidad Industrial mediante Software
**LabTrack** es una solución  diseñada específicamente para optimizar la gestión y control de inventario de reactivos y muestras en entornos de laboratorios químicos, industriales o de investigación. 

Este proyecto resuelve problemáticas reales de almacenamiento como alertas automáticas de criticidad de stock, manejo estricto de unidades de medida de laboratorio y persistencia relacional.

---

## 🚀 Características 
- **CRUD Completo de Reactivos:** Registro, edición, actualización y eliminación de insumos químicos en tiempo real.
- **Métricas e Indicadores Críticos (Dashboard):** Tarjetas dinámicas que procesan automáticamente el inventario mostrando el total de reactivos, alertas de stock crítico (menor a 50g/ml) y reactivos agotados.
- **UI Contextualizada y Scannable:** Interfaz moderna e intuitiva que utiliza códigos de color estandarizados según el estado del reactivo para facilitar la toma de decisiones rápidas en planta.
- **Calidad de Código y Testing:** Arquitectura desacoplada, tipado estricto con TypeScript y cobertura de la lógica de negocio crítica mediante pruebas unitarias.

---

## 🛠️ Stack Tecnológico

### Frontend
- **React.js** con **TypeScript** .
- **Tailwind CSS** .
- **Lucide Icons** .

### Backend
- **Node.js** con **Express** .
- **TypeScript** .
- **Jest** & **TS-Jest** .

### Base de Datos
- **PostgreSQL** .

---
# 💻 Instalación y Configuración Local
Para clonar y ejecutar este proyecto localmente, seguí estos pasos:

# 1. Clonar el repositorio
Bash
git clone [https://github.com/TU_USUARIO_GITHUB/labtrack-inventory-system.git](https://github.com/TU_USUARIO_GITHUB/labtrack-inventory-system.git)
cd labtrack-inventory-system

# 2. Configurar Variables de Entorno
Crea un archivo .env dentro de la carpeta /labtrack-backend basándote en las credenciales de tu base de datos PostgreSQL local:

PORT=5000
DATABASE_URL=postgresql://usuario:password@localhost:5432/tu_base_de_datos

# 3. Instalación de dependencias automatizada ⚡
Gracias a la integración con concurrently, no necesitas entrar carpeta por carpeta. Instala todas las dependencias del Frontend y Backend con un solo comando en la raíz:


npm run install-all

# 4. Lanzar el entorno de desarrollo en simultáneo 🚀
Para encender el servidor Express y el cliente de React al mismo tiempo en una única consola, ejecuta:

npm run dev

---

# 🧪 Calidad de Código: Pruebas Unitarias
Para cumplir con los estándares de calidad de software requeridos, se implementó una suite de testing con Jest orientada a la validación automatizada de la lógica de negocio de los reactivos (cálculo automático de estados de stock: Disponible, Crítico, Agotado):

# Ejecutar los tests unitarios en el backend de forma aislada
npm run test-back

---

## 📊 Arquitectura del Proyecto (Monorepo)

El proyecto está organizado de manera modular y simétrica en un único repositorio, separando claramente las responsabilidades pero automatizando el entorno de desarrollo:

```text
labtrack-fullstack/
├── labtrack-backend/     # Servidor API REST (Node.js + Express + Postgres)
│   ├── src/              # Lógica de controladores, rutas y configuración de BD
│   ├── utils/            # Funciones auxiliares y lógica de negocio testeada
│   └── schema.sql        # Script de inicialización y estructura de la Base de Datos
├── labtrack-frontend/    # Interfaz de Usuario (React + Vite)
└── package.json          # Automatización global del pipeline de desarrollo (Concurrently)

---
