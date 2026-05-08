import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { getTopLanguages } from "../../utils/chartutils";
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

function LanguageTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;

	const entry = payload[0].payload;
	const isOtherGroup = entry.name === "Otros";

	return (
		<div
			style={{
				background: "var(--surface)",
				border: "1px solid var(--border)",
				borderRadius: 10,
				padding: 10,
				maxWidth: 260,
				boxShadow: "0 8px 24px rgba(0,0,0,.12)",
			}}
		>
			<div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
				{entry.name}
			</div>
			<div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 8 }}>
				{entry.count} países
			</div>
			{isOtherGroup && Array.isArray(entry.languages) ? (
				<div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.4 }}>
					<div style={{ fontWeight: 600, marginBottom: 4 }}>Incluye:</div>
					<div>{entry.languages.slice(0, 6).join(", ")}...</div>
					<div
						style={{
							marginTop: 4,
							color: "var(--text-3)",
							fontStyle: "italic",
						}}
					>
						y {entry.languages.length - 6} idiomas más
					</div>
				</div>
			) : null}
		</div>
	);
}

export function LanguagePieChart({ countries }) {
	const data = getTopLanguages(countries, 5).map((item) => ({
		...item,
		name: getLanguageNameES(item.name),
		languages: item.languages?.map((language) => getLanguageNameES(language)),
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
					<Tooltip content={<LanguageTooltip />} contentStyle={tooltipStyle} />
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
