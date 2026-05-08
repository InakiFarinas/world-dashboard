import { useNavigate } from "react-router-dom";
import { useCountryFilter } from "../hooks/useCountryFilter";
import { Toolbar } from "./toolbar";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "./ui/panel";
import Pagination from "./ui/pagination";
import { SPACING, FONT_SIZE, BORDER_RADIUS } from "../utils/styleConstants";

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

const COL = "grid-template-columns: 2fr 1fr 1fr 1fr";

export function CountryTable({ countries }) {
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
				{/* Header */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr",
						gap: SPACING.MD,
						padding: `${SPACING.SM}px ${SPACING.MD + 6}px`,
						borderBottom: "0.5px solid var(--border)",
					}}
				>
					{["País", "Región", "Población", "Área km²"].map((h) => (
						<span
							key={h}
							style={{
								fontSize: FONT_SIZE.SMALLEST,
								fontWeight: 500,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
								color: "var(--text-3)",
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
							fontSize: 13,
							color: "var(--text-3)",
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
									onClick={() => navigate(`/country/${c.cca3}`)}
									style={{
										display: "grid",
										gridTemplateColumns: "2fr 1fr 1fr 1fr",
										gap: SPACING.MD,
										padding: `${SPACING.SM + 1}px ${SPACING.MD + 6}px`,
										alignItems: "center",
										borderBottom: "0.5px solid var(--border)",
										cursor: "pointer",
										transition: "background 0.1s",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: SPACING.MD + 2,
										}}
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
											fontSize: FONT_SIZE.SMALLEST,
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

									<span style={{ fontSize: 12, color: "var(--text-2)" }}>
										{(c.population || 0).toLocaleString()}
									</span>

									<span style={{ fontSize: 12, color: "var(--text-2)" }}>
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
							onPrev={() => setPage((p) => p - 1)}
							onNext={() => setPage((p) => p + 1)}
						/>
					</div>
				</div>
			</Panel>
		</div>
	);
}
