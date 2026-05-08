function normalizeKey(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : "";
}

const GEO_ALIASES = {
	"bosnia and herz.": "bosnia and herzegovina",
	"central african rep.": "central african republic",
	"dem. rep. congo": "democratic republic of the congo",
	"dominican rep.": "dominican republic",
	"eq. guinea": "equatorial guinea",
	"falkland is.": "falkland islands",
	"fr. s. antarctic lands": "french southern and antarctic lands",
	macedonia: "north macedonia",
	"n. cyprus": "northern cyprus",
	"s. sudan": "south sudan",
	"solomon is.": "solomon islands",
	"w. sahara": "western sahara",
	"côte d'ivoire": "ivory coast",
	"cote d'ivoire": "ivory coast",
	"ivory coast": "ivory coast",
	// Congo: "congo" (sin prefijo) del mapa es Republic of the Congo
	congo: "republic of the congo",
	"republic of congo": "republic of the congo",
	"congo republic": "republic of the congo",
	"rep. congo": "republic of the congo",
	"r. congo": "republic of the congo",
};

export function resolveCountryKey(value) {
	const key = normalizeKey(value);
	return GEO_ALIASES[key] ?? key;
}

// Construye un Map de lookup por código y nombre para topologías que no exponen ISO_A3
export function buildCountryMap(countries) {
	const map = new Map();

	for (const country of countries) {
		map.set(resolveCountryKey(country.cca3), country);
		map.set(resolveCountryKey(country.name?.common), country);
		map.set(resolveCountryKey(country.name?.official), country);
	}

	return map;
}

/**
 * Interpola un color entre dos hex según un valor 0-1
 * Usado para generar el gradiente del mapa
 */
export function interpolateColor(t, from = "#C8E0F4", to = "#0C447C") {
	const hex = (h) => [
		parseInt(h.slice(1, 3), 16),
		parseInt(h.slice(3, 5), 16),
		parseInt(h.slice(5, 7), 16),
	];
	const [r1, g1, b1] = hex(from);
	const [r2, g2, b2] = hex(to);
	const r = Math.round(r1 + (r2 - r1) * t);
	const g = Math.round(g1 + (g2 - g1) * t);
	const b = Math.round(b1 + (b2 - b1) * t);
	return `rgb(${r},${g},${b})`;
}

/**
 * Dado un array de países y una métrica ('population' | 'area'),
 * devuelve una función getColor(cca3) → color hex
 */
export function buildColorScale(countries, metric) {
	const values = countries.map((c) => c[metric] || 0).filter((v) => v > 0);

	if (values.length === 0) {
		return () => "#E4E4E7";
	}

	const logMin = Math.log(Math.min(...values));
	const logMax = Math.log(Math.max(...values));
	const hasRange =
		Number.isFinite(logMin) && Number.isFinite(logMax) && logMax > logMin;

	return (key, countryMap) => {
		const country = countryMap.get(resolveCountryKey(key));
		if (!country || !country[metric]) return "#E4E4E7"; // sin dato
		if (!hasRange) return interpolateColor(0.5);

		const t = (Math.log(country[metric]) - logMin) / (logMax - logMin);
		return interpolateColor(Math.max(0, Math.min(1, t)));
	};
}
