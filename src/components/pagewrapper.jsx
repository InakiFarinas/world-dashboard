import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -8 },
};

export function PageWrapper({ children }) {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="exit"
			transition={{ duration: 0.22, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
