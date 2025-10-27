import React, { useMemo, useState, useRef, useEffect } from "react";

export default function LineChart({
  data = [
    { x: 1, y: 100 },
    { x: 2, y: 50 },
    { x: 3, y: 90 },
    { x: 4, y: 20 },
    { x: 5, y: 40 },
    { x: 6, y: 95 },
    { x: 7, y: 30 },
    { x: 8, y: 60 },
    { x: 9, y: 10 },
    { x: 10, y: 20 },
  ],

  width = 560,
  height = 400,
  xMin = 1,
  xMax = 10,
  yMin = 0,
  yMax = 100,
  label = "Product A",
  color = "#4A90E2",
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const pathRef = useRef(null);

  if (!data || data.length === 0)
    return <div className="text-red-500">No data</div>;

  const padding = 60;

  const scaleX = (x) =>
    ((x - xMin) / (xMax - xMin)) * (width - 2 * padding) + padding;
  const scaleY = (y) =>
    height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const createSmoothPath = (points) => {
    if (points.length < 2) return "";
    let d = `M ${scaleX(points[0].x)} ${scaleY(points[0].y)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = scaleX(p1.x + (p2.x - p0.x) / 6);
      const cp1y = scaleY(p1.y + (p2.y - p0.y) / 6);
      const cp2x = scaleX(p2.x - (p3.x - p1.x) / 6);
      const cp2y = scaleY(p2.y - (p3.y - p1.y) / 6);
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${scaleX(p2.x)} ${scaleY(
        p2.y
      )}`;
    }
    return d;
  };

  const pathD = createSmoothPath(data);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
      // Trigger the animation after a brief delay to ensure the initial state is set
      requestAnimationFrame(() => {
        pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
        pathRef.current.style.strokeDashoffset = '0';
      });
    }
  }, [pathD]);

  const xTicks = useMemo(
    () => Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i),
    [xMin, xMax]
  );
  const yTicks = useMemo(() => [0, 20, 40, 60, 80, 100], []);

  // Add console logs to debug hover state
  const handleMouseEnter = (p) => {
    console.log("Mouse Enter:", p);
    setHoveredPoint(p);
  };

  const handleMouseLeave = () => {
    console.log("Mouse Leave");
    setHoveredPoint(null);
  };

  return (
    <div className="relative flex flex-col mt-20 items-center">
      <svg width={width} height={height} className="bg-white">
        {/* Grid lines */}
        {xTicks.map((x) => (
          <line
            key={`gx-${x}`}
            x1={scaleX(x)}
            y1={padding}
            x2={scaleX(x)}
            y2={height - padding}
            className="stroke-gray-200"
            strokeWidth={1}
          />
        ))}
        {yTicks.map((y) => (
          <line
            key={`gy-${y}`}
            x1={padding}
            y1={scaleY(y)}
            x2={width - padding}
            y2={scaleY(y)}
            className="stroke-gray-200"
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className="stroke-black"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          className="stroke-black"
        />

        {/* Smooth line with animation */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={4}
          className="opacity-60"
        />

        {data.map((p, i) => (
          <g key={i}>
            <circle
              cx={scaleX(p.x)}
              cy={scaleY(p.y)}
              r={4}
              fill={color}
              className="stroke-white cursor-pointer"
              strokeWidth={1.5}
              onMouseEnter={() => handleMouseEnter(p)}
              onMouseLeave={handleMouseLeave}
            />

            {hoveredPoint?.x === p.x && hoveredPoint?.y === p.y && (
              <g>
                {/* Tooltip background */}
                <rect
                  x={scaleX(p.x) - 45}
                  y={scaleY(p.y) - 50}
                  width={100}
                  height={40}
                  fill="rgba(0,0,0,0.85)"
                  rx={8}
                />

                {/* Tooltip text */}
                <text
                  x={scaleX(p.x) + 5}
                  y={scaleY(p.y) - 35}
                  fill="white"
                  textAnchor="middle"
                  fontSize="12"
                >
                  <tspan
                    x={scaleX(p.x) + 5}
                    dy="0"
                    fontWeight="bold"
                    fontSize="13"
                  >
                    {label}
                  </tspan>
                  <tspan x={scaleX(p.x) + 5} dy="16" fontSize="12">
                    {`x: ${p.x}, y: ${p.y}`}
                  </tspan>
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Axis labels */}
        {xTicks.map((x) => (
          <text
            key={`tx-${x}`}
            x={scaleX(x)}
            y={height - padding + 20}
            className="text-xs text-gray-600 text-center"
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
        {yTicks.map((y) => (
          <text
            key={`ty-${y}`}
            x={padding - 10}
            y={scaleY(y) + 4}
            className="text-xs text-gray-600 text-right"
            textAnchor="end"
          >
            {y.toFixed(1)}
          </text>
        ))}
      </svg>

      <div className="flex items-center justify-center mt-4 gap-2">
        <div
          className="w-3 h-3 rounded-xs opacity-60"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
}

