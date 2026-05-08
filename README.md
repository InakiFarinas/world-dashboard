# 🌍 World Dashboard

Una aplicación web interactiva que proporciona información global sobre países, idiomas, regiones y estadísticas demográficas. El dashboard permite explorar datos de todo el mundo de forma visual e intuitiva.

## ✨ Características

- **📊 Dashboard Interactivo**: Vista general con estadísticas clave del mundo
- **🗺️ Mapa Mundial**: Visualización interactiva de países con información geográfica
- **📋 Tabla de Países**: Listado completo de países con filtros y búsqueda avanzada
- **📈 Gráficos Analíticos**:
  - Gráfico de barras por región
  - Gráfico circular de lenguajes más hablados
- **🔍 Filtros Inteligentes**: Busca y filtra países por nombre, región, idioma
- **🌓 Tema Personalizable**: Modo claro y oscuro
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **⚡ Rendimiento**: Carga rápida con Vite y optimización de componentes

## 🛠️ Stack Tecnológico

- **Frontend**: React 18
- **Bundler**: Vite
- **Styling**: CSS3 + CSS Modules
- **Herramientas**: ESLint para calidad de código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── charts/         # Gráficos (piechart, barchart)
│   ├── sections/       # Secciones principales (overview, maps, table, analytics)
│   ├── ui/            # Componentes UI reutilizables (button, pagination, panel)
│   ├── layout.jsx     # Layout principal
│   ├── navigation.jsx # Barra de navegación
│   └── worldmap.jsx   # Mapa mundial interactivo
├── hooks/             # Custom hooks
│   ├── useCountries.js      # Hook para gestionar datos de países
│   ├── useCountryFilter.js  # Hook para filtrar países
│   └── useTheme.js          # Hook para tema claro/oscuro
├── pages/             # Páginas de la aplicación
│   └── countrypage.jsx      # Página de detalles de país
├── utils/             # Funciones utilitarias
│   ├── chartutils.js        # Utilidades para gráficos
│   ├── countryNames.js      # Mapeo de nombres de países
│   ├── format.js            # Funciones de formateo
│   ├── languageNames.js     # Mapeo de idiomas
│   ├── maputils.js          # Utilidades para el mapa
│   ├── styleConstants.js    # Constantes de estilos
│   └── themeUtils.js        # Utilidades de tema
├── App.jsx            # Componente raíz
└── main.jsx          # Punto de entrada
```

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/InakiFarinas/world-dashboard.git
cd world-dashboard

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar el build
npm run preview
```

## 📊 Páginas Principales

1. **Overview** - Dashboard principal con estadísticas globales
2. **Mapa** - Visualización interactiva de todos los países
3. **Tabla** - Listado detallado de países con filtros
4. **Análisis** - Gráficos y estadísticas avanzadas

## 🎨 Personalización

El proyecto incluye:
- Constantes de estilo en `styleConstants.js`
- Tema personalizable (claro/oscuro) con `useTheme.js`
- Colores y estilos CSS modulares

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Iñaki Fariñas**
- GitHub: [@InakiFarinas](https://github.com/InakiFarinas)
- Email: inakifarinas04@gmail.com

---

¿Preguntas o sugerencias? Siéntete libre de abrir un issue o contactarme.
