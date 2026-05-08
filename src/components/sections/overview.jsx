import React from "react";
import { motion } from "framer-motion";
import { StatCard, statContainerVariants } from "../statcard";
import { SPACING } from "../../utils/styleConstants";

export function OverviewSection({ stats, countries, loading }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				variants={statContainerVariants}
				initial="hidden"
				animate="visible"
				className="overview-stats-grid"
			>
				<StatCard
					label="Total países"
					value={stats.total}
					accent="🌍"
					loading={loading}
				/>
				<StatCard
					label="Población"
					value={
						!loading && stats.population
							? `${(stats.population / 1e9).toFixed(1)}B`
							: "—"
					}
					accent="👥"
					loading={loading}
				/>
				<StatCard
					label="Regiones"
					value={stats.regions}
					accent="📍"
					loading={loading}
				/>
				<StatCard
					label="Idiomas"
					value={stats.languages}
					accent="🗣️"
					loading={loading}
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.15, duration: 0.3 }}
				className="overview-panel"
			>
				<h3 className="overview-panel-title">Información general</h3>
				<div className="overview-info-grid">
					<div>
						<p className="overview-metric-label">Continentes</p>
						<p className="overview-metric-value">{stats.regions || "—"}</p>
					</div>
					<div>
						<p className="overview-metric-label">Idiomas únicos</p>
						<p className="overview-metric-value">{stats.languages || "—"}</p>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
