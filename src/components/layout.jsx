import { Link } from "react-router-dom";

export function Layout({ children, theme, onToggle }) {
	return (
		<div className="min-h-screen" style={{ background: "var(--bg)" }}>
			<header
				style={{
					background: "var(--surface)",
					borderBottom: "0.5px solid var(--border)",
				}}
			>
				<div
					className="max-w-7xl mx-auto px-6 py-4
          flex items-center justify-between"
				>
					<div>
						<Link
							to="/"
							className="text-[15px] font-semibold tracking-tight inline-block"
							style={{ color: "var(--text-1)" }}
						>
							Panel de países
						</Link>
						<p
							className="text-[11px] mt-0.5"
							style={{ color: "var(--text-3)" }}
						>
							Datos de restcountries.com
						</p>
					</div>

					<button
						onClick={onToggle}
						className="flex items-center gap-2 px-3 py-1.5
              rounded-full text-xs font-medium transition-all cursor-pointer"
						style={{
							background: "var(--surface-2)",
							border: "0.5px solid var(--border)",
							color: "var(--text-2)",
						}}
					>
						{theme === "dark" ? "☀ Claro" : "☾ Oscuro"}
					</button>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-4">{children}</main>
		</div>
	);
}
