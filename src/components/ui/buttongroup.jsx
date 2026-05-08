import {
	BUTTON_PRIMARY,
	BUTTON_SECONDARY,
	BORDER_RADIUS,
} from "../../utils/styleConstants";

export function PrimaryButton({ children, onClick, style = {} }) {
	return (
		<button
			onClick={onClick}
			style={{
				...BUTTON_PRIMARY,
				...style,
			}}
			onMouseOver={(e) => {
				e.target.style.backgroundColor = BUTTON_PRIMARY.hoverBg;
			}}
			onMouseOut={(e) => {
				e.target.style.backgroundColor = BUTTON_PRIMARY.backgroundColor;
			}}
		>
			{children}
		</button>
	);
}

export function SecondaryButton({ children, onClick, style = {} }) {
	return (
		<button
			onClick={onClick}
			style={{
				...BUTTON_SECONDARY,
				...style,
			}}
			onMouseOver={(e) => {
				e.target.style.backgroundColor = BUTTON_SECONDARY.hoverBg;
			}}
			onMouseOut={(e) => {
				e.target.style.backgroundColor = BUTTON_SECONDARY.backgroundColor;
			}}
		>
			{children}
		</button>
	);
}
