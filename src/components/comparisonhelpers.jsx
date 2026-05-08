import { SPACING, FONT_SIZE, BORDER_RADIUS } from "../../utils/styleConstants";

// Helper para obtener color según el índice
export const getCountryColor = (index) => (index === 0 ? "#3B82F6" : "#EF4444");

// Helper para calcular densidad de población
export const calculateDensity = (population, area) => {
	return area && population ? Math.round(population / area) : 0;
};

// Helper para verificar si país tiene idiomas
export const hasLanguages = (country) => {
	return country.languages && Object.keys(country.languages).length > 0;
};

// Componente reutilizable para info del país
export function CountryHeader({ country, color }) {
	return (
		<div
			style={{
				display: "flex",
				gap: SPACING.MD,
				alignItems: "flex-start",
				marginBottom: SPACING.MD,
			}}
		>
			<img
				src={country.flags.svg}
				alt={country.name.common}
				style={{
					width: 64,
					height: 48,
					objectFit: "cover",
					borderRadius: BORDER_RADIUS.SM,
				}}
			/>
			<div>
				<h3
					style={{
						fontSize: FONT_SIZE.LABEL,
						fontWeight: 600,
						color: "var(--text-1)",
						margin: 0,
					}}
				>
					{country.name.common}
				</h3>
				<p
					style={{
						fontSize: FONT_SIZE.SMALL,
						color: "var(--text-2)",
						margin: "4px 0 0 0",
					}}
				>
					{country.region}
				</p>
			</div>
		</div>
	);
}

// Componente reutilizable para sección de idiomas
export function LanguagesSection({ country }) {
	if (!hasLanguages(country)) return null;

	return (
		<div
			style={{
				paddingTop: SPACING.SM,
				borderTop: "1px solid var(--border)",
			}}
		>
			<p
				style={{
					fontSize: FONT_SIZE.SMALL,
					color: "var(--text-2)",
					textTransform: "uppercase",
					marginBottom: SPACING.XS,
					margin: "0 0 4px 0",
				}}
			>
				Idiomas
			</p>
			<p
				style={{
					fontSize: FONT_SIZE.LABEL,
					color: "var(--text-1)",
					margin: 0,
				}}
			>
				{Object.values(country.languages).join(", ")}
			</p>
		</div>
	);
}
