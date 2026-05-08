import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const WorldMap = lazy(() =>
	import("../WorldMap").then((module) => ({
		default: module.WorldMap,
	})),
);

export function MapsSection({ countries }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<Suspense
				fallback={<div style={{ padding: "20px" }}>Cargando mapa...</div>}
			>
				<WorldMap countries={countries} />
			</Suspense>
		</motion.div>
	);
}
