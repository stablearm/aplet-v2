"use client";

import { useId } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaChartData {
  name: string;
  value: number;
}

interface AreaChartProps {
  data: AreaChartData[];
  height?: number;
  color?: string;
  valueFormatter?: (value: number) => string;
}

export function AreaChart({
  data,
  height = 300,
  color = "var(--color-primary)",
  valueFormatter = (v) => v.toLocaleString("fa-IR"),
}: AreaChartProps) {
  const gradientId = useId();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-sm text-text-tertiary">داده‌ای موجود نیست</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
