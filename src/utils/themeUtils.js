// Utilidad para acceder a variables CSS del tema

export function getThemeVars() {
	if (typeof document === "undefined") {
		return {
			border: "#e0e0e0",
			text1: "#000000",
			text3: "#999999",
			surface: "#ffffff",
		};
	}

	const styles = getComputedStyle(document.documentElement);
	return {
		border: styles.getPropertyValue("--border").trim(),
		text1: styles.getPropertyValue("--text-1").trim(),
		text3: styles.getPropertyValue("--text-3").trim(),
		surface: styles.getPropertyValue("--surface").trim(),
		background: styles.getPropertyValue("--background").trim(),
	};
}

export function getChartTooltipStyle(themeVars) {
	return {
		fontSize: 12,
		borderRadius: 8,
		background: `var(--surface)`,
		border: `0.5px solid ${themeVars.border}`,
		color: `var(--text-1)`,
		boxShadow: "none",
	};
}
