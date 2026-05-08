import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const CountryTable = lazy(() =>
	import("../countrytable").then((module) => ({
		default: module.CountryTable,
	})),
);

export function TableSection({ countries }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Suspense
				fallback={<div style={{ padding: "20px" }}>Cargando tabla...</div>}
			>
				<CountryTable countries={countries} />
			</Suspense>
		</motion.div>
	);
}
