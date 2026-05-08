import { useNavigate } from "react-router-dom";
import { useCountryFilter } from "../hooks/useCountryFilter";
import { useCountryComparison } from "../hooks/useCountryComparison";
import { ComparisonView } from "./comparisonview";
import { Toolbar } from "./toolbar";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "./ui/panel";
import Pagination from "./ui/pagination";
import { PrimaryButton, SecondaryButton } from "./ui/buttongroup";
import {
	SPACING,
	FONT_SIZE,
	BORDER_RADIUS,
	TEXT_STYLES,
} from "../utils/styleConstants";

const rowVariants = {
	hidden: { opacity: 0, x: -8 },
	visible: (i) => ({
		opacity: 1,
		x: 0,
		transition: { delay: i * 0.04, duration: 0.2, ease: "easeOut" },
	}),
	exit: { opacity: 0, x: 8 },
};

const REGION_COLORS = {
	Africa: { bg: "#FAEEDA", color: "#633806" },
	Americas: { bg: "#E6F1FB", color: "#0C447C" },
	Asia: { bg: "#FCEBEB", color: "#791F1F" },
	Europe: { bg: "#EEEDFE", color: "#3C3489" },
	Oceania: { bg: "#E1F5EE", color: "#085041" },
};

const GRID_COLUMNS = "40px 2fr 1fr 1fr 1fr";
const TABLE_HEADERS = ["País", "Región", "Población", "Área km²"];

export function CountryTable({ countries, onCompare }) {
	const navigate = useNavigate();

	const {
		query,

		region,

		sort,

		page,

		totalPages,

		paginated,

		totalFiltered,

		handleQueryChange,

		handleRegionChange,

		toggleSort,

		setPage,
	} = useCountryFilter(countries);

	const {
		selectedCountries,

		toggleCountry,

		isSelected,

		clearSelection,

		canCompare,
	} = useCountryComparison();

	return (
		<div>
			<Toolbar
				query={query}
				region={region}
				sort={sort}
				onQuery={handleQueryChange}
				onRegion={handleRegionChange}
				onSort={toggleSort}
			/>

			<Panel style={{ overflow: "hidden" }}>
				{/* Botón de comparación */}
				{canCompare && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						style={{
							padding: `${SPACING.MD}px ${SPACING.MD + 6}px`,
							backgroundColor: "var(--bg-2)",
							borderBottom: "1px solid var(--border)",
							display: "flex",
							gap: SPACING.MD,
							alignItems: "center",
						}}
					>
						<p
							style={{
								fontSize: FONT_SIZE.LABEL,
								color: "var(--text-2)",
								flex: 1,
							}}
						>
							✓ {selectedCountries.length} país
							{selectedCountries.length > 1 ? "es" : ""} seleccionado
							{selectedCountries.length > 1 ? "s" : ""}
						</p>
						<PrimaryButton
							onClick={() => {
								onCompare(selectedCountries);
								clearSelection();
							}}
						>
							📊 Comparar
						</PrimaryButton>
						<SecondaryButton onClick={clearSelection}>✕</SecondaryButton>
					</motion.div>
				)}

				{/* Header */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: GRID_COLUMNS,
						gap: SPACING.MD,
						padding: `${SPACING.SM}px ${SPACING.MD + 6}px`,
						borderBottom: "0.5px solid var(--border)",
					}}
				>
					<div />
					{TABLE_HEADERS.map((h) => (
						<span
							key={h}
							style={{
								...TEXT_STYLES.tertiary,
								fontWeight: 500,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
							}}
						>
							{h}
						</span>
					))}
				</div>

				{/* Filas */}

				{paginated.length === 0 ? (
					<p
						style={{
							padding: "2.5rem",

							textAlign: "center",

							...TEXT_STYLES.tertiary,
						}}
					>
						Sin resultados para {query}
					</p>
				) : (
					<AnimatePresence mode="popLayout">
						{paginated.map((c, i) => {
							const rp = REGION_COLORS[c.region] ?? {
								bg: "#F4F4F5",

								color: "#71717A",
							};

							return (
								<motion.div
									key={c.cca3}
									custom={i}
									variants={rowVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									style={{
										display: "grid",

										gridTemplateColumns: GRID_COLUMNS,

										gap: SPACING.MD,

										padding: `${SPACING.SM + 1}px ${SPACING.MD + 6}px`,

										alignItems: "center",

										borderBottom: "0.5px solid var(--border)",

										transition: "background 0.1s",
									}}
								>
									{/* Checkbox */}
									<input
										type="checkbox"
										checked={isSelected(c)}
										onChange={(e) => {
											e.stopPropagation();
											toggleCountry(c);
										}}
										style={{
											width: 18,
											height: 18,
											cursor: "pointer",
										}}
									/>

									{/* País */}
									<div
										style={{
											display: "flex",

											alignItems: "center",

											gap: SPACING.MD + 2,

											cursor: "pointer",
										}}
										onClick={() => navigate(`/country/${c.cca3}`)}
									>
										<img
											src={c.flags.svg}
											alt={c.name.common}
											style={{
												width: 28,

												height: 19,

												objectFit: "cover",

												borderRadius: BORDER_RADIUS.XS,

												flexShrink: 0,
											}}
										/>
										<div>
											<p
												style={{
													fontSize: FONT_SIZE.TITLE,

													fontWeight: 500,

													color: "var(--text-1)",
												}}
											>
												{c.name.common}
											</p>

											<p
												style={{
													fontSize: FONT_SIZE.SUBTITLE,

													color: "var(--text-3)",

													marginTop: 1,
												}}
											>
												{c.capital?.[0] ?? "—"}
											</p>
										</div>
									</div>

									<span
										style={{
											fontSize: FONT_SIZE.LABEL,

											fontWeight: 500,

											padding: `${SPACING.XS}px ${SPACING.MD}px`,

											borderRadius: BORDER_RADIUS.PILL,

											width: "fit-content",

											background: rp.bg,

											color: rp.color,
										}}
									>
										{c.region}
									</span>

									<span
										style={{
											fontSize: FONT_SIZE.LABEL,
											color: "var(--text-2)",
										}}
									>
										{(c.population || 0).toLocaleString()}
									</span>

									<span
										style={{
											fontSize: FONT_SIZE.LABEL,
											color: "var(--text-2)",
										}}
									>
										{c.area ? c.area.toLocaleString() : "—"}
									</span>
								</motion.div>
							);
						})}
					</AnimatePresence>
				)}

				{/* Paginación */}

				<div
					style={{
						display: "flex",

						alignItems: "center",

						justifyContent: "space-between",

						padding: "10px 14px",

						borderTop: "0.5px solid var(--border)",
					}}
				>
					<span style={{ fontSize: 11, color: "var(--text-3)" }}>
						{totalFiltered} países · pág. {page} de {totalPages}
					</span>

					<div style={{ display: "flex", gap: 6 }}>
						<Pagination
							page={page}
							totalPages={totalPages}
							onPrev={() => setPage(page - 1)}
							onNext={() => setPage(page + 1)}
						/>
					</div>
				</div>
			</Panel>

			{/* ComparisonView */}

			{canCompare && selectedCountries.length === 2 && (
				<div style={{ marginTop: SPACING.LG }}>
					<ComparisonView
						country1={selectedCountries[0]}
						country2={selectedCountries[1]}
						onClear={clearSelection}
					/>
				</div>
			)}
		</div>
	);
}
