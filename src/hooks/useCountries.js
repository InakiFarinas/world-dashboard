import { useQuery } from "@tanstack/react-query";

const fetchCountries = async () => {
	const res = await fetch(
		"https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,capital,languages,currencies,borders,cca3",
	);
	if (!res.ok) throw new Error("Error al cargar países");
	return res.json();
};

export const useCountries = () =>
	useQuery({
		queryKey: ["countries"],
		queryFn: fetchCountries,
		staleTime: 1000 * 60 * 10, // 10 min de caché
	});
