# LabTrack 🧪

## Sistema de Control de Stock para Laboratorios Químicos

### 🌟 Automatización y Rigurosidad Industrial mediante Software

**LabTrack** es una solución desarrollada para optimizar la gestión y control de inventario de reactivos y muestras en laboratorios químicos, industriales y de investigación.

El sistema resuelve problemáticas reales de almacenamiento mediante:

- Alertas automáticas de stock crítico
- Manejo estricto de unidades de medida
- Persistencia relacional de datos
- Dashboard operativo en tiempo real

---

## 🚀 Características Principales

### 📦 CRUD Completo de Reactivos

Registro, edición, actualización y eliminación de insumos químicos en tiempo real.

---

### 📊 Dashboard con Métricas Críticas

Visualización dinámica del estado del inventario:

- Total de reactivos registrados
- Reactivos en estado crítico
- Reactivos agotados
- Alertas automáticas cuando el stock es menor a **50g/ml**

---

### 🎨 UI Contextual y Escaneable

Interfaz moderna e intuitiva basada en códigos de color estandarizados para facilitar la toma de decisiones rápidas dentro del laboratorio o planta industrial.

---

### 🧪 Calidad de Código y Testing

- Arquitectura desacoplada
- Tipado estricto con TypeScript
- Testing automatizado con Jest
- Cobertura de lógica crítica de negocio

---

## 🛠️ Stack Tecnológico

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend

- Node.js
- Express.js
- TypeScript
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

### 2️⃣ Configurar Variables de Entorno

Crear un archivo `.env` dentro de:

```bash
/labtrack-backend
```

Agregar:

```env
PORT=5000
DATABASE_URL=postgresql://usuario:password@localhost:5432/tu_base_de_datos
```

---

### 3️⃣ Instalar dependencias automáticamente ⚡

Gracias a la integración con `concurrently`, no es necesario instalar dependencias manualmente carpeta por carpeta.

Desde la raíz del proyecto ejecutar:

```bash
npm run install-all
```

---

### 4️⃣ Ejecutar el entorno de desarrollo 🚀

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

## 📂 Arquitectura del Proyecto (Monorepo)

```bash
labtrack-fullstack/
│
├── labtrack-backend/        # API REST (Node.js + Express + PostgreSQL)
│   ├── src/                 # Controladores, rutas y configuración
│   ├── utils/               # Lógica de negocio y helpers
│   └── schema.sql           # Estructura e inicialización de la BD
│
├── labtrack-frontend/       # Cliente Web (React + Vite)
│
└── package.json             # Scripts globales y automatización
```

---

## 📌 Objetivo del Proyecto

LabTrack fue desarrollado como una solución enfocada en:

- Digitalización de procesos de laboratorio
- Optimización del control de stock químico
- Reducción de errores manuales
- Escalabilidad y mantenibilidad del sistema
- 
## 🗺️ Roadmap / Próximas Implementaciones
Con el objetivo de llevar LabTrack a un entorno de producción industrial y bajo normas de calidad, se planifican las siguientes mejoras:
- **Seguridad (Ciberdefensa):** Implementación de autenticación JWT y control de acceso basado en roles (RBAC) para proteger los endpoints de la API.
- **Trazabilidad Química:** Incorporación de alertas automáticas por fecha de vencimiento de reactivos y control de ubicación física (Góndola/Heladera/Depósito).
- **Auditoría:** Registro histórico de movimientos de stock para cumplimiento de normativas de laboratorio.
---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia MIT.
