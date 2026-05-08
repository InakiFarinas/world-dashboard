import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export function useCountryFilter(countries = []) {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const region = searchParams.get("region") || "";
	const sortKey = searchParams.get("sort") || "population";
	const sortDir = searchParams.get("dir") || "desc";
	const page = parseInt(searchParams.get("page") || "1");
	const PER_PAGE = 8;

	// Debounce en la búsqueda
	const debouncedQuery = useDebounce(query, 300);

	const setQuery = (newQuery) => {
		const params = new URLSearchParams(searchParams);
		if (newQuery) params.set("q", newQuery);
		else params.delete("q");
		params.set("page", "1");
		setSearchParams(params);
	};

	const setRegion = (newRegion) => {
		const params = new URLSearchParams(searchParams);
		if (newRegion) params.set("region", newRegion);
		else params.delete("region");
		params.set("page", "1");
		setSearchParams(params);
	};

	const setSort = (key, dir) => {
		const params = new URLSearchParams(searchParams);
		params.set("sort", key);
		params.set("dir", dir);
		params.set("page", "1");
		setSearchParams(params);
	};

	const setPage = (newPage) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage);
		setSearchParams(params);
	};

	const filtered = useMemo(() => {
		let result = [...countries];

		// 1. Filtro por texto (usa valor debouncified)
		if (debouncedQuery) {
			const q = debouncedQuery.toLowerCase();
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
			let av = sortKey === "name" ? a.name.common : a[sortKey] || 0;
			let bv = sortKey === "name" ? b.name.common : b[sortKey] || 0;
			if (av < bv) return sortDir === "asc" ? -1 : 1;
			if (av > bv) return sortDir === "asc" ? 1 : -1;
			return 0;
		});

		return result;
	}, [countries, debouncedQuery, region, sortKey, sortDir]);

	// Paginación aplicada sobre el resultado filtrado
	const totalPages = Math.ceil(filtered.length / PER_PAGE);
	const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

	const toggleSort = (key) => {
		const newDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
		setSort(key, newDir);
	};

	return {
		query,
		region,
		sort: { key: sortKey, dir: sortDir },
		page,
		totalPages,
		paginated,
		totalFiltered: filtered.length,
		handleQueryChange: setQuery,
		handleRegionChange: setRegion,
		toggleSort,
		setPage,
	};
}
