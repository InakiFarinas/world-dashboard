import React from "react";
import { BORDER_RADIUS, SPACING, FONT_SIZE } from "../../utils/styleConstants";

export function Panel({ title, subtitle, children, style, className }) {
	return (
		<div
			className={className}
			style={{
				background: "var(--surface)",
				border: "0.5px solid var(--border)",
				borderRadius: BORDER_RADIUS.LARGE,
				padding: `${SPACING.LG - 2}px ${SPACING.XL}px`,
				...style,
			}}
		>
			{title && (
				<p
					style={{
						fontSize: FONT_SIZE.TITLE,
						fontWeight: 500,
						color: "var(--text-1)",
						marginBottom: SPACING.XS,
					}}
				>
					{title}
				</p>
			)}

			{subtitle && (
				<p
					style={{
						fontSize: FONT_SIZE.SUBTITLE,
						color: "var(--text-3)",
						marginBottom: SPACING.MD,
					}}
				>
					{subtitle}
				</p>
			)}

			{children}
		</div>
	);
}

export default Panel;
