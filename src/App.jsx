import { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useCountries } from "./hooks/useCountries";
import { Layout } from "./components/layout";
import { useTheme } from "./hooks/useTheme";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "./components/pagewrapper";
import { Navigation } from "./components/navigation";
import { OverviewSection } from "./components/sections/overview";
import { TableSection } from "./components/sections/table";
import { MapsSection } from "./components/sections/maps";
import { AnalyticsSection } from "./components/sections/analytics";

const CountryPage = lazy(() =>
	import("./pages/countrypage").then((module) => ({
		default: module.CountryPage,
	})),
);

export default function App() {
	const [activeSection, setActiveSection] = useState("overview");
	const location = useLocation();
	const { theme, toggle } = useTheme();
	const { data: countries, isLoading, error } = useCountries();

	const stats = countries
		? {
				total: countries.length,
				population: countries.reduce((s, c) => s + (c.population || 0), 0),
				regions: [...new Set(countries.map((c) => c.region).filter(Boolean))]
					.length,
				languages: [
					...new Set(
						countries.flatMap((c) => Object.values(c.languages || {})),
					),
				].length,
			}
		: null;

	const renderSection = () => {
		if (isLoading || !countries) {
			return (
				<div
					style={{
						padding: "40px 20px",
						textAlign: "center",
						color: "var(--text-3)",
					}}
				>
					Cargando datos...
				</div>
			);
		}

		switch (activeSection) {
			case "overview":
				return (
					<OverviewSection
						stats={stats}
						countries={countries}
						loading={isLoading}
					/>
				);
			case "table":
				return <TableSection countries={countries} />;
			case "maps":
				return <MapsSection countries={countries} />;
			case "analytics":
				return <AnalyticsSection countries={countries} />;
			default:
				return (
					<OverviewSection
						stats={stats}
						countries={countries}
						loading={isLoading}
					/>
				);
		}
	};

	const Dashboard = (
		<Layout theme={theme} onToggle={toggle}>
			<Navigation active={activeSection} onChange={setActiveSection} />
			{renderSection()}
		</Layout>
	);

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<PageWrapper>{Dashboard}</PageWrapper>} />
				<Route
					path="/country/:cca3"
					element={
						<PageWrapper>
							<Suspense
								fallback={
									<div style={{ padding: 24, color: "var(--text-3)" }}>
										Cargando país...
									</div>
								}
							>
								<CountryPage
									countries={countries ?? []}
									theme={theme}
									onToggle={toggle}
								/>
							</Suspense>
						</PageWrapper>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
}
