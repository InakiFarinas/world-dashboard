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
import { getThemeVars, getChartTooltipStyle } from "../../utils/themeUtils";

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
	const tooltipStyle = getChartTooltipStyle(themeVars);

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
					<Tooltip
						formatter={(v) => [formatCompact(v), "Población"]}
						contentStyle={tooltipStyle}
					/>
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
