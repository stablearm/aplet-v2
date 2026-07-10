"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartData {
  name: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  height?: number;
  color?: string;
  valueFormatter?: (value: number) => string;
}

export function LineChart({
  data,
  height = 300,
  color = "var(--color-primary)",
  valueFormatter = (v) => v.toLocaleString("fa-IR"),
}: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-sm text-text-tertiary">داده‌ای موجود نیست</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => valueFormatter(v)}
        />
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
