"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  height?: number;
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

const DEFAULT_COLORS = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "var(--color-info)",
  "#8b5cf6",
];

export function PieChart({
  data,
  height = 300,
  colors = DEFAULT_COLORS,
  valueFormatter = (v) => v.toLocaleString("fa-IR"),
}: PieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-sm text-text-tertiary">داده‌ای موجود نیست</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--color-text-primary)",
          }}
          formatter={(value) => [valueFormatter(Number(value)), ""]}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "var(--color-text-secondary)" }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
