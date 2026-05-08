import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import Panel from "./ui/panel";
import { SPACING, FONT_SIZE, BORDER_RADIUS } from "../utils/styleConstants";
import { fmt } from "../utils/format";
import { SecondaryButton } from "./ui/buttongroup";
import {
	getCountryColor,
	calculateDensity,
	CountryHeader,
	LanguagesSection,
} from "./comparisonhelpers";

const MotionDiv = motion.div;

export function ComparisonView({ country1, country2, onClear }) {
	const comparisonData = [
		{
			metric: "Población",
			[country1.name.common]: country1.population || 0,
			[country2.name.common]: country2.population || 0,
		},
		{
			metric: "Área (km²)",
			[country1.name.common]: country1.area || 0,
			[country2.name.common]: country2.area || 0,
		},
	];

	const color1 = getCountryColor(0);
	const color2 = getCountryColor(1);

	return (
		<MotionDiv
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: SPACING.LG,
				}}
			>
				<h2
					style={{
						fontSize: FONT_SIZE.LABEL,
						fontWeight: 600,
						color: "var(--text-1)",
						margin: 0,
					}}
				>
					Comparación: {country1.name.common} vs {country2.name.common}
				</h2>
				<SecondaryButton onClick={onClear}>✕ Cerrar</SecondaryButton>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: SPACING.LG,
					marginBottom: SPACING.LG,
				}}
			>
				{[country1, country2].map((country, idx) => (
					<Panel key={country.cca3}>
						<CountryHeader
							country={country}
							color={idx === 0 ? color1 : color2}
						/>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: SPACING.SM,
							}}
						>
							<MetricRow
								label="Población"
								value={country.population}
								color={idx === 0 ? color1 : color2}
							/>
							<MetricRow
								label="Área (km²)"
								value={country.area}
								color={idx === 0 ? color1 : color2}
							/>
							<MetricRow
								label="Densidad (hab/km²)"
								value={calculateDensity(country.population, country.area)}
								color={idx === 0 ? color1 : color2}
							/>
							<LanguagesSection country={country} />
						</div>
					</Panel>
				))}
			</div>

			<Panel>
				<h3
					style={{
						fontSize: FONT_SIZE.LABEL,
						fontWeight: 600,
						color: "var(--text-1)",
						marginBottom: SPACING.MD,
					}}
				>
					Comparación de Métricas
				</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={comparisonData}>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="var(--border)"
							vertical={false}
						/>
						<XAxis dataKey="metric" stroke="var(--text-2)" />
						<YAxis stroke="var(--text-2)" tickFormatter={(v) => fmt(v)} />
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--bg-2)",
								border: "1px solid var(--border)",
								borderRadius: BORDER_RADIUS.SM,
							}}
							formatter={(v) => fmt(v)}
						/>
						<Legend wrapperStyle={{ paddingTop: SPACING.MD }} />
						<Bar dataKey={country1.name.common} fill={color1} />
						<Bar dataKey={country2.name.common} fill={color2} />
					</BarChart>
				</ResponsiveContainer>
			</Panel>
		</MotionDiv>
	);
}

function MetricRow({ label, value, color }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontSize: FONT_SIZE.LABEL,
				}}
			>
				<span style={{ color: "var(--text-2)" }}>{label}</span>
				<span style={{ fontWeight: 600, color }}>{fmt(value)}</span>
			</div>
			<div
				style={{
					height: 8,
					backgroundColor: "var(--bg-3)",
					borderRadius: BORDER_RADIUS.SM,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						height: "100%",
						width: "100%",
						backgroundColor: color,
						opacity: 0.7,
					}}
				/>
			</div>
		</div>
	);
}
