// Funciones de formato reutilizables para la app
export function fmt(n) {
	if (!n && n !== 0) return "—";
	if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
	if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
	if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
	return n.toLocaleString();
}

export function joinValues(values) {
	return values && values.length > 0 ? values.join(", ") : "—";
}

// Variante compacta usada en charts (sin decimales para millones)
export function formatCompact(v) {
	if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
	if (v >= 1e6) return (v / 1e6).toFixed(0) + "M";
	return v.toLocaleString();
}

export default { fmt, joinValues, formatCompact };
