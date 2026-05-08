import { motion } from "framer-motion";
import {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend,
        ResponsiveContainer,
} from "recharts";
import Panel from "./ui/panel";
import { SPACING, FONT_SIZE, BORDER_RADIUS } from "../utils/styleConstants";
import { fmt } from "../utils/format";

export const ComparisonView = ({ country1, country2, onClear }) => {
        const data = [
                {
                        metric: "Población",
                        [country1.name.common]: country1.population || 0,
                        [country2.name.common]: country2.population || 0,
                },
                {
                        metric: "Área (km²)",
                        [country1.name.common]: country1.area || 0,
                        [country2.name.common]: country2.area || 0,
                },
        ];

        // Colores para los gráficos
        const colors = {
                [country1.name.common]: "#3B82F6",
                [country2.name.common]: "#EF4444",
        };

        const color1 = colors[country1.name.common];
        const color2 = colors[country2.name.common];

        return (
                <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                >
                        <Panel>
                                <div
                                        style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: SPACING.LG,
                                        }}
                                >
                                        <h2
                                                style={{
                                                        fontSize: FONT_SIZE.LG,
                                                        fontWeight: 600,
                                                        margin: 0,
                                                }}
                                        >
                                                Comparación Detallada
                                        </h2>
                                        <button
                                                onClick={onClear}
                                                style={{
                                                        padding: `${SPACING.XS} ${SPACING.SM}`,
                                                        borderRadius: BORDER_RADIUS.SM,
                                                        border: "1px solid var(--border)",
                                                        background: "var(--background-2)",
                                                        cursor: "pointer",
                                                        fontSize: FONT_SIZE.SM,
                                                }}
                                        >
                                                Limpiar Comparativa
                                        </button>
                                </div>

                                <div style={{ height: 400, width: "100%" }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={data}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                        <XAxis dataKey="metric" />
                                                        <YAxis tickFormatter={(val) => fmt.numberShort(val)} />
                                                        <Tooltip 
                                                                formatter={(val) => fmt.number(val)}
                                                                contentStyle={{
                                                                        borderRadius: BORDER_RADIUS.MD,
                                                                        border: "1px solid var(--border)",
                                                                        backgroundColor: "var(--background-1)",
                                                                }}
                                                        />
                                                        <Legend />
                                                        <Bar dataKey={country1.name.common} fill={color1} radius={[4, 4, 0, 0]} />
                                                        <Bar dataKey={country2.name.common} fill={color2} radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                        </ResponsiveContainer>
                                </div>
                        </Panel>
                </motion.div>
        );
};
