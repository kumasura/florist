"use client";

import * as d3 from "d3";
import { useMemo, useState } from "react";
import { sampleData, type DataPoint } from "@/lib/sampleData";

type ChartType = "bar" | "line" | "radial";

const chartOptions: Array<{ value: ChartType; label: string }> = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "radial", label: "Radial" },
];

const width = 760;
const height = 430;
const margin = { top: 28, right: 32, bottom: 58, left: 64 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export function VisualizationStudio() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [amplify, setAmplify] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<DataPoint["group"] | "All">("All");
  const [activePoint, setActivePoint] = useState<DataPoint | null>(null);

  const data = useMemo(() => {
    return sampleData
      .filter((item) => selectedGroup === "All" || item.group === selectedGroup)
      .map((item) => ({ ...item, value: Math.round(item.value * amplify) }));
  }, [amplify, selectedGroup]);

  const maxValue = d3.max(data, (item) => item.value) ?? 1;
  const xScale = d3.scaleBand(data.map((item) => item.label), [0, innerWidth]).padding(0.28);
  const yScale = d3.scaleLinear([0, maxValue * 1.1], [innerHeight, 0]).nice();
  const colorScale = d3
    .scaleOrdinal<DataPoint["group"], string>()
    .domain(["Growth", "Reach", "Retention"])
    .range(["#7c3aed", "#06b6d4", "#22c55e"]);

  const linePath = d3
    .line<DataPoint>()
    .x((item) => (xScale(item.label) ?? 0) + xScale.bandwidth() / 2)
    .y((item) => yScale(item.value))
    .curve(d3.curveCatmullRom.alpha(0.5))(data);

  return (
    <section className="studio" aria-label="Interactive visualization generator">
      <div className="control-panel">
        <div>
          <p className="eyebrow">Open source visualization lab</p>
          <h2>Generate D3 charts from live controls</h2>
          <p>
            Switch chart modes, filter dimensions, and reshape the dataset to prototype animated
            dashboards without leaving the browser.
          </p>
        </div>

        <label>
          Chart type
          <select value={chartType} onChange={(event) => setChartType(event.target.value as ChartType)}>
            {chartOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Segment
          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value as DataPoint["group"] | "All")}
          >
            <option value="All">All</option>
            <option value="Growth">Growth</option>
            <option value="Reach">Reach</option>
            <option value="Retention">Retention</option>
          </select>
        </label>

        <label>
          Intensity: {amplify.toFixed(1)}x
          <input
            min="0.5"
            max="1.8"
            step="0.1"
            type="range"
            value={amplify}
            onChange={(event) => setAmplify(Number(event.target.value))}
          />
        </label>

        <div className="insight-card">
          <span>{activePoint ? activePoint.label : "Hover a mark"}</span>
          <strong>{activePoint ? activePoint.value : d3.sum(data, (item) => item.value)}</strong>
          <small>{activePoint ? activePoint.group : "total generated value"}</small>
        </div>
      </div>

      <div className="chart-card">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${chartType} chart preview`}>
          <defs>
            <linearGradient id="gridFade" x1="0" x2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {yScale.ticks(5).map((tick) => (
              <g key={tick} transform={`translate(0,${yScale(tick)})`}>
                <line x2={innerWidth} stroke="url(#gridFade)" strokeDasharray="6 8" />
                <text x={-16} y={4} textAnchor="end" className="axis-label">
                  {tick}
                </text>
              </g>
            ))}

            {chartType === "line" && linePath ? (
              <path d={linePath} fill="none" stroke="#f97316" strokeLinecap="round" strokeWidth="5" />
            ) : null}

            {data.map((item, index) => {
              const x = xScale(item.label) ?? 0;
              const y = yScale(item.value);
              const isRadial = chartType === "radial";
              const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
              const radius = d3.scaleLinear([0, maxValue], [42, 154])(item.value);
              const cx = isRadial ? innerWidth / 2 + Math.cos(angle) * radius : x + xScale.bandwidth() / 2;
              const cy = isRadial ? innerHeight / 2 + Math.sin(angle) * radius : y;

              if (chartType === "bar") {
                return (
                  <rect
                    key={item.label}
                    className="mark"
                    x={x}
                    y={y}
                    width={xScale.bandwidth()}
                    height={innerHeight - y}
                    rx="14"
                    fill={colorScale(item.group)}
                    onMouseEnter={() => setActivePoint(item)}
                    onMouseLeave={() => setActivePoint(null)}
                  />
                );
              }

              return (
                <g key={item.label}>
                  {isRadial ? (
                    <line
                      x1={innerWidth / 2}
                      y1={innerHeight / 2}
                      x2={cx}
                      y2={cy}
                      stroke={colorScale(item.group)}
                      strokeOpacity="0.35"
                      strokeWidth="3"
                    />
                  ) : null}
                  <circle
                    className="mark"
                    cx={cx}
                    cy={cy}
                    r={isRadial ? 12 : 9}
                    fill={colorScale(item.group)}
                    onMouseEnter={() => setActivePoint(item)}
                    onMouseLeave={() => setActivePoint(null)}
                  />
                </g>
              );
            })}

            {data.map((item) => (
              <text
                key={`${item.label}-label`}
                x={(xScale(item.label) ?? 0) + xScale.bandwidth() / 2}
                y={innerHeight + 34}
                textAnchor="middle"
                className="axis-label"
              >
                {item.label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}
