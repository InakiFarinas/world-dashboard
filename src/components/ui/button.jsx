import React from "react";
import { BORDER_RADIUS, FONT_SIZE } from "../../utils/styleConstants";

export function Button({
	children,
	onClick,
	active = false,
	disabled = false,
	style = {},
	className,
	type = "button",
}) {
	const base = {
		padding: "7px 12px",
		fontSize: FONT_SIZE.LABEL,
		fontWeight: 500,
		fontFamily: "inherit",
		borderRadius: BORDER_RADIUS.BASE,
		cursor: disabled ? "default" : "pointer",
		transition: "all 0.15s",
		border: active ? "0.5px solid var(--text-1)" : "0.5px solid var(--border)",
		background: active ? "var(--text-1)" : "var(--surface)",
		color: active ? "var(--bg)" : "var(--text-2)",
		opacity: disabled ? 0.4 : 1,
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={className}
			style={{ ...base, ...style }}
		>
			{children}
		</button>
	);
}

export default Button;
