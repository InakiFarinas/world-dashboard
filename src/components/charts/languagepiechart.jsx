import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { getTopLanguages } from "../../utils/chartUtils";
import { getLanguageNameES } from "../../utils/languageNames";
import Panel from "../ui/panel";
import { FONT_SIZE } from "../../utils/styleConstants";
import { getThemeVars, getChartTooltipStyle } from "../../utils/themeUtils";

const COLORS = [
	"#7F77DD",
	"#1D9E75",
	"#378ADD",
	"#EF9F27",
	"#D85A30",
	"#D4537E",
	"#8B8B8B",
];

export function LanguagePieChart({ countries }) {
	const data = getTopLanguages(countries, 6).map((item) => ({
		...item,
		name: getLanguageNameES(item.name),
	}));

	const themeVars = getThemeVars();
	const tooltipStyle = getChartTooltipStyle(themeVars);

	return (
		<Panel
			title="Idiomas principales"
			subtitle="Países que hablan cada idioma"
			style={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<ResponsiveContainer width="100%" height={260}>
				<PieChart>
					<Pie
						data={data}
						dataKey="count"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={55}
						outerRadius={85}
						paddingAngle={3}
					>
						{data.map((_, i) => (
							<Cell key={i} fill={COLORS[i % COLORS.length]} />
						))}
					</Pie>
					<Tooltip
						formatter={(v, n) => [`${v} países`, n]}
						contentStyle={tooltipStyle}
					/>
					<Legend
						iconType="circle"
						iconSize={8}
						wrapperStyle={{ fontSize: FONT_SIZE.SMALL, color: themeVars.text3 }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</Panel>
	);
}
