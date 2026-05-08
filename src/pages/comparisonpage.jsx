import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ComparisonView } from "../components/comparisonview";
import { PageWrapper } from "../components/pagewrapper";
import { Layout } from "../components/layout";
import { SPACING } from "../utils/styleConstants";

const MotionDiv = motion.div;

export function ComparisonPage() {
	const [selectedCountries, setSelectedCountries] = useState([]);

	const handleClearComparison = () => {
		setSelectedCountries([]);
	};

	return (
		<Layout>
			<Helmet>
				<title>Comparar Países — World Stats Dashboard</title>
				<meta
					name="description"
					content="Compara países lado a lado con métricas detalladas y gráficos visuales"
				/>
				<meta
					property="og:title"
					content="Comparar Países — World Stats Dashboard"
				/>
				<meta
					property="og:description"
					content="Compara países lado a lado con métricas detalladas y gráficos visuales"
				/>
			</Helmet>

			<PageWrapper>
				<MotionDiv
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div style={{ marginBottom: SPACING.LG }}>
						<h1
							style={{
								fontSize: 32,
								fontWeight: 700,
								marginBottom: SPACING.SM,
							}}
						>
							📊 Comparador de Países
						</h1>
						<p style={{ color: "var(--text-2)" }}>
							Selecciona dos países desde la tabla para verlos lado a lado
						</p>
					</div>
				</MotionDiv>

				<AnimatePresence>
					{selectedCountries.length === 2 && (
						<ComparisonView
							country1={selectedCountries[0]}
							country2={selectedCountries[1]}
							onClear={handleClearComparison}
						/>
					)}
				</AnimatePresence>

				{selectedCountries.length === 0 && (
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{
							padding: SPACING.LG,
							textAlign: "center",
							color: "var(--text-3)",
						}}
					>
						<p style={{ fontSize: 16 }}>
							← Selecciona dos países de la tabla para comenzar
						</p>
					</MotionDiv>
				)}
			</PageWrapper>
		</Layout>
	);
}
