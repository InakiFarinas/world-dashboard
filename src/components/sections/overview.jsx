import React from "react";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { StatCard, statContainerVariants } from "../statcard";
import { fmt } from "../../utils/format";
import { SPACING } from "../../utils/styleConstants";

const RegionBarChart = lazy(() =>
	import("../charts/regionbarchart").then((module) => ({
		default: module.RegionBarChart,
	})),
);
const LanguagePieChart = lazy(() =>
	import("../charts/languagepiechart").then((module) => ({
		default: module.LanguagePieChart,
	})),
);

const MotionDiv = motion.div;

export function OverviewSection({ stats, countries, loading }) {
	const countryList = countries ?? [];
	const totalArea = countryList.reduce(
		(sum, country) => sum + (country.area || 0),
		0,
	);
	const averagePopulation = countryList.length
		? stats.population / countryList.length
		: 0;
	const averageArea = countryList.length ? totalArea / countryList.length : 0;
	const density = totalArea ? stats.population / totalArea : 0;
	const mostPopulousCountry = countryList.reduce((largest, country) => {
		if (!largest || (country.population || 0) > (largest.population || 0)) {
			return country;
		}

		return largest;
	}, null);
	const largestCountry = countryList.reduce((largest, country) => {
		if (!largest || (country.area || 0) > (largest.area || 0)) {
			return country;
		}

		return largest;
	}, null);

	return (
		<MotionDiv
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<MotionDiv
				variants={statContainerVariants}
				initial="hidden"
				animate="visible"
				className="overview-stats-grid"
			>
				<StatCard
					label="Total países"
					value={stats.total}
					accent="🌍"
					sub="cargados"
					loading={loading}
				/>
				<StatCard
					label="Población"
					value={!loading && stats.population ? fmt(stats.population) : "—"}
					accent="👥"
					sub="total acumulada"
					loading={loading}
				/>
				<StatCard
					label="Superficie"
					value={!loading && totalArea ? fmt(totalArea) : "—"}
					accent="🗺️"
					sub="km² totales"
					loading={loading}
				/>
				<StatCard
					label="Densidad media"
					value={!loading && density ? density.toFixed(1) : "—"}
					accent="📊"
					sub="hab/km²"
					loading={loading}
				/>
				<StatCard
					label="Más poblado"
					value={
						!loading && mostPopulousCountry
							? fmt(mostPopulousCountry.population)
							: "—"
					}
					accent="🏙️"
					sub={mostPopulousCountry?.name.common}
					loading={loading}
				/>
				<StatCard
					label="Más extenso"
					value={
						!loading && largestCountry ? fmt(largestCountry.area) : "—"
					}
					accent="🏔️"
					sub={largestCountry?.name.common}
					loading={loading}
				/>
			</MotionDiv>

			<MotionDiv
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.15, duration: 0.3 }}
				className="overview-panel"
			>
				<h3 className="overview-panel-title">Información general</h3>
				<MotionDiv
					variants={statContainerVariants}
					initial="hidden"
					animate="visible"
					className="overview-stats-grid"
				>
					<StatCard
						label="Regiones"
						value={stats.regions || "—"}
						accent="📍"
						sub="continentes"
						loading={loading}
					/>
					<StatCard
						label="Idiomas únicos"
						value={stats.languages || "—"}
						accent="🗣️"
						sub="en todo el mundo"
						loading={loading}
					/>
					<StatCard
						label="Población media"
						value={
							!loading && averagePopulation ? fmt(Math.round(averagePopulation)) : "—"
						}
						accent="👥"
						sub="por país"
						loading={loading}
					/>
					<StatCard
						label="Área media"
						value={
							!loading && averageArea ? `${fmt(Math.round(averageArea))} km²` : "—"
						}
						accent="🗺️"
						sub="por país"
						loading={loading}
					/>
				</MotionDiv>
			</MotionDiv>

			<MotionDiv
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.3 }}
				className="overview-panel"
				style={{ marginTop: SPACING.LG }}
			>
				<h3 className="overview-panel-title">Distribución global</h3>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: SPACING.LG,
					}}
				>
					<div style={{ minHeight: 320 }}>
						<Suspense fallback={<div style={{ padding: 20 }}>Cargando gráfico...</div>}>
							<RegionBarChart countries={countryList} />
						</Suspense>
					</div>
					<div style={{ minHeight: 320 }}>
						<Suspense fallback={<div style={{ padding: 20 }}>Cargando gráfico...</div>}>
							<LanguagePieChart countries={countryList} />
						</Suspense>
					</div>
				</div>
			</MotionDiv>
		</MotionDiv>
	);
}
