// import React, { useMemo, useState, useRef, useEffect } from "react";

// export default function LineChart({
//   data = {
//     title: "Product A",
//     data: [
//       { x: 1, y: 100 },
//       { x: 2, y: 50 },
//       { x: 3, y: 90 },
//       { x: 4, y: 20 },
//       { x: 5, y: 40 },
//       { x: 6, y: 95 },
//       { x: 7, y: 30 },
//       { x: 8, y: 60 },
//       { x: 9, y: 10 },
//       { x: 10, y: 20 },
//     ],
//   },
//   width = 560,
//   height = 400,
//   xMin = 1,
//   xMax = 10,
//   yMin = 0,
//   yMax = 100,
//   color = "#4A90E2",

//   showTitle = true, // toggle the title
//   showTooltip = true,
//   showMarkers = false, // toggle marker points
//   markerSize = 4, // marker point size in px

//   showXGrid = true, // show/hide grid in X axis
//   showYGrid = true, // show/hide grid in Y axis

//   gridLineXWidth = "1",
//   gridLineYWidth = "1",
//   gridLineXColor = "#00FFFF",
//   gridLineYColor = "#808080",

//   //show and hide X and Y label
//   showXlabel = true,
//   showYlabel = true,
// }) {
//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const pathRef = useRef(null);
//   const containerRef = useRef(null);

//   if (!data || !data.data || data.data.length === 0)
//     return <div className="text-red-500">No data</div>;

//   const padding = 60;

//   const scaleX = (x) =>
//     ((x - xMin) / (xMax - xMin)) * (width - 2 * padding) + padding;
//   const scaleY = (y) =>
//     height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

//   const createSmoothPath = (points) => {
//     if (points.length < 2) return "";
//     let d = `M ${scaleX(points[0].x)} ${scaleY(points[0].y)}`;
//     for (let i = 0; i < points.length - 1; i++) {
//       const p0 = points[i - 1] || points[i];
//       const p1 = points[i];
//       const p2 = points[i + 1];
//       const p3 = points[i + 2] || p2;
//       const cp1x = scaleX(p1.x + (p2.x - p0.x) / 6);
//       const cp1y = scaleY(p1.y + (p2.y - p0.y) / 6);
//       const cp2x = scaleX(p2.x - (p3.x - p1.x) / 6);
//       const cp2y = scaleY(p2.y - (p3.y - p1.y) / 6);
//       d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${scaleX(p2.x)} ${scaleY(
//         p2.y
//       )}`;
//     }
//     return d;
//   };

//   const pathD = createSmoothPath(data.data);

//   useEffect(() => {
//     if (pathRef.current) {
//       const length = pathRef.current.getTotalLength();
//       pathRef.current.style.strokeDasharray = length;
//       pathRef.current.style.strokeDashoffset = length;
//     }
//   }, [pathD]);

//   useEffect(() => {
//     if (isVisible && pathRef.current) {
//       requestAnimationFrame(() => {
//         pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
//         pathRef.current.style.strokeDashoffset = '0';
//       });
//     }
//   }, [isVisible]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           observer.disconnect();
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );
//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);

//   const xTicks = useMemo(
//     () => Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i),
//     [xMin, xMax]
//   );
//   const yTicks = useMemo(() => [0, 20, 40, 60, 80, 100], []);

//   // Add console logs to debug hover state
//   const handleMouseEnter = (p) => {
//     console.log("Mouse Enter:", p);
//     setHoveredPoint(p);
//   };

//   const handleMouseLeave = () => {
//     console.log("Mouse Leave");
//     setHoveredPoint(null);
//   };

//   return (
//     <div ref={containerRef} className="relative flex flex-col mt-20 items-center">
//       <svg width={width} height={height} className="bg-white">
        
//         {/* Grid lines */}
//         {showXGrid && xTicks.map((x) => (
//           <line
//             key={`gx-${x}`}
//             x1={scaleX(x)}
//             y1={padding}
//             x2={scaleX(x)}
//             y2={height - padding}
//             stroke={gridLineXColor}
//             strokeWidth={gridLineXWidth}
//           />
//         ))}
//         { showYGrid && yTicks.map((y) => (
//           <line
//             key={`gy-${y}`}
//             x1={padding}
//             y1={scaleY(y)}
//             x2={width - padding}
//             y2={scaleY(y)}
//             stroke={gridLineYColor}
//             strokeWidth={gridLineYWidth}
//           />
//         ))}

//         {/* Axes */}
//         <line
//           x1={padding}
//           y1={height - padding}
//           x2={width - padding}
//           y2={height - padding}
//           className="stroke-black"
//         />
//         <line
//           x1={padding}
//           y1={padding}
//           x2={padding}
//           y2={height - padding}
//           className="stroke-black"
//         />

//         {/* Smooth line with animation */}
//         <path
//           ref={pathRef}
//           d={pathD}
//           fill="none"
//           stroke={color}
//           strokeWidth={4}
//           className="opacity-60"
//         />

//         {data.data.map((p, i) => (
//           <g key={i}>
//             {(showMarkers || showTooltip) && (
//               <circle
//                 cx={scaleX(p.x)}
//                 cy={scaleY(p.y)}
//                 r={showMarkers ? markerSize : 8}
//                 fill={showMarkers ? color : "transparent"}
//                 className={showMarkers ? "stroke-white cursor-pointer" : "cursor-pointer"}
//                 stroke={showMarkers ? "white" : "none"}
//                 strokeWidth={showMarkers ? 1.5 : 0}
//                 onMouseEnter={() => handleMouseEnter(p)}
//                 onMouseLeave={handleMouseLeave}
//               />
//             )}

//             {showTooltip && hoveredPoint?.x === p.x && hoveredPoint?.y === p.y && (
//               <g>
//                 {/* Tooltip background */}
//                 <rect
//                   x={scaleX(p.x) - 45}
//                   y={scaleY(p.y) - 50}
//                   width={100}
//                   height={40}
//                   fill="rgba(0,0,0,0.85)"
//                   rx={8}
//                 />

//                 {/* Tooltip text */}
//                 <text
//                   x={scaleX(p.x) + 5}
//                   y={scaleY(p.y) - 35}
//                   fill="white"
//                   textAnchor="middle"
//                   fontSize="12"
//                 >
//                   <tspan
//                     x={scaleX(p.x) + 5}
//                     dy="0"
//                     fontWeight="bold"
//                     fontSize="13"
//                   >
//                     {data.title}
//                   </tspan>
//                   <tspan x={scaleX(p.x) + 5} dy="16" fontSize="12">
//                     {`x: ${p.x}, y: ${p.y}`}
//                   </tspan>
//                 </text>
//               </g>
//             )}
//           </g>
//         ))}

//         {/* Axis labels */}
//         {showXlabel && xTicks.map((x) => (
//           <text
//             key={`tx-${x}`}
//             x={scaleX(x)}
//             y={height - padding + 20}
//             className="text-xs text-gray-600 text-center"
//             textAnchor="middle"
//           >
//             {x}
//           </text>
//         ))}
//         {showYlabel && yTicks.map((y) => (
//           <text
//             key={`ty-${y}`}
//             x={padding - 10}
//             y={scaleY(y) + 4}
//             className="text-xs text-gray-600 text-right"
//             textAnchor="end"
//           >
//             {y.toFixed(1)}
//           </text>
//         ))}
//       </svg>

//       {showTitle && (
//         <div className="flex items-center justify-center mt-4 gap-2">
//           <div
//             className="w-3 h-3 rounded-xs opacity-60"
//             style={{ backgroundColor: color }}
//           />
//           <span className="text-xs text-gray-500">{data.title}</span>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useMemo, useState, useRef, useEffect } from "react";

export default function LineChart({
  data = {
    title: "Product A",
    data: [
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
  },
  width = 560,
  height = 400,
  xMin = 1,
  xMax = 10,
  yMin = 0,
  yMax = 100,
  color = "#4A90E2",

  showTitle = true, // toggle the title
  showTooltip = true,
  showMarkers = false, // toggle marker points
  markerSize = 4, // marker point size in px

  showXGrid = true, // show/hide grid in X axis
  showYGrid = true, // show/hide grid in Y axis

  gridLineXWidth = "1",
  gridLineYWidth = "1",
  gridLineXColor = "#00FFFF",
  gridLineYColor = "#808080",

  //show and hide X and Y label
  showXlabel = true,
  showYlabel = true,

  //======Border props for overall chart container
  borderTop = 10,
  borderRight = 10,
  borderBottom = 10,
  borderLeft = 10,
  borderColor = "black",
  borderStyle = "solid", //none, solid, dashed, dotted
  //======Border colors for each side
  borderTopColor = "",
  borderRightColor = "red",
  borderBottomColor = "",
  borderLeftColor = "",
  borderRadiusAll = 20, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft = 0,
  borderRadiusTopRight = 0,
  borderRadiusBottomRight = 0,
  borderRadiusBottomLeft = 0,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  if (!data || !data.data || data.data.length === 0)
    return <div className="text-red-500">No data</div>;

  const totalBorderHorizontal = borderLeft + borderRight;
  const totalBorderVertical = borderTop + borderBottom;
  const svgWidth = width - totalBorderHorizontal;
  const svgHeight = height - totalBorderVertical;

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (x) =>
    ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding) + padding;
  const scaleY = (y) =>
    svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

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

  const pathD = createSmoothPath(data.data);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
    }
  }, [pathD]);

  useEffect(() => {
    if (isVisible && pathRef.current) {
      requestAnimationFrame(() => {
        pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
        pathRef.current.style.strokeDashoffset = '0';
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

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

  const borderedContainerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    boxSizing: "border-box",
    borderTopWidth: `${borderTop}px`,
    borderRightWidth: `${borderRight}px`,
    borderBottomWidth: `${borderBottom}px`,
    borderLeftWidth: `${borderLeft}px`,
    borderTopColor: borderTopColor || borderColor,
    borderRightColor: borderRightColor || borderColor,
    borderBottomColor: borderBottomColor || borderColor,
    borderLeftColor: borderLeftColor || borderColor,
    borderStyle,
    borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
    borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
    borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
    borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
  };

  return (
    <div ref={containerRef} className="relative flex flex-col mt-20 items-center">
      <div style={borderedContainerStyle}>
        <svg width={svgWidth} height={svgHeight} className="bg-white">
          
          {/* Grid lines */}
          {showXGrid && xTicks.map((x) => (
            <line
              key={`gx-${x}`}
              x1={scaleX(x)}
              y1={padding}
              x2={scaleX(x)}
              y2={svgHeight - padding}
              stroke={gridLineXColor}
              strokeWidth={gridLineXWidth}
            />
          ))}
          { showYGrid && yTicks.map((y) => (
            <line
              key={`gy-${y}`}
              x1={padding}
              y1={scaleY(y)}
              x2={svgWidth - padding}
              y2={scaleY(y)}
              stroke={gridLineYColor}
              strokeWidth={gridLineYWidth}
            />
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={svgWidth - padding}
            y2={svgHeight - padding}
            className="stroke-black"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={svgHeight - padding}
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

          {data.data.map((p, i) => (
            <g key={i}>
              {(showMarkers || showTooltip) && (
                <circle
                  cx={scaleX(p.x)}
                  cy={scaleY(p.y)}
                  r={showMarkers ? markerSize : 8}
                  fill={showMarkers ? color : "transparent"}
                  className={showMarkers ? "stroke-white cursor-pointer" : "cursor-pointer"}
                  stroke={showMarkers ? "white" : "none"}
                  strokeWidth={showMarkers ? 1.5 : 0}
                  onMouseEnter={() => handleMouseEnter(p)}
                  onMouseLeave={handleMouseLeave}
                />
              )}

              {showTooltip && hoveredPoint?.x === p.x && hoveredPoint?.y === p.y && (
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
                      {data.title}
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
          {showXlabel && xTicks.map((x) => (
            <text
              key={`tx-${x}`}
              x={scaleX(x)}
              y={svgHeight - padding + 20}
              className="text-xs text-gray-600 text-center"
              textAnchor="middle"
            >
              {x}
            </text>
          ))}
          {showYlabel && yTicks.map((y) => (
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
      </div>

      {showTitle && (
        <div className="flex items-center justify-center mt-4 gap-2">
          <div
            className="w-3 h-3 rounded-xs opacity-60"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs text-gray-500">{data.title}</span>
        </div>
      )}
    </div>
  );
}