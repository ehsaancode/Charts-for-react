import React, { useState } from "react";

export default function PieChart({
  data = [
    { label: "Sales", value: 35 },
    { label: "Marketing", value: 20 },
    { label: "Support", value: 25 },
    // { label: "Test", value: 10 },

  ],
  width = 400,
  height = 400,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getColor = (value) => {
    if (maxValue === minValue) return "hsl(210, 100%, 75%)";
    const intensity = (value - minValue) / (maxValue - minValue);
    const lightness = 85 - intensity * 25;
    return `hsl(210, 100%, ${lightness}%)`;
  };

  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return <div className="text-red-500">No data</div>;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 * 0.75;

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulative;
    const endAngle = cumulative + angle;
    const midAngle = (startAngle + endAngle) / 2;
    cumulative += angle;
    const percent = ((d.value / total) * 100).toFixed(1);
    const color = getColor(d.value);
    return { ...d, startAngle, endAngle, midAngle, angle, percent, color };
  });

  const getPath = (start, end, r = radius) => {
    const sa = (start - 90) * (Math.PI / 180);
    const ea = (end - 90) * (Math.PI / 180);
    const x1 = centerX + r * Math.cos(sa);
    const y1 = centerY + r * Math.sin(sa);
    const x2 = centerX + r * Math.cos(ea);
    const y2 = centerY + r * Math.sin(ea);
    const large = end - start > 180 ? 1 : 0;
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  const handleMouseEnter = (p) => setHoveredPoint(p);
  const handleMouseLeave = () => setHoveredPoint(null);

  return (
    <div className="flex items-center justify-center mt-20 gap-12">
      <svg width={width} height={height} className="bg-white">
        <defs>
          <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Pie slices */}
        {slices.map((slice, i) => {
          const path = getPath(slice.startAngle, slice.endAngle);
          const midRad = (slice.midAngle - 90) * (Math.PI / 180);
          const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
          const dx = Math.cos(midRad) * popDistance;
          const dy = Math.sin(midRad) * popDistance;

          return (
            <g
              key={i}
              transform={`translate(${dx}, ${dy})`}
              style={{ transition: "transform 0.25s ease-out" }}
            >
              <path
                d={path}
                fill={slice.color}
                className="cursor-pointer opacity-80 hover:opacity-100"
                onMouseEnter={() => handleMouseEnter(slice)}
                onMouseLeave={handleMouseLeave}
              />
              {slice.angle > 30 && (
                <text
                  x={centerX + Math.cos(midRad) * (radius * 0.55)}
                  y={centerY + Math.sin(midRad) * (radius * 0.55)}
                  textAnchor="middle"
                  dy=".35em"
                  className="fill-white font-bold text-sm"
                >
                  {slice.value}
                </text>
              )}
            </g>
          );
        })}

        {/* Tooltip */}
        {hoveredPoint && (
          (() => {
            const slice = hoveredPoint;
            const midRad = (slice.midAngle - 90) * (Math.PI / 180);
            const offset = radius + 50;
            let tx = centerX + Math.cos(midRad) * offset;
            let ty = centerY + Math.sin(midRad) * offset;

            const tooltipWidth = 150;
            const tooltipHeight = 60;
            let rectX = tx - tooltipWidth / 2;
            let rectY = ty - tooltipHeight / 2;

            rectX = Math.max(10, Math.min(width - tooltipWidth - 10, rectX));
            rectY = Math.max(10, Math.min(height - tooltipHeight - 10, rectY));

            const labelX = rectX + 25;
            const valueX = rectX + 10;
            const circleX = rectX + 10;
            const circleY = rectY + 18;

            return (
              <g>
                <rect
                  x={rectX}
                  y={rectY}
                  width={tooltipWidth}
                  height={tooltipHeight}
                  rx={10}
                  fill="#1874da"
                  filter="url(#tooltipShadow)"
                />
                <circle
                  cx={circleX}
                  cy={circleY}
                  r={6}
                  fill={slice.color}
                />
                <text
                  x={labelX}
                  y={rectY + 20}
                  textAnchor="start"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {slice.label}
                </text>
                <text
                  x={valueX}
                  y={rectY + 38}
                  textAnchor="start"
                  fill="white"
                  fontSize="13"
                >
                  Value: {slice.value}
                </text>
                <text
                  x={valueX}
                  y={rectY + 52}
                  textAnchor="start"
                  fill="white"
                  fontSize="13"
                >
                  Percentage: {slice.percent}%
                </text>
              </g>
            );
          })()
        )}
      </svg>

      {/* Legend */}
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: getColor(d.value) }}
            />
            <span className="text-sm font-medium text-gray-700">
              {d.label}: {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}