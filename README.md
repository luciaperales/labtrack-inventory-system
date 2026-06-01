# LabTrack 🧪

## Sistema de Gestión de Stock para Laboratorios Químicos

### 🌟 Automatización, trazabilidad y control seguro de inventario químico.

---

## 🎥 Demo del Sistema

### 📊 Dashboard y Gestión de Reactivos

![Demo Dashboard](./assets/demolabtrack.gif)

---

**LabTrack** es una plataforma fullstack para optimizar la gestión y control de inventario de reactivos y muestras en laboratorios químicos, industriales y de investigación.

El sistema permite gestionar inventario en tiempo real, visualizar métricas críticas y garantizar seguridad mediante autenticación JWT y control de acceso basado en roles (RBAC).

# 🚀 Características Principales

## 📦 Gestión Completa de Reactivos (CRUD)

- Alta de reactivos químicos
- Edición y actualización en tiempo real
- Eliminación segura de registros
- Persistencia relacional con PostgreSQL

---

### 📊 Dashboard con Métricas Críticas

Visualización dinámica del estado del inventario:

- Total de reactivos registrados
- Reactivos en estado crítico
- Reactivos agotados
- Alertas automáticas de stock bajo
- Estados visuales mediante colores contextuales

---
## 🔐 Seguridad y Autenticación

### Implementación de autenticación JWT

- Login seguro mediante tokens
- Protección de endpoints privados
- Persistencia de sesión autenticada

### RBAC (Role-Based Access Control)

Control de acceso basado en roles:

- Administrador
- Analista

Cada rol posee permisos específicos sobre las operaciones del sistema.

---
### 🎨 UI Contextual y Escaneable

Interfaz moderna e intuitiva basada en códigos de color estandarizados para facilitar la toma de decisiones rápidas dentro del laboratorio o planta industrial.

---

### 🧪 Calidad de Código y Testing

- Arquitectura desacoplada
- Tipado estricto con TypeScript
- Testing automatizado con Jest
- Validación de lógica crítica de negocio
- Código modular y escalable


---

## 🛠️ Stack Tecnológico

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- RBAC Authorization
- Jest & TS-Jest

### Base de Datos

- PostgreSQL

---

## 💻 Instalación y Configuración Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO_GITHUB/labtrack-inventory-system.git
```

---

## 2️⃣ Instalar dependencias

Desde la raíz del proyecto:

```bash
npm run install-all
```

---

## 3️⃣ Configurar variables de entorno

Crear un archivo `.env` dentro de:

```bash
/labtrack-backend
```

### Variables necesarias

```env
PORT=5000

DATABASE_URL=postgresql://usuario:password@localhost:5432/labtrack

JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
```

---

## 4️⃣ Ejecutar el entorno de desarrollo

Levantar frontend y backend simultáneamente:

```bash
npm run dev
```

---


## 🧪 Testing y Calidad de Código

El proyecto incluye pruebas unitarias orientadas a validar la lógica de negocio del inventario:

- Estados de stock
- Cálculo automático de criticidad
- Reactivos agotados
- Validaciones internas

### Ejecutar tests del backend

```bash
npm run test-back
```

---

# 📂 Arquitectura del Proyecto

```bash
labtrack-fullstack/
│
├── assets/                     # GIFs e imágenes del README
│
├── labtrack-backend/
│   ├── src/
│   │   ├── controllers/        # Controladores HTTP
│   │   ├── routes/             # Endpoints API REST
│   │   ├── middlewares/        # Auth JWT y RBAC
│   │   ├── services/           # Lógica de negocio
│   │   ├── utils/              # Helpers y funciones auxiliares
│   │   └── config/             # Configuración general
│   │
│   ├── tests/                  # Tests unitarios
│   └── schema.sql              # Estructura de PostgreSQL
│
├── labtrack-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── context/
│
└── package.json                # Scripts globales y automatización
```

---

# 📸 Capturas

## Dashboard

![Auth](./assets/dashboard.png)

---

## Gestión de Reactivos

![CRUD](./assets/adminview2.png)


---

📈 Objetivos del Proyecto

- Digitalizar procesos de laboratorio
- Mejorar trazabilidad de insumos químicos
- Reducir errores manuales
- Implementar seguridad profesional en APIs
- Aplicar buenas prácticas fullstack
- Construir una arquitectura escalable

---
- 
# 🧠 Conceptos Aplicados

- Arquitectura cliente-servidor
- APIs RESTful
- Autenticación JWT
- Role-Based Access Control (RBAC)
- Manejo de estado en frontend
- Persistencia relacional
- Testing automatizado
- Monorepo architecture

---

# 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.

---
