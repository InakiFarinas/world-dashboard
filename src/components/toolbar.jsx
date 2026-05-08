import Button from "./ui/button";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../utils/styleConstants";

const REGIONS = [
	"Africa",
	"Americas",
	"Asia",
	"Europe",
	"Oceania",
	"Antarctic",
];

const inputStyle = {
	padding: "7px 12px",
	fontSize: FONT_SIZE.TITLE,
	fontFamily: "inherit",
	borderRadius: BORDER_RADIUS.BASE,
	border: "0.5px solid var(--border)",
	background: "var(--surface)",
	color: "var(--text-1)",
	outline: "none",
	transition: "border-color 0.15s",
};

export function Toolbar({ query, region, sort, onQuery, onRegion, onSort }) {
	return (
		<div
			style={{
				display: "flex",
				gap: SPACING.MD,
				flexWrap: "wrap",
				marginBottom: SPACING.MD,
			}}
		>
			<input
				type="text"
				placeholder="Buscar país o capital..."
				value={query}
				onChange={(e) => onQuery(e.target.value)}
				style={{ ...inputStyle, flex: 1, minWidth: 200 }}
				onFocus={(e) => (e.target.style.borderColor = "var(--border-2)")}
				onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
			/>

			<select
				value={region}
				onChange={(e) => onRegion(e.target.value)}
				style={{ ...inputStyle, cursor: "pointer" }}
			>
				<option value="">Todas las regiones</option>
				{REGIONS.map((r) => (
					<option key={r} value={r}>
						{r}
					</option>
				))}
			</select>

			{[
				{ key: "population", label: "Población" },
				{ key: "area", label: "Área" },
				{ key: "name", label: "Nombre" },
			].map(({ key, label }) => {
				const active = sort.key === key;
				return (
					<Button key={key} onClick={() => onSort(key)} active={active}>
						{label} {sort.key === key ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
					</Button>
				);
			})}
		</div>
	);
}
