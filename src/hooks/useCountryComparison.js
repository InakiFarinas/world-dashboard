import { useState } from "react";

export function useCountryComparison() {
	const [selectedCountries, setSelectedCountries] = useState([]);

	const toggleCountry = (country) => {
		setSelectedCountries((prev) => {
			// Si ya está seleccionado, remover
			const isSelected = prev.some((c) => c.cca3 === country.cca3);
			if (isSelected) {
				return prev.filter((c) => c.cca3 !== country.cca3);
			}

			// Máximo 2 países
			if (prev.length >= 2) {
				return [prev[1], country];
			}

			return [...prev, country];
		});
	};

	const isSelected = (country) => {
		return selectedCountries.some((c) => c.cca3 === country.cca3);
	};

	const clearSelection = () => {
		setSelectedCountries([]);
	};

	const canCompare = selectedCountries.length === 2;

	return {
		selectedCountries,
		toggleCountry,
		isSelected,
		clearSelection,
		canCompare,
	};
}
