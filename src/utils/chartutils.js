// Agrupa países por región y suma población
export function getPopByRegion(countries) {
	const map = {};
	countries.forEach((c) => {
		if (!c.region) return;
		map[c.region] = (map[c.region] || 0) + (c.population || 0);
	});
	return Object.entries(map)
		.map(([region, population]) => ({ region, population }))
		.sort((a, b) => b.population - a.population);
}

// Cuenta cuántos países hablan cada idioma, devuelve top N + "Otros"
export function getTopLanguages(countries, top = 6) {
	const map = {};
	countries.forEach((c) => {
		Object.values(c.languages || {}).forEach((lang) => {
			map[lang] = (map[lang] || 0) + 1;
		});
	});
	const sorted = Object.entries(map)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);

	const topLanguages = sorted.slice(0, top);
	const othersCount = sorted
		.slice(top)
		.reduce((sum, item) => sum + item.count, 0);

	if (othersCount > 0) {
		topLanguages.push({ name: "Otros", count: othersCount });
	}

	return topLanguages;
}

// Top N países por población
export function getTopCountries(countries, top = 5) {
	return [...countries]
		.sort((a, b) => b.population - a.population)
		.slice(0, top);
}
