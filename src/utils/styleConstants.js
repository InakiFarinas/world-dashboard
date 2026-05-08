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
