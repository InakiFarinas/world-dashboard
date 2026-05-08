# 🌍 World Dashboard

Una aplicación web interactiva que proporciona información global sobre países, idiomas, regiones y estadísticas demográficas. El dashboard permite explorar datos de todo el mundo de forma visual e intuitiva.

## ✨ Características

- **📊 Dashboard Interactivo**: Vista general con estadísticas clave del mundo
- **🗺️ Mapa Mundial**: Visualización interactiva de países con información geográfica
- **📋 Tabla de Países**: Listado completo de países con filtros y búsqueda avanzada
- **� Comparador de Países**: Selecciona dos países y mira sus métricas lado a lado
  - Población, área, densidad, idiomas
  - Gráficos comparativos con barras proporcionales
  - Perfecto para crear videos demo 🎥
- **�📈 Gráficos Analíticos**:
  - Gráfico de barras por región
  - Gráfico circular de lenguajes más hablados
- **🔍 Filtros Inteligentes**: Busca y filtra países por nombre, región, idioma
- **⚡ Búsqueda Optimizada**: Debounce de 300ms para reducir re-renders (ver `useDebounce`)
- **🔗 URL State**: Los filtros se guardan en query params (`?q=argentina&region=Americas`) - puedes compartir búsquedas
- **🌐 Meta Tags Dinámicos**: Cada página de país tiene título y descripción únicos (SEO-friendly)
  - Ejemplo: "Argentina — World Stats Dashboard"
  - Funciona perfectamente para compartir en redes sociales
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
│   ├── themeUtils.js        # Utilidades de tema
│   └── useDebounce.js       # Hook para debounce (optimización de búsqueda)
├── App.jsx            # Componente raíz
└── main.jsx          # Punto de entrada
```

## 🎯 Patrones Técnicos

### 1. **Debounce en Búsqueda** (`useDebounce`)

Reduce renders innecesarios durante búsqueda de texto:

```javascript
const debouncedQuery = useDebounce(query, 300);
```

- Espera 300ms después del último cambio antes de filtrar
- Mejora significativa en performance con grandes datasets

### 2. **URL State Management** (`useCountryFilter`)

Los filtros viven en query params para compartir búsquedas:

- `?q=argentina` - búsqueda
- `?region=Americas` - región
- `?sort=population&dir=desc` - ordenamiento
- `?page=2` - paginación
- Ejemplo: `/table?q=spain&region=Europe&sort=population&dir=desc`

### 3. **Meta Tags Dinámicos** (`react-helmet-async`)

Cada página de país tiene SEO optimizado:

```javascript
<Helmet>
	<title>{country.name.common} — World Stats Dashboard</title>
	<meta name="description" content={`Learn about ${country.name.common}...`} />
	<meta
		property="og:title"
		content={`${country.name.common} — World Stats Dashboard`}
	/>
</Helmet>
```

Perfecto para compartir links en redes sociales.

### 4. **Comparador de Países** (`useCountryComparison` + `ComparisonView`)

La característica más "WOW" del dashboard:

1. **En la tabla**: Marca dos países con los checkboxes de la izquierda
2. **Comparación automática**: Se muestra directamente debajo de la tabla
3. **Visualización lado a lado**:
   - Banderas y nombres
   - Región, población, área
   - Densidad poblacional e idiomas
4. **Gráfico comparativo**:
   - Barras proporcionales para población y área
   - Colores distintivos (azul vs rojo)
   - Perfecto para grabar videos para LinkedIn 📹

**Casos de uso:**
- Comparar España vs Italia (tamaño similar, metros vs habitantes)
- Comparar China vs India (ambas populosas, áreas diferentes)
- Comparar Monaco vs Vaticano (microestados)

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
