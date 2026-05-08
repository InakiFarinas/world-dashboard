import { useState, useEffect } from "react";

export function useTheme() {
	const [theme, setTheme] = useState(() => {
		// 1. Preferencia guardada por el usuario (si existe y es valida)
		try {
			const saved = window.localStorage.getItem("theme");
			if (saved === "dark" || saved === "light") return saved;
		} catch {
			// Ignora errores de acceso a storage (modo privado/restricciones)
		}

		// 2. Preferencia del sistema operativo (si matchMedia esta disponible)
		if (
			typeof window !== "undefined" &&
			typeof window.matchMedia === "function"
		) {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}

		// 3. Fallback seguro
		return "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");

		try {
			window.localStorage.setItem("theme", theme);
		} catch {
			// Ignora errores de escritura en storage
		}
	}, [theme]);

	const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	return { theme, toggle };
}
