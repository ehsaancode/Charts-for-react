import React, { useMemo, useState, useEffect } from "react";

export default function BarChartTest() {
  const data = [
    { y: "January", x: 50 },
    { y: "February", x: 54 },
    { y: "March", x: 63 },
    { y: "April", x: 71 },
    { y: "May", x: 80 },
    // { y: "June", x: 89 },
  ];

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animatedWidths, setAnimatedWidths] = useState(Array(data.length).fill(0));

  const width = 480;
  const height = 320;
  const padding = 60;

  const xMin = 40;
  const xMax = 95;

  const scaleX = (value) =>
    ((value - xMin) / (xMax - xMin)) * (width - 2 * padding) + padding;
  const scaleY = (i) =>
    ((i + 0.5) / data.length) * (height - 2 * padding) + padding;

  const xTicks = useMemo(() => [45, 54, 63, 71, 80, 89], []);

  const barHeight = (height - 2 * padding) / data.length - 16;

  const fullWidths = useMemo(
    () => data.map((d) => scaleX(d.x) - padding),
    [data, xMin, xMax, width, padding]
  );

  useEffect(() => {
    const animateBar = (index) => {
      setAnimatedWidths((prev) => {
        const newWidths = [...prev];
        newWidths[index] = fullWidths[index];
        return newWidths;
      });
    };

    data.forEach((_, i) => {
      setTimeout(() => animateBar(i), i * 150);
    });
  }, [data, fullWidths]);

  const getColor = (value) => {
    const intensity = (value - xMin) / (xMax - xMin);
    const lightness = 85 - intensity * 25;
    return `hsl(210, 100%, ${lightness}%)`;
  };

  const handleMouseEnter = (p) => setHoveredPoint(p);
  const handleMouseLeave = () => setHoveredPoint(null);

  return (
    <div className="flex flex-col items-center mt-20">
      <svg width={width} height={height} className="bg-white">
        {/* X grid lines (vertical for values) */}
        {xTicks.map((x) => (
          <line
            key={`gx-${x}`}
            x1={scaleX(x)}
            y1={padding}
            x2={scaleX(x)}
            y2={height - padding}
            stroke="#ddd"
            strokeWidth={1}
          />
        ))}

        {/* Y grid lines (horizontal for categories) */}
        {data.map((_, i) => (
          <line
            key={`gy-${i}`}
            x1={padding}
            y1={scaleY(i)}
            x2={width - padding}
            y2={scaleY(i)}
            stroke="#ddd"
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#000"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#000"
        />

        {/* Bars */}
        {data.map((p, i) => {
          const yPos = scaleY(i);
          const animatedWidth = animatedWidths[i];
          const endX = padding + animatedWidth;
          const color = getColor(p.x);

          return (
            <g key={i}>
              <rect
                x={padding}
                y={yPos - barHeight / 2}
                width={animatedWidth}
                height={barHeight}
                fill={color}
                rx={5}
                style={{
                  transition: 'width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
                className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                onMouseEnter={() => handleMouseEnter(p)}
                onMouseLeave={handleMouseLeave}
              />

              {/* Tooltip */}
              {hoveredPoint?.y === p.y && (
                <g>
                  <rect
                    x={endX + 5}
                    y={yPos - 55}
                    width={100}
                    height={40}
                    rx={8}
                    className="fill-black/85"
                  />
                  <text
                    x={endX + 50}
                    y={yPos - 40}
                    className="fill-white text-[12px]"
                    textAnchor="middle"
                  >
                    <tspan
                      x={endX + 50}
                      dy="0"
                      fontWeight="bold"
                      fontSize="13"
                    >
                      {p.y}
                    </tspan>
                    <tspan x={endX + 50} dy="16" fontSize="12">
                      {`Value: ${p.x}`}
                    </tspan>
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* X labels */}
        {xTicks.map((x) => (
          <text
            key={`tx-${x}`}
            x={scaleX(x)}
            y={height - padding + 20}
            textAnchor="middle"
            className="text-[11px] fill-gray-600"
          >
            {x}
          </text>
        ))}

        {/* Y labels */}
        {data.map((p, i) => (
          <text
            key={`ty-${p.y}`}
            x={padding - 10}
            y={scaleY(i) + 4}
            textAnchor="end"
            className="text-[11px] fill-gray-600"
          >
            {p.y}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-5 flex justify-center gap-4 bg-white rounded-2xl shadow-2xl shadow-black px-6 py-4">
        {data.map((p) => {
          const color = getColor(p.x);
          return (
            <div key={p.y} className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-sm opacity-70"
                style={{ backgroundColor: color }}
              />
              <span className="text-[12px] text-gray-700">{p.y}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}