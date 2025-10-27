// import React, { useMemo, useState } from "react";

// export default function ColumnChartTest() {
//   const data = [
//     { x: "January", y: 76 },
//     { x: "February", y: 82 },
//     { x: "March", y: 69 },
//     { x: "April", y: 58 },
//     { x: "May", y: 87 },
//   ];

//   const [hoveredPoint, setHoveredPoint] = useState(null);

//   const width = 480;
//   const height = 320;
//   const padding = 50;

//   const yMin = 56;
//   const yMax = 89;

//   const scaleX = (i) =>
//     ((i + 1) / (data.length + 1)) * (width - 2 * padding) + padding / 2;
//   const scaleY = (y) =>
//     height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

//   const yTicks = useMemo(() => [56, 63, 69, 76, 82, 89], []);

//   const barWidth = (width - 2 * padding) / data.length - 16;

//   const getColor = (value) => {
//     const intensity = (value - yMin) / (yMax - yMin);
//     const lightness = 85 - intensity * 25;
//     return `hsl(210, 100%, ${lightness}%)`;
//   };

//   const handleMouseEnter = (p) => setHoveredPoint(p);
//   const handleMouseLeave = () => setHoveredPoint(null);

//   return (
//     <div className="flex flex-col items-center">
//       <svg width={width} height={height} className="bg-white">
//         {/* Y grid lines */}
//         {yTicks.map((y) => (
//           <line
//             key={`gy-${y}`}
//             x1={padding}
//             y1={scaleY(y)}
//             x2={width - padding}
//             y2={scaleY(y)}
//             stroke="#ddd"
//             strokeWidth={1}
//           />
//         ))}

//         {/* X grid lines */}
//         {data.map((_, i) => (
//           <line
//             key={`gx-${i}`}
//             x1={scaleX(i)}
//             y1={padding}
//             x2={scaleX(i)}
//             y2={height - padding}
//             stroke="#ddd"
//             strokeWidth={1}
//           />
//         ))}

//         {/* Axes */}
//         <line
//           x1={padding}
//           y1={height - padding}
//           x2={width - padding}
//           y2={height - padding}
//           stroke="#000"
//         />
//         <line
//           x1={padding}
//           y1={padding}
//           x2={padding}
//           y2={height - padding}
//           stroke="#000"
//         />

//         {/* Bars */}
//         {data.map((p, i) => {
//           const xPos = scaleX(i);
//           const yPos = scaleY(p.y);
//           const barHeight = height - padding - yPos;
//           const color = getColor(p.y);

//           return (
//             <g key={i}>
//               <rect
//                 x={xPos - barWidth / 2}
//                 y={yPos}
//                 width={barWidth}
//                 height={barHeight}
//                 fill={color}
//                 rx={5}
//                 className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
//                 onMouseEnter={() => handleMouseEnter(p)}
//                 onMouseLeave={handleMouseLeave}
//               />

//               {/* Tooltip */}
//               {hoveredPoint?.x === p.x && (
//                 <g>
//                   <rect
//                     x={xPos - 45}
//                     y={yPos - 55}
//                     width={100}
//                     height={40}
//                     rx={8}
//                     className="fill-black/85"
//                   />
//                   <text
//                     x={xPos + 5}
//                     y={yPos - 40}
//                     className="fill-white text-[12px]"
//                     textAnchor="middle"
//                   >
//                     <tspan
//                       x={xPos + 5}
//                       dy="0"
//                       fontWeight="bold"
//                       fontSize="13"
//                     >
//                       {p.x}
//                     </tspan>
//                     <tspan x={xPos + 5} dy="16" fontSize="12">
//                       {`x: ${p.x}, y: ${p.y}`}
//                     </tspan>
//                   </text>
//                 </g>
//               )}
//             </g>
//           );
//         })}

//         {/* X labels */}
//         {data.map((p, i) => (
//           <text
//             key={`tx-${p.x}`}
//             x={scaleX(i)}
//             y={height - padding + 20}
//             textAnchor="middle"
//             className="text-[11px] fill-gray-600"
//           >
//             {p.x}
//           </text>
//         ))}

//         {/* Y labels */}
//         {yTicks.map((y) => (
//           <text
//             key={`ty-${y}`}
//             x={padding - 10}
//             y={scaleY(y) + 4}
//             textAnchor="end"
//             className="text-[11px] fill-gray-600"
//           >
//             {y}
//           </text>
//         ))}
//       </svg>

//       {/* Legend */}
//       <div className="mt-5 flex justify-center gap-4 bg-white rounded-2xl shadow-2xl shadow-black px-6 py-4">
//         {data.map((p) => {
//           const color = getColor(p.y);
//           return (
//             <div key={p.x} className="flex items-center gap-2">
//               <div
//                 className="w-3.5 h-3.5 rounded-sm opacity-70"
//                 style={{ backgroundColor: color }}
//               />
//               <span className="text-[12px] text-gray-700">{p.x}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
