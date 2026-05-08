import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { SPACING } from "../../utils/styleConstants";

const RegionBarChart = lazy(() =>
	import("../charts/RegionBarChart").then((module) => ({
		default: module.RegionBarChart,
	})),
);
const LanguagePieChart = lazy(() =>
	import("../charts/LanguagePieChart").then((module) => ({
		default: module.LanguagePieChart,
	})),
);

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function AnalyticsSection({ countries }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					alignItems: "stretch",
					gap: SPACING.LG,
				}}
			>
				<motion.div variants={itemVariants} style={{ height: "100%" }}>
					<Suspense
						fallback={
							<div style={{ padding: "20px" }}>Cargando gráfico...</div>
						}
					>
						<RegionBarChart countries={countries} />
					</Suspense>
				</motion.div>

				<motion.div variants={itemVariants} style={{ height: "100%" }}>
					<Suspense
						fallback={
							<div style={{ padding: "20px" }}>Cargando gráfico...</div>
						}
					>
						<LanguagePieChart countries={countries} />
					</Suspense>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
