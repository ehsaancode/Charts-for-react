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
//   color = "#4A90E2", //graph line color

//   showTitle = true, // toggle the title
//   showTooltip = true,
//   showMarkers = true, // toggle marker points
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

//   //Border props for overall chart container
//   borderAll = 10,
//   borderTop = 0,
//   borderRight = 0,
//   borderBottom = 0,
//   borderLeft = 0,
//   borderColor = "#000000",
//   borderStyle = "solid", //none, solid, dashed, dotted

//   //Border colors for each side
//   borderTopColor = "red",
//   borderRightColor = "",
//   borderBottomColor = "",
//   borderLeftColor = "",
//   borderRadiusAll = 50, //set radius for all the corners together
//   //change each corner of the container
//   borderRadiusTopLeft = 10,
//   borderRadiusTopRight = 0,
//   borderRadiusBottomRight = 0,
//   borderRadiusBottomLeft = 0,

//   //==Box Shadow props for overall chart container
//   boxShadowColor = "cyan",
//   boxShadowOffsetX = 10,
//   boxShadowOffsetY = 10,
//   boxShadowBlurRadius = 50,
//   boxShadowSpreadRadius = 5,

//   //Padding props for inside the border
//   paddingAll = 20,
//   paddingTop = 0,
//   paddingRight = 0,
//   paddingBottom = 0,
//   paddingLeft = 0,

//   //Margin props for outside the border
//   marginAll = 20,
//   marginTop = 0,
//   marginRight = 0,
//   marginBottom = 50,
//   marginLeft = 0,

//   //Background color inside the border
//   backgroundColor = "#FFFFFF",
//   //============Linear Gradient Background props
//   useLinearGradient = true,
//   gradientColors = ["pink", "white"],
//   gradientAngle = 35,
//   gradientStops = [20, 90],
//   //=====Radial Gradient Background props
//   useRadialGradient = false,
//   radialGradientColors = ["pink", "pink", "white"],
//   radialGradientStops = [10, 40, 90],


//   //===Linear Gradient Foreground props
//   useLinearGradientForeground = false,
//   gradientColorsForeground = ["red", "white", "green"],
//   gradientAngleForeground = 30,
//   gradientStopsForeground = [0, 50, 100],

//   //Radial Gradient Foreground props
//   useRadialGradientForeground = false,
//   radialGradientColorsForeground = ["red", "pink", "green"],
//   radialGradientStopsForeground = [0, 50, 100],

//   //single foreground color
//   foregroundColor = "",

//   // chart alignment
//   alignment = "center", // left, center, right, stretch, baseline, auto


// }) {
//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const pathRef = useRef(null);
//   const containerRef = useRef(null);

//   //foreground
//   const effectiveForegroundColor = foregroundColor || "#374151";
//   const useGradientForText =
//     useLinearGradientForeground || useRadialGradientForeground;
//   const getForegroundGradientCSS = () => {
//     if (
//       useRadialGradientForeground &&
//       radialGradientColorsForeground &&
//       radialGradientColorsForeground.length > 0
//     ) {
//       const stops =
//         radialGradientStopsForeground.length ===
//         radialGradientColorsForeground.length
//           ? radialGradientStopsForeground
//           : Array.from(
//               { length: radialGradientColorsForeground.length },
//               (_, i) =>
//                 Math.round(
//                   (i / (radialGradientColorsForeground.length - 1)) * 100
//                 )
//             );
//       const colorStops = radialGradientColorsForeground
//         .map((color, i) => `${color} ${stops[i]}%`)
//         .join(", ");
//       return `radial-gradient(circle at center, ${colorStops})`;
//     } else if (
//       useLinearGradientForeground &&
//       gradientColorsForeground &&
//       gradientColorsForeground.length > 0
//     ) {
//       const stops =
//         gradientStopsForeground.length === gradientColorsForeground.length
//           ? gradientStopsForeground
//           : Array.from({ length: gradientColorsForeground.length }, (_, i) =>
//               Math.round((i / (gradientColorsForeground.length - 1)) * 100)
//             );
//       const colorStops = gradientColorsForeground
//         .map((color, i) => `${color} ${stops[i]}%`)
//         .join(", ");
//       return `linear-gradient(${gradientAngleForeground}deg, ${colorStops})`;
//     }
//     return null;
//   };
//   const foregroundGradientCSS = useGradientForText
//     ? getForegroundGradientCSS()
//     : null;
//   const titleTextStyle = {
//     color: useGradientForText ? "transparent" : effectiveForegroundColor,
//     ...(useGradientForText && {
//       backgroundImage: foregroundGradientCSS,
//       WebkitBackgroundClip: "text",
//       backgroundClip: "text",
//     }),
//   };

//   const getBackground = () => {
//     if (
//       useRadialGradient &&
//       radialGradientColors &&
//       radialGradientColors.length > 0
//     ) {
//       const stops =
//         radialGradientStops.length === radialGradientColors.length
//           ? radialGradientStops
//           : Array.from({ length: radialGradientColors.length }, (_, i) =>
//               Math.round((i / (radialGradientColors.length - 1)) * 100)
//             );
//       const colorStops = radialGradientColors
//         .map((color, i) => `${color} ${stops[i]}%`)
//         .join(", ");
//       return `radial-gradient(circle at center, ${colorStops})`;
//     } else if (
//       useLinearGradient &&
//       gradientColors &&
//       gradientColors.length > 0
//     ) {
//       const stops =
//         gradientStops.length === gradientColors.length
//           ? gradientStops
//           : Array.from({ length: gradientColors.length }, (_, i) =>
//               Math.round((i / (gradientColors.length - 1)) * 100)
//             );
//       const colorStops = gradientColors
//         .map((color, i) => `${color} ${stops[i]}%`)
//         .join(", ");
//       return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
//     }
//     return backgroundColor || "transparent";
//   };

//   const effectiveBackground = getBackground();

//   if (!data || !data.data || data.data.length === 0)
//     return <div className="text-red-500">No data</div>;

//   const effectiveBorderTop = borderTop || borderAll || 0;
//   const effectiveBorderRight = borderRight || borderAll || 0;
//   const effectiveBorderBottom = borderBottom || borderAll || 0;
//   const effectiveBorderLeft = borderLeft || borderAll || 0;

//   const effectivePaddingTop = paddingTop || paddingAll || 0;
//   const effectivePaddingRight = paddingRight || paddingAll || 0;
//   const effectivePaddingBottom = paddingBottom || paddingAll || 0;
//   const effectivePaddingLeft = paddingLeft || paddingAll || 0;

//   const effectiveMarginTop = marginTop || marginAll || 0;
//   const effectiveMarginRight = marginRight || marginAll || 0;
//   const effectiveMarginBottom = marginBottom || marginAll || 0;
//   const effectiveMarginLeft = marginLeft || marginAll || 0;

//   const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
//   const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
//   const totalPaddingHorizontal = effectivePaddingLeft + effectivePaddingRight;
//   const totalPaddingVertical = effectivePaddingTop + effectivePaddingBottom;
//   const titleSpace = showTitle ? 40 : 0;
//   const svgWidth = width - totalBorderHorizontal - totalPaddingHorizontal;
//   const contentHeight = height - totalBorderVertical - totalPaddingVertical;
//   const svgHeight = contentHeight - titleSpace;
  

//   if (svgWidth <= 0 || svgHeight <= 0)
//     return <div className="text-red-500">Insufficient space</div>;

//   const padding = 60;

//   const scaleX = (x) =>
//     ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding) + padding;
//   const scaleY = (y) =>
//     svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

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

//   const marginStyle = {
//     marginTop: `${effectiveMarginTop}px`,
//     marginRight: `${effectiveMarginRight}px`,
//     marginBottom: `${effectiveMarginBottom}px`,
//     marginLeft: `${effectiveMarginLeft}px`,
//   };

//   const borderedContainerStyle = {
//     width: `${width}px`,
//     height: `${height}px`,
//     boxSizing: "border-box",
//     borderTopWidth: `${effectiveBorderTop}px`,
//     borderRightWidth: `${effectiveBorderRight}px`,
//     borderBottomWidth: `${effectiveBorderBottom}px`,
//     borderLeftWidth: `${effectiveBorderLeft}px`,
//     borderTopColor: borderTopColor || borderColor,
//     borderRightColor: borderRightColor || borderColor,
//     borderBottomColor: borderBottomColor || borderColor,
//     borderLeftColor: borderLeftColor || borderColor,
//     borderStyle: borderStyle === "none" ? "none" : borderStyle,
//     boxShadow: `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}`,

//     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
//     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
//     borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
//     borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: `${effectivePaddingTop}px`,
//     paddingRight: `${effectivePaddingRight}px`,
//     paddingBottom: `${effectivePaddingBottom}px`,
//     paddingLeft: `${effectivePaddingLeft}px`,
//     background: effectiveBackground,
//   };

//   return (
//     <div ref={containerRef} className="relative flex flex-col mt-20 items-center">
//       <div style={marginStyle}>
//         <div style={borderedContainerStyle}>
//           <svg width={svgWidth} height={svgHeight} className="">
//             <defs>
//               {useGradientForText && (
//                 <>
//                   {useRadialGradientForeground ? (
//                     <radialGradient
//                       id="fgGrad"
//                       cx="0.5"
//                       cy="0.5"
//                       r="0.5"
//                       gradientUnits="objectBoundingBox"
//                     >
//                       {(() => {
//                         const colors = radialGradientColorsForeground;
//                         const stopsArr =
//                           radialGradientStopsForeground.length === colors.length
//                             ? radialGradientStopsForeground
//                             : Array.from({ length: colors.length }, (_, i) =>
//                                 Math.round((i / (colors.length - 1)) * 100)
//                               );
//                         return colors.map((color, i) => (
//                           <stop
//                             key={i}
//                             offset={`${stopsArr[i]}%`}
//                             stopColor={color}
//                           />
//                         ));
//                       })()}
//                     </radialGradient>
//                   ) : (
//                     <linearGradient
//                       id="fgGrad"
//                       x1="0"
//                       y1="0"
//                       x2="1"
//                       y2="0"
//                       gradientUnits="objectBoundingBox"
//                       gradientTransform={`rotate(${gradientAngleForeground}, 0.5, 0.5)`}
//                     >
//                       {(() => {
//                         const colors = gradientColorsForeground;
//                         const stopsArr =
//                           gradientStopsForeground.length === colors.length
//                             ? gradientStopsForeground
//                             : Array.from({ length: colors.length }, (_, i) =>
//                                 Math.round((i / (colors.length - 1)) * 100)
//                               );
//                         return colors.map((color, i) => (
//                           <stop
//                             key={i}
//                             offset={`${stopsArr[i]}%`}
//                             stopColor={color}
//                           />
//                         ));
//                       })()}
//                     </linearGradient>
//                   )}
//                 </>
//               )}
//             </defs>
            
//             {/* Grid lines */}
//             {showXGrid && xTicks.map((x) => (
//               <line
//                 key={`gx-${x}`}
//                 x1={scaleX(x)}
//                 y1={padding}
//                 x2={scaleX(x)}
//                 y2={svgHeight - padding}
//                 stroke={gridLineXColor}
//                 strokeWidth={gridLineXWidth}
//               />
//             ))}
//             { showYGrid && yTicks.map((y) => (
//               <line
//                 key={`gy-${y}`}
//                 x1={padding}
//                 y1={scaleY(y)}
//                 x2={svgWidth - padding}
//                 y2={scaleY(y)}
//                 stroke={gridLineYColor}
//                 strokeWidth={gridLineYWidth}
//               />
//             ))}

//             {/* Axes */}
//             <line
//               x1={padding}
//               y1={svgHeight - padding}
//               x2={svgWidth - padding}
//               y2={svgHeight - padding}
//               className="stroke-black"
//             />
//             <line
//               x1={padding}
//               y1={padding}
//               x2={padding}
//               y2={svgHeight - padding}
//               className="stroke-black"
//             />

//             {/* Smooth line with animation */}
//             <path
//               ref={pathRef}
//               d={pathD}
//               fill="none"
//               stroke={color}
//               strokeWidth={4}
//               className="opacity-60"
//             />

//             {data.data.map((p, i) => (
//               <g key={i}>
//                 {(showMarkers || showTooltip) && (
//                   <circle
//                     cx={scaleX(p.x)}
//                     cy={scaleY(p.y)}
//                     r={showMarkers ? markerSize : 8}
//                     fill={showMarkers ? color : "transparent"}
//                     className={showMarkers ? "stroke-white cursor-pointer" : "cursor-pointer"}
//                     stroke={showMarkers ? "white" : "none"}
//                     strokeWidth={showMarkers ? 1.5 : 0}
//                     onMouseEnter={() => handleMouseEnter(p)}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                 )}

//                 {showTooltip && hoveredPoint?.x === p.x && hoveredPoint?.y === p.y && (
//                   <g>
//                     {/* Tooltip background */}
//                     <rect
//                       x={scaleX(p.x) - 45}
//                       y={scaleY(p.y) - 50}
//                       width={100}
//                       height={40}
//                       fill="rgba(0,0,0,0.85)"
//                       rx={8}
//                     />

//                     {/* Tooltip text */}
//                     <text
//                       x={scaleX(p.x) + 5}
//                       y={scaleY(p.y) - 35}
//                       fill="white"
//                       textAnchor="middle"
//                       fontSize="12"
//                     >
//                       <tspan
//                         x={scaleX(p.x) + 5}
//                         dy="0"
//                         fontWeight="bold"
//                         fontSize="13"
//                       >
//                         {data.title}
//                       </tspan>
//                       <tspan x={scaleX(p.x) + 5} dy="16" fontSize="12">
//                         {`x: ${p.x}, y: ${p.y}`}
//                       </tspan>
//                     </text>
//                   </g>
//                 )}
//               </g>
//             ))}

//             {/* Axis labels */}
//             {showXlabel && xTicks.map((x) => (
//               <text
//                 key={`tx-${x}`}
//                 x={scaleX(x)}
//                 y={svgHeight - padding + 20}
//                 className="text-xs text-center"
//                 textAnchor="middle"
//                 fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
//               >
//                 {x}
//               </text>
//             ))}
//             {showYlabel && yTicks.map((y) => (
//               <text
//                 key={`ty-${y}`}
//                 x={padding - 10}
//                 y={scaleY(y) + 4}
//                 className="text-xs text-right"
//                 textAnchor="end"
//                 fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
//               >
//                 {y.toFixed(1)}
//               </text>
//             ))}
//           </svg>
//           {showTitle && (
//             <div className="flex items-center justify-center mt-4 gap-2">
//               <div
//                 className="w-3 h-3 rounded-xs opacity-60"
//                 style={{ backgroundColor: color }}
//               />
//               <span className="text-xs" style={titleTextStyle}>{data.title}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
