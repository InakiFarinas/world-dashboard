import { useState, useMemo } from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import world110m from "world-atlas/countries-110m.json";
import {
	buildCountryMap,
	buildColorScale,
	resolveCountryKey,
} from "../utils/maputils";
import { useNavigate } from "react-router-dom";
import Panel from "./ui/panel";
import Button from "./ui/button";
import { fmt, joinValues } from "../utils/format";
import { getCountryNameES } from "../utils/countryNames";
import {
	CHART_METRIC_BUTTON,
	SPACING,
	FONT_SIZE,
	SHADOWS,
} from "../utils/styleConstants";

export function WorldMap({ countries }) {
	const [metric, setMetric] = useState("population");
	const [tooltip, setTooltip] = useState(null); // { x, y, country }
	const navigate = useNavigate();

	const countryMap = useMemo(() => buildCountryMap(countries), [countries]);
	const getColor = useMemo(
		() => buildColorScale(countries, metric),
		[countries, metric],
	);

	const METRICS = [
		{ key: "population", label: "Población" },
		{ key: "area", label: "Área" },
	];

	const metricLabel = metric === "population" ? "Población" : "Área";
	const metricValue = (country) =>
		metric === "population"
			? fmt(country.population)
			: country.area
				? `${fmt(country.area)} km²`
				: "—";
	const detailRows = (country) => [
		["Capital", country.capital?.[0] ?? "—"],
		["Región", country.region ?? "—"],
		["Población", fmt(country.population)],
		["Área", country.area ? `${fmt(country.area)} km²` : "—"],
		["Idiomas", joinValues(Object.values(country.languages || {}))],
		[
			"Monedas",
			joinValues(
				Object.values(country.currencies || {}).map(
					(c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`,
				),
			),
		],
		["Fronteras", country.borders?.length ? `${country.borders.length}` : "—"],
	];

	return (
		<Panel
			style={{
				overflow: "hidden",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				flex: 1,
				minHeight: 0,
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: `${SPACING.MD}px ${SPACING.XL}px`,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottom: "0.5px solid var(--border)",
				}}
			>
				<div>
					<p
						style={{
							fontSize: FONT_SIZE.TITLE,
							fontWeight: 500,
							color: "var(--text-1)",
						}}
					>
						Mapa mundial
					</p>
					<p
						style={{
							fontSize: FONT_SIZE.SUBTITLE,
							color: "var(--text-3)",
							marginTop: 1,
						}}
					>
						Intensidad por{" "}
						{metric === "population" ? "población" : "área (km²)"}
					</p>
				</div>

				<div style={{ display: "flex", gap: SPACING.SM }}>
					{METRICS.map((m) => (
						<Button
							key={m.key}
							onClick={() => setMetric(m.key)}
							active={metric === m.key}
							style={CHART_METRIC_BUTTON}
						>
							{m.label}
						</Button>
					))}
				</div>
			</div>

			{/* Mapa */}
			<div
				style={{
					flex: 1,
					minHeight: 0,
					overflow: "hidden",
					background: "var(--surface-2)",
				}}
			>
				<ComposableMap
					width={800}
					height={460}
					projectionConfig={{ scale: 155 }}
					style={{ width: "100%", height: "100%" }}
				>
					<ZoomableGroup
						zoom={1}
						minZoom={1}
						translateExtent={[
							[0, 0],
							[800, 460],
						]}
					>
						<Geographies geography={world110m}>
							{({ geographies }) =>
								geographies.map((geo) => {
									const countryName = geo.properties.name;
									const country = countryMap.get(
										resolveCountryKey(countryName),
									);
									const fill = getColor(countryName, countryMap);

									return (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											fill={fill}
											stroke="var(--surface)"
											strokeWidth={0.4}
											style={{
												default: { outline: "none" },
												hover: {
													outline: "none",
													filter: "brightness(1.15)",
													cursor: "pointer",
												},
												pressed: { outline: "none" },
											}}
											onMouseEnter={(e) => {
												if (country)
													setTooltip({ x: e.clientX, y: e.clientY, country });
											}}
											onMouseLeave={() => setTooltip(null)}
											onClick={() => {
												if (country) navigate(`/country/${country.cca3}`);
											}}
										/>
									);
								})
							}
						</Geographies>
					</ZoomableGroup>
				</ComposableMap>
			</div>

			{/* Tooltip */}
			{tooltip && (
				<div
					style={{
						position: "fixed",
						left: tooltip.x + 12,
						top: tooltip.y - 10,
						background: "var(--surface)",
						border: "0.5px solid var(--border)",
						borderRadius: FONT_SIZE.LABEL,
						padding: `${SPACING.SM}px ${SPACING.MD}px`,
						fontSize: FONT_SIZE.LABEL,
						pointerEvents: "none",
						zIndex: 50,
						minWidth: 140,
						boxShadow: SHADOWS.DEFAULT,
					}}
				>
					<p
						style={{
							fontWeight: 600,
							fontSize: FONT_SIZE.TITLE,
							marginBottom: SPACING.XS,
							color: "var(--text-1)",
						}}
					>
						{getCountryNameES(tooltip.country.name.common)}
					</p>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							gap: 16,
							marginBottom: 4,
						}}
					>
						<span style={{ color: "var(--text-3)" }}>Pintado por</span>
						<span style={{ color: "var(--text-1)", fontWeight: 500 }}>
							{metricLabel}: {metricValue(tooltip.country)}
						</span>
					</div>
					{detailRows(tooltip.country).map(([l, v]) => (
						<div
							key={l}
							style={{
								display: "flex",
								justifyContent: "space-between",
								gap: 16,
								marginTop: 2,
							}}
						>
							<span style={{ color: "var(--text-3)" }}>{l}</span>
							<span style={{ color: "var(--text-1)", fontWeight: 500 }}>
								{v}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Leyenda */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 10,
					padding: "10px 16px",
				}}
			>
				<span style={{ fontSize: 10, color: "var(--text-3)" }}>Menor</span>
				<div
					style={{
						flex: 1,
						height: 8,
						borderRadius: 4,
						background: "linear-gradient(to right, #C8E0F4, #0C447C)",
					}}
				/>
				<span style={{ fontSize: 10, color: "var(--text-3)" }}>Mayor</span>
				<div
					style={{
						marginLeft: "auto",
						fontSize: 10,
						fontWeight: 500,
						padding: "4px 8px",
						borderRadius: 999,
						background: "var(--surface)",
						border: "0.5px solid var(--border)",
						color: "var(--text-2)",
						whiteSpace: "nowrap",
					}}
				>
					Pintado por: {metricLabel}
				</div>
			</div>
		</Panel>
	);
}
