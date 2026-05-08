import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";
import { getPopByRegion } from "../../utils/chartutils";
import Panel from "../ui/panel";
import { formatCompact } from "../../utils/format";
import { FONT_SIZE } from "../../utils/styleConstants";
import { getThemeVars } from "../../utils/themeUtils";

function RegionTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;

	const entry = payload[0].payload;

	return (
		<div
			style={{
				background: "var(--surface)",
				border: "1px solid var(--border)",
				borderRadius: 10,
				padding: 10,
				boxShadow: "0 8px 24px rgba(0,0,0,.12)",
			}}
		>
			<div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: "var(--text-1)" }}>
				{entry.region}
			</div>
			<div style={{ fontSize: 12, color: "var(--text-2)" }}>
				{entry.population.toLocaleString()} habitantes
			</div>
		</div>
	);
}

const COLORS = {
	Asia: "#7F77DD",
	Americas: "#378ADD",
	Africa: "#EF9F27",
	Europe: "#1D9E75",
	Oceania: "#D85A30",
	Antarctic: "#888780",
};

export function RegionBarChart({ countries }) {
	const data = getPopByRegion(countries).filter(
		(entry) => entry.region !== "Antarctic" && entry.population > 0,
	);

	const themeVars = getThemeVars();

	return (
		<Panel
			title="Población por región"
			subtitle="Total de habitantes por continente"
			style={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<ResponsiveContainer width="100%" height={260}>
				<BarChart data={data} barSize={28}>
					<CartesianGrid
						strokeDasharray="3 3"
						vertical={false}
						stroke={themeVars.border}
					/>
					<XAxis
						dataKey="region"
						tick={{ fontSize: FONT_SIZE.LABEL, fill: themeVars.text3 }}
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						tickFormatter={formatCompact}
						tick={{ fontSize: FONT_SIZE.SMALL, fill: themeVars.text3 }}
						axisLine={false}
						tickLine={false}
						width={42}
					/>
					<Tooltip content={<RegionTooltip />} />
					<Bar dataKey="population" radius={[4, 4, 0, 0]}>
						{data.map((entry) => (
							<Cell
								key={entry.region}
								fill={COLORS[entry.region] ?? "#888780"}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Panel>
	);
}
