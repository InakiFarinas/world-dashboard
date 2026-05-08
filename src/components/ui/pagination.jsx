import React from "react";
import Button from "./button";
import { PAGINATION_BUTTON_STYLE, SPACING } from "../../utils/styleConstants";

export function Pagination({ page, totalPages, onPrev, onNext }) {
	return (
		<div style={{ display: "flex", gap: SPACING.SM }}>
			<Button
				disabled={page === 1}
				onClick={onPrev}
				style={PAGINATION_BUTTON_STYLE}
			>
				← Ant
			</Button>

			<Button
				disabled={page === totalPages}
				onClick={onNext}
				style={PAGINATION_BUTTON_STYLE}
			>
				Sig →
			</Button>
		</div>
	);
}

export default Pagination;
