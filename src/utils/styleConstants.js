// Constantes de estilos reutilizables

// Border radius
export const BORDER_RADIUS = {
	SMALL: 4,
	XS: 3,
	MEDIUM: 6,
	BASE: 8,
	LARGE: 12,
	PILL: 20,
};

// Shadow
export const SHADOWS = {
	NONE: "none",
	SUBTLE: "0 2px 8px rgba(0,0,0,.08)",
	DEFAULT: "0 4px 12px rgba(0,0,0,.1)",
	CARD: "0 1px 3px rgba(0,0,0,.12)",
};

// Tooltip
export const TOOLTIP_STYLE = {
	fontSize: 12,
	borderRadius: BORDER_RADIUS.BASE,
	boxShadow: SHADOWS.NONE,
	// Los valores dinámicos (background, border, color) se agregan por componente
};

// Button
export const BUTTON_STYLE = {
	padding: "4px 10px",
	borderRadius: BORDER_RADIUS.BASE,
	fontSize: 12,
};

// Pagination button
export const PAGINATION_BUTTON_STYLE = {
	padding: "4px 10px",
	borderRadius: BORDER_RADIUS.MEDIUM,
	fontSize: 12,
};

// Chart metric button
export const CHART_METRIC_BUTTON = {
	padding: "4px 10px",
	borderRadius: BORDER_RADIUS.PILL,
	fontSize: 11,
};

// Typography
export const FONT_SIZE = {
	TITLE: 13,
	SUBTITLE: 11,
	LABEL: 12,
	SMALL: 10,
	SMALLEST: 8,
};

// Spacing
export const SPACING = {
	XS: 2,
	SM: 4,
	MD: 8,
	LG: 12,
	XL: 16,
};

// Button Styles - Reusable
export const BUTTON_PRIMARY = {
	padding: "8px 16px",
	backgroundColor: "#3B82F6",
	color: "white",
	border: "none",
	borderRadius: BORDER_RADIUS.BASE,
	cursor: "pointer",
	fontSize: FONT_SIZE.LABEL,
	fontWeight: 600,
	transition: "background 0.2s",
	hoverBg: "#2563EB",
};

export const BUTTON_SECONDARY = {
	padding: "8px 12px",
	backgroundColor: "transparent",
	color: "var(--text-2)",
	border: "1px solid var(--border)",
	borderRadius: BORDER_RADIUS.BASE,
	cursor: "pointer",
	fontSize: FONT_SIZE.LABEL,
	transition: "all 0.2s",
	hoverBg: "var(--bg-3)",
};

// Common Text Styles
export const TEXT_STYLES = {
	headingLarge: {
		fontSize: FONT_SIZE.LABEL,
		fontWeight: 600,
		color: "var(--text-1)",
	},
	headingMedium: {
		fontSize: FONT_SIZE.LABEL,
		fontWeight: 600,
	},
	secondary: {
		fontSize: FONT_SIZE.LABEL,
		color: "var(--text-2)",
	},
	tertiary: {
		fontSize: FONT_SIZE.SMALLEST,
		color: "var(--text-3)",
	},
};
