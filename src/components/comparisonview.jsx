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

export function ComparisonView({ country1, country2, onClear }) {
	// Preparar datos para Recharts
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

	// Colores para los gráficos
	const colors = {
		[country1.name.common]: "#3B82F6",
		[country2.name.common]: "#EF4444",
	};

	const color1 = colors[country1.name.common];
	const color2 = colors[country2.name.common];

	return (
		<motion.div
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
						fontSize: FONT_SIZE.LG,
						fontWeight: 600,
						color: "var(--text-1)",
					}}
				>
					Comparación: {country1.name.common} vs {country2.name.common}
				</h2>
				<button
					onClick={onClear}
					style={{
						padding: "8px 16px",
						backgroundColor: "transparent",
						color: "var(--text-2)",
						border: "1px solid var(--border)",
						borderRadius: BORDER_RADIUS.SM,
						cursor: "pointer",
						fontSize: FONT_SIZE.SM,
						fontWeight: 500,
						transition: "all 0.2s",
					}}
					onMouseOver={(e) => {
						e.target.style.backgroundColor = "var(--bg-2)";
					}}
					onMouseOut={(e) => {
						e.target.style.backgroundColor = "transparent";
					}}
				>
					✕ Cerrar
				</button>
			</div>

			{/* Tarjetas de países lado a lado */}
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
										fontSize: FONT_SIZE.MD,
										fontWeight: 600,
										color: "var(--text-1)",
									}}
								>
									{country.name.common}
								</h3>
								<p
									style={{
										fontSize: FONT_SIZE.SM,
										color: "var(--text-2)",
									}}
								>
									{country.region}
								</p>
							</div>
						</div>

						{/* Métricas */}
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
								value={
									country.area && country.population
										? Math.round(country.population / country.area)
										: 0
								}
								color={idx === 0 ? color1 : color2}
							/>
							{country.languages &&
								Object.keys(country.languages).length > 0 && (
									<div
										style={{
											paddingTop: SPACING.SM,
											borderTop: "1px solid var(--border)",
										}}
									>
										<p
											style={{
												fontSize: FONT_SIZE.XS,
												color: "var(--text-2)",
												textTransform: "uppercase",
												marginBottom: SPACING.XS,
											}}
										>
											Idiomas
										</p>
										<p
											style={{
												fontSize: FONT_SIZE.SM,
												color: "var(--text-1)",
											}}
										>
											{Object.values(country.languages).join(", ")}
										</p>
									</div>
								)}
						</div>
					</Panel>
				))}
			</div>

			{/* Gráfico comparativo */}
			<Panel>
				<h3
					style={{
						fontSize: FONT_SIZE.MD,
						fontWeight: 600,
						color: "var(--text-1)",
						marginBottom: SPACING.MD,
					}}
				>
					Comparación de Métricas
				</h3>
				<ResponsiveContainer width="100%" height={300} minHeight={300}>
					<BarChart data={comparisonData}>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="var(--border)"
							vertical={false}
						/>
						<XAxis dataKey="metric" stroke="var(--text-2)" />
						<YAxis stroke="var(--text-2)" tickFormatter={(val) => fmt(val)} />
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--bg-2)",
								border: "1px solid var(--border)",
								borderRadius: BORDER_RADIUS.SM,
							}}
							labelStyle={{ color: "var(--text-1)" }}
							formatter={(value) => fmt(value)}
						/>
						<Legend
							wrapperStyle={{
								paddingTop: SPACING.MD,
							}}
						/>
						<Bar dataKey={country1.name.common} fill={color1} />
						<Bar dataKey={country2.name.common} fill={color2} />
					</BarChart>
				</ResponsiveContainer>
			</Panel>
		</motion.div>
	);
}

function MetricRow({ label, value, color }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontSize: FONT_SIZE.SM,
				}}
			>
				<span style={{ color: "var(--text-2)" }}>{label}</span>
				<span
					style={{
						fontWeight: 600,
						color: color,
					}}
				>
					{fmt(value)}
				</span>
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
