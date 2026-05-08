import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export function CountryPage({ countries, theme, onToggle }) {
	const { cca3 } = useParams();
	const navigate = useNavigate();

	const country = countries.find((c) => c.cca3 === cca3.toUpperCase());

	// Resuelve códigos de frontera → objetos país completos
	const borderCountries = (country?.borders ?? [])
		.map((code) => countries.find((c) => c.cca3 === code))
		.filter(Boolean);

	if (!country)
		return (
			<Layout theme={theme} onToggle={onToggle}>
				<p className="text-zinc-400">País no encontrado.</p>
			</Layout>
		);

	const languages = Object.values(country.languages || {}).join(", ");
	const currencies = Object.values(country.currencies || {})
		.map((c) => `${c.name} (${c.symbol ?? "—"})`)
		.join(", ");

	return (
		<Layout theme={theme} onToggle={onToggle}>
			<button
				onClick={() => navigate("/")}
				className="mb-6 flex items-center gap-2 text-sm text-zinc-500
          hover:text-zinc-900 transition-colors"
			>
				← Volver al dashboard
			</button>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Columna izquierda: bandera */}
				<div>
					<img
						src={country.flags.svg}
						alt={country.name.common}
						className="w-full rounded-xl border border-zinc-100
              dark:border-zinc-800 shadow-sm"
					/>
				</div>

				{/* Columna derecha: info */}
				<div>
					<h1 className="text-2xl font-semibold mb-6">{country.name.common}</h1>

					<div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
						{[
							["Capital", country.capital?.[0] ?? "—"],
							["Región", country.region],
							["Población", (country.population || 0).toLocaleString()],
							[
								"Área",
								country.area ? country.area.toLocaleString() + " km²" : "—",
							],
							["Idiomas", languages || "—"],
							["Monedas", currencies || "—"],
						].map(([label, value]) => (
							<div key={label}>
								<p
									className="text-xs font-medium text-zinc-400 uppercase
                  tracking-wider mb-1"
								>
									{label}
								</p>
								<p className="text-sm text-zinc-900 dark:text-zinc-100">
									{value}
								</p>
							</div>
						))}
					</div>

					{/* Chips de fronteras — el diferenciador visual */}
					<div>
						<p
							className="text-xs font-medium text-zinc-400 uppercase
              tracking-wider mb-3"
						>
							Países fronterizos
						</p>

						{borderCountries.length === 0 ? (
							<p className="text-sm text-zinc-400">Sin fronteras terrestres</p>
						) : (
							<div className="flex flex-wrap gap-2">
								{borderCountries.map((b) => (
									<Link
										key={b.cca3}
										to={`/country/${b.cca3}`}
										className="flex items-center gap-2 px-3 py-1.5 text-xs
					  font-medium rounded-full border border-zinc-300 bg-white text-zinc-900
					  dark:border-zinc-700 dark:bg-transparent dark:text-zinc-200 hover:bg-zinc-100
					  hover:border-zinc-300 hover:text-zinc-900 dark:hover:bg-zinc-800
					  dark:hover:border-zinc-600 dark:hover:text-zinc-100 transition-colors"
									>
										<img
											src={b.flags.svg}
											alt=""
											className="w-5 h-3 object-cover rounded-sm"
										/>
										{b.name.common}
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
