import React from "react";
import { FONT_SIZE, SPACING, BORDER_RADIUS } from "../utils/styleConstants";

const SECTIONS = [
	{ id: "overview", label: "📊 Resumen", icon: "📊" },
	{ id: "table", label: "📋 Países", icon: "📋" },
	{ id: "maps", label: "🗺️ Mapa", icon: "🗺️" },
];

export function Navigation({ active, onChange }) {
	return (
		<div
			style={{
				display: "flex",
				gap: SPACING.SM,
				borderBottom: "0.5px solid var(--border)",
				padding: `0 ${SPACING.XL}px`,
				marginBottom: SPACING.MD,
				overflowX: "auto",
			}}
		>
			{SECTIONS.map((section) => (
				<button
					key={section.id}
					onClick={() => onChange(section.id)}
					style={{
						padding: `${SPACING.MD}px ${SPACING.MD + 4}px`,
						fontSize: FONT_SIZE.LABEL,
						fontWeight: 500,
						fontFamily: "inherit",
						background: "transparent",
						border: "none",
						cursor: "pointer",
						transition: "all 0.2s",
						color: active === section.id ? "var(--text-1)" : "var(--text-3)",
						borderBottom:
							active === section.id
								? "2px solid var(--text-1)"
								: "2px solid transparent",
						marginBottom: "-0.5px",
					}}
					onMouseEnter={(e) => {
						if (active !== section.id) e.target.style.color = "var(--text-2)";
					}}
					onMouseLeave={(e) => {
						if (active !== section.id) e.target.style.color = "var(--text-3)";
					}}
				>
					{section.label}
				</button>
			))}
		</div>
	);
}
