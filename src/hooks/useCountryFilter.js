import { useState, useMemo } from "react";

export function useCountryFilter(countries = []) {
	const [query, setQuery] = useState("");
	const [region, setRegion] = useState("");
	const [sort, setSort] = useState({ key: "population", dir: "desc" });
	const [page, setPage] = useState(1);
	const PER_PAGE = 8;

	const filtered = useMemo(() => {
		let result = [...countries];

		// 1. Filtro por texto
		if (query) {
			const q = query.toLowerCase();
			result = result.filter(
				(c) =>
					c.name.common.toLowerCase().includes(q) ||
					c.capital?.[0]?.toLowerCase().includes(q),
			);
		}

		// 2. Filtro por región
		if (region) result = result.filter((c) => c.region === region);

		// 3. Ordenamiento
		result.sort((a, b) => {
			let av = sort.key === "name" ? a.name.common : a[sort.key] || 0;
			let bv = sort.key === "name" ? b.name.common : b[sort.key] || 0;
			if (av < bv) return sort.dir === "asc" ? -1 : 1;
			if (av > bv) return sort.dir === "asc" ? 1 : -1;
			return 0;
		});

		return result;
	}, [countries, query, region, sort]);

	// Paginación aplicada sobre el resultado filtrado
	const totalPages = Math.ceil(filtered.length / PER_PAGE);
	const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

	const toggleSort = (key) => {
		setPage(1);
		setSort((prev) =>
			prev.key === key
				? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
				: { key, dir: "desc" },
		);
	};

	const handleQueryChange = (v) => {
		setQuery(v);
		setPage(1);
	};
	const handleRegionChange = (v) => {
		setRegion(v);
		setPage(1);
	};

	return {
		query,
		region,
		sort,
		page,
		totalPages,
		paginated,
		totalFiltered: filtered.length,
		handleQueryChange,
		handleRegionChange,
		toggleSort,
		setPage,
	};
}
