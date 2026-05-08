/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { BORDER_RADIUS, SPACING, FONT_SIZE } from "../utils/styleConstants";

const MotionDiv = motion.div;

export const statContainerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

export function StatCard({ label, value, sub, loading, accent }) {
	return (
		<MotionDiv
			variants={cardVariants}
			whileHover={{ y: -2 }}
			style={{
				background: "var(--surface)",
				border: "0.5px solid var(--border)",
				borderRadius: BORDER_RADIUS.LARGE,
				padding: `${SPACING.MD}px ${SPACING.LG}px`,
				cursor: "default",
			}}
		>
			<div
				style={{
					width: 24,
					height: 24,
					borderRadius: BORDER_RADIUS.BASE,
					marginBottom: SPACING.SM,
					background: "var(--accent-bg)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 12,
				}}
			>
				{accent}
			</div>

			<p
				style={{
					fontSize: FONT_SIZE.SMALLEST,
					fontWeight: 500,
					letterSpacing: "0.06em",
					textTransform: "uppercase",
					color: "var(--text-3)",
					marginBottom: SPACING.XS,
				}}
			>
				{label}
			</p>

			{loading ? (
				<div
					style={{
						height: 22,
						width: 80,
						borderRadius: BORDER_RADIUS.SMALL,
						background: "var(--surface-2)",
						animation: "pulse 1.2s infinite",
					}}
				/>
			) : (
				<p
					style={{
						fontSize: 22,
						fontWeight: 600,
						letterSpacing: "-0.5px",
						color: "var(--text-1)",
						lineHeight: 1,
					}}
				>
					{value ?? "—"}
				</p>
			)}

			<p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 4 }}>
				{sub}
			</p>
		</MotionDiv>
	);
}
