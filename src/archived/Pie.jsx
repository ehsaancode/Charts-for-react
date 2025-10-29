// // import React, { useState, useEffect, useRef } from "react";

// // class ErrorBoundary extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { hasError: false, error: null };
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }
  

// //   componentDidCatch(error, errorInfo) {
// //     console.error('PieChart Error:', error, errorInfo);
// //     // customize error handling, send to logging service
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <div className="text-red-500 p-4 border border-red-300 rounded">
// //           <h2>Something went wrong in the Pie Chart.</h2>
// //           <details style={{ whiteSpace: 'pre-wrap' }}>
// //             {this.state.error && this.state.error.toString()}
// //           </details>
// //         </div>
// //       );
// //     }

// //     return this.props.children;
// //   }
// // }

// // const parseSize = (size) => {
// //   if (typeof size === 'number') return size;
// //   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
// //   if (!match) return 0;
// //   const num = parseFloat(match[1]);
// //   const unit = match[2];
// //   if (isNaN(num)) return 0;
// //   // For simplicity, assume px; % and vw would need viewport info which we don't have here
// //   return num;
// // };

// // export default function PieChart({
// //   data = [
// //     { label: "Sales", value: 35 },
// //     { label: "Marketing", value: 20 },
// //     { label: "Support", value: 25 },
// //     // { label: "Test", value: 10 },

// //   ],

// //   type = "ring", //if the chart is ring or pie

// //   //overall size
// //   width = '400px',
// //   height = '400px',
// //   minWidth = '0px',
// //   maxWidth = 'none',
// //   minHeight = '100px',
// //   maxHeight = 'none',

// //   legendPosition = "right", //set position to left, right, top, bottom
// //   showLegend = true, //hide legend

  
// //   //control label (on chart), color and font for this graph except tooltip.
// //   baseFontSize = 10,
// //   fontWeight = 500,
// //   labelBgColor = "#9caddf",
// //   labelTextColor = "#ffffff",

// //   // pie label box position adjustment
// //   labelBoxWidth = 30,
// //   labelBoxHeight = 20,
// //   labelBoxXOffset = 15,
// //   labelBoxYOffset = 11,
// //     //radius for pie box value on the chart.
// //     borderRadiusX = 4,
// //     borderRadiusY = 4,


// //   //==================Tooltip modification ================================
// //   showTooltip = true,
  
// //   tooltipFontSize = 10,
// //   tooltipFontWeight = 400,
// //   tooltipBorderRadiusAll = 0, //set radius for all the corner together
// //   //change each corner of the tooltip
// //   tooltipBorderRadiusTopLeft = 0,
// //   tooltipBorderRadiusTopRight = 10,
// //   tooltipBorderRadiusBottomRight = 0,
// //   tooltipBorderRadiusBottomLeft = 10,


// //   //if leave blank, default color will apply
// //   tooltipTextColor = "",
// //   tooltipBgColor = "#808000",

  
// //   // Additional tooltip box size
// //   tooltipWidth = 150,
// //   tooltipHeight = 60,

// //   showTooltipShadow = true, // on/off tooltip shadow
// // }) {
// //   const [hoveredPoint, setHoveredPoint] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const containerRef = useRef(null);
// //   const timeoutRef = useRef(null);

// //   if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

// //   const values = data.map((d) => d.value);
// //   const minValue = Math.min(...values);
// //   const maxValue = Math.max(...values);

// //   const getColor = (value) => {
// //     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
// //     const intensity = (value - minValue) / (maxValue - minValue);
// //     const lightness = 85 - intensity * 25;
// //     return `hsl(210, 100%, ${lightness}%)`;
// //   };

// //   const total = data.reduce((sum, d) => sum + d.value, 0);
// //   if (total === 0) return <div className="text-red-500">No data</div>;

// //   const numericalWidth = parseSize(width);
// //   const numericalHeight = parseSize(height);
// //   const centerX = numericalWidth / 2;
// //   const centerY = numericalHeight / 2;
// //   const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
// //   const innerRadius = type === "ring" ? radius * 0.5 : 0;
// //   const textRadius = Math.max(innerRadius, radius * 0.55);

// //   // Compute full slices
// //   let fullCumulative = 0;
// //   const fullSlices = data.map((d) => {
// //     const fullAngle = (d.value / total) * 360;
// //     const startAngle = fullCumulative;
// //     const endAngle = fullCumulative + fullAngle;
// //     const midAngle = (startAngle + endAngle) / 2;
// //     fullCumulative += fullAngle;
// //     const percent = ((d.value / total) * 100).toFixed(1);
// //     const color = getColor(d.value);
// //     return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
// //   });

// //   // Compute display slices with animation
// //   const displaySlices = fullSlices.map((slice) => ({
// //     ...slice,
// //     startAngle: slice.startAngle * progress,
// //     endAngle: slice.endAngle * progress,
// //     midAngle: slice.midAngle * progress,
// //     angle: slice.angle * progress,
// //   }));

// //   const getPath = (start, end, outerR = radius, innerR = 0) => {
// //     const sa = (start - 90) * (Math.PI / 180);
// //     const ea = (end - 90) * (Math.PI / 180);

// //     if (innerR === 0) {
// //       // Pie slice
// //       const x1 = centerX + outerR * Math.cos(sa);
// //       const y1 = centerY + outerR * Math.sin(sa);
// //       const x2 = centerX + outerR * Math.cos(ea);
// //       const y2 = centerY + outerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
// //     } else {
// //       // Ring sector
// //       const x1o = centerX + outerR * Math.cos(sa);
// //       const y1o = centerY + outerR * Math.sin(sa);
// //       const x2o = centerX + outerR * Math.cos(ea);
// //       const y2o = centerY + outerR * Math.sin(ea);
// //       const x1i = centerX + innerR * Math.cos(sa);
// //       const y1i = centerY + innerR * Math.sin(sa);
// //       const x2i = centerX + innerR * Math.cos(ea);
// //       const y2i = centerY + innerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
// //     }
// //   };

// //   const handleMouseEnter = (displaySlice) => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //     const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
// //     setHoveredPoint(fullSlice);
// //   };

// //   const handleMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const handleTooltipMouseEnter = () => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //   };

// //   const handleTooltipMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
// //     const path = [];
// //     // Top-left corner
// //     path.push(`M ${x + tl} ${y}`);
// //     path.push(`Q ${x} ${y} ${x} ${y + tl}`);
// //     // Left side
// //     path.push(`L ${x} ${y + height - bl}`);
// //     // Bottom-left corner
// //     path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
// //     // Bottom side
// //     path.push(`L ${x + width - br} ${y + height}`);
// //     // Bottom-right corner
// //     path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
// //     // Right side
// //     path.push(`L ${x + width} ${y + tr}`);
// //     // Top-right corner
// //     path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
// //     // Top side
// //     path.push(`L ${x + tl} ${y}`);
// //     path.push('Z');
// //     return path.join(' ');
// //   };

// //   const Legend = () => (
// //     <div className="space-y-4">
// //       {data.map((d, i) => (
// //         <div key={i} className="flex items-center gap-3">
// //           <div
// //             className="w-5 h-5 rounded-full"
// //             style={{ backgroundColor: getColor(d.value) }}
// //           />
// //           <span 
// //             style={{ 
// //               fontSize: `${baseFontSize}px`, 
// //               fontWeight,
// //               color: "#374151" 
// //             }}
// //           >
// //             {d.label}: {d.value}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
// //   const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
// //   const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.disconnect();
// //           setProgress(0);
// //           const duration = 1500;
// //           const start = Date.now();
// //           const animate = () => {
// //             const elapsed = Date.now() - start;
// //             let p = Math.min(elapsed / duration, 1);
// //             p = 1 - Math.pow(1 - p, 3);
// //             setProgress(p);
// //             if (p < 1) requestAnimationFrame(animate);
// //           };
// //           animate();
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (containerRef.current) {
// //       observer.observe(containerRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, [type]);

// //   useEffect(() => {
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   const effectiveTooltipTextColor = tooltipTextColor || "white";
// //   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

// //   return (
// //     <ErrorBoundary>
// //       <div className={containerClass} ref={containerRef}>
// //         {isLegendFirst && <Legend />}
// //         <svg 
// //           width={numericalWidth} 
// //           height={numericalHeight} 
// //           style={{ 
// //             minWidth, 
// //             maxWidth, 
// //             minHeight, 
// //             maxHeight,
// //             width: typeof width === 'string' ? width : `${width}px`,
// //             height: typeof height === 'string' ? height : `${height}px`
// //           }} 
// //           className="bg-white"
// //         >
// //           <defs>
// //             <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
// //               <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
// //             </filter>
// //           </defs>
          
// //           {displaySlices.map((slice, i) => {
// //             const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
// //             const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //             const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
// //             const dx = Math.cos(midRad) * popDistance;
// //             const dy = Math.sin(midRad) * popDistance;
// //             const originalAngle = fullSlices[i].angle;
// //             const valueTextX = centerX + Math.cos(midRad) * textRadius;
// //             const valueTextY = centerY + Math.sin(midRad) * textRadius;

// //             return (
// //               <g
// //                 key={i}
// //                 transform={`translate(${dx}, ${dy})`}
// //                 style={{ transition: "transform 0.25s ease-out" }}
// //               >
// //                 <path
// //                   d={path}
// //                   fill={slice.color}
// //                   className="cursor-pointer opacity-80 hover:opacity-100"
// //                   onMouseEnter={() => handleMouseEnter(slice)}
// //                   onMouseLeave={handleMouseLeave}
// //                 />
// //                 {originalAngle > 30 && (
// //                   <g>
// //                     <rect
// //                       x={valueTextX - labelBoxXOffset}
// //                       y={valueTextY - labelBoxYOffset}
// //                       width={labelBoxWidth}
// //                       height={labelBoxHeight}
// //                       rx={borderRadiusX}
// //                       ry={borderRadiusY}
// //                       fill={labelBgColor}
// //                     />
// //                     <text
// //                       x={valueTextX}
// //                       y={valueTextY}
// //                       textAnchor="middle"
// //                       dominantBaseline="middle"
// //                       style={{
// //                         fill: labelTextColor,
// //                         fontSize: baseFontSize,
// //                         fontWeight
// //                       }}
// //                     >
// //                       {slice.value}
// //                     </text>
// //                   </g>
// //                 )}
// //               </g>
// //             );
// //           })}

// //           {/* Tooltip */}
// //           {hoveredPoint && showTooltip && (
// //             (() => {
// //               const slice = hoveredPoint;
// //               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //               const offset = radius + 50;
// //               let tx = centerX + Math.cos(midRad) * offset;
// //               let ty = centerY + Math.sin(midRad) * offset;

// //               let rectX = tx - tooltipWidth / 2;
// //               let rectY = ty - tooltipHeight / 2;

// //               rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
// //               rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

// //               const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
// //               const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
// //               const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
// //               const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

// //               const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

// //               const labelX = rectX + 25;
// //               const valueX = rectX + 10;
// //               const circleX = rectX + 10;
// //               const circleY = rectY + 18;

// //               return (
// //                 <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
// //                   <path
// //                     d={tooltipPath}
// //                     fill={effectiveTooltipBgColor}
// //                     filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
// //                   />
// //                   <circle
// //                     cx={circleX}
// //                     cy={circleY}
// //                     r={6}
// //                     fill={slice.color}
// //                   />
// //                   <text
// //                     x={labelX}
// //                     y={rectY + 20}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize + 2}
// //                     fontWeight={700}
// //                   >
// //                     {slice.label}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 38}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Value: {slice.value}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 52}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Percentage: {slice.percent}%
// //                   </text>
// //                 </g>
// //               );
// //             })()
// //           )}
// //         </svg>
// //         {!isLegendFirst && showLegend && <Legend />}
// //       </div>
// //     </ErrorBoundary>
// //   );
// // }






// //2

// // import React, { useState, useEffect, useRef } from "react";

// // class ErrorBoundary extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { hasError: false, error: null };
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }


// //   componentDidCatch(error, errorInfo) {
// //     console.error('PieChart Error:', error, errorInfo);
// //     // customize error handling, send to logging service
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <div className="text-red-500 p-4 border border-red-300 rounded">
// //           <h2>Something went wrong in the Pie Chart.</h2>
// //           <details style={{ whiteSpace: 'pre-wrap' }}>
// //             {this.state.error && this.state.error.toString()}
// //           </details>
// //         </div>
// //       );
// //     }

// //     return this.props.children;
// //   }
// // }

// // const parseSize = (size) => {
// //   if (typeof size === 'number') return size;
// //   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
// //   if (!match) return 0;
// //   const num = parseFloat(match[1]);
// //   const unit = match[2];
// //   if (isNaN(num)) return 0;
// //   // For simplicity, assume px; % and vw would need viewport info which we don't have here
// //   return num;
// // };

// // export default function PieChart({
// //   data = [
// //     { label: "Sales", value: 35 },
// //     { label: "Marketing", value: 20 },
// //     { label: "Support", value: 25 },
// //     // { label: "Test", value: 10 },

// //   ],

// //   type = "ring", //if the chart is ring or pie

// //   //overall size
// //   width = '400px',
// //   height = '400px',
// //   minWidth = '0px',
// //   maxWidth = 'none',
// //   minHeight = '100px',
// //   maxHeight = 'none',

// //   legendPosition = "right", //set position to left, right, top, bottom
// //   showLegend = true, //hide legend

  
// //   //control label (on chart), color and font for this graph except tooltip.
// //   baseFontSize = 10,
// //   fontWeight = 500,
// //   labelBgColor = "#9caddf",
// //   labelTextColor = "#ffffff",

// //   // pie label box position adjustment
// //   labelBoxWidth = 30,
// //   labelBoxHeight = 20,
// //   labelBoxXOffset = 15,
// //   labelBoxYOffset = 11,
// //     //radius for pie box value on the chart.
// //     borderRadiusX = 4,
// //     borderRadiusY = 4,


// //   //==================Tooltip modification ================================
// //   showTooltip = true,
  
// //   tooltipFontSize = 10,
// //   tooltipFontWeight = 400,
// //   tooltipBorderRadiusAll = 0, //set radius for all the corner together
// //   //change each corner of the tooltip
// //   tooltipBorderRadiusTopLeft = 0,
// //   tooltipBorderRadiusTopRight = 10,
// //   tooltipBorderRadiusBottomRight = 0,
// //   tooltipBorderRadiusBottomLeft = 10,


// //   //if leave blank, default color will apply
// //   tooltipTextColor = "",
// //   tooltipBgColor = "#808000",

  
// //   // Additional tooltip box size
// //   tooltipWidth = 150,
// //   tooltipHeight = 60,

// //   showTooltipShadow = true, // on/off tooltip shadow

// //   //=====Border props for overall chart container 
// //   borderTop = 10,
// //   borderRight = 10,
// //   borderBottom = 10,
// //   borderLeft = 10,
// //   borderColor = "#FF0000",
// //   borderStyle = "solid", //dashed, dotted, solid
  
// // }) {
// //   const [hoveredPoint, setHoveredPoint] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const containerRef = useRef(null);
// //   const timeoutRef = useRef(null);

// //   if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

// //   const values = data.map((d) => d.value);
// //   const minValue = Math.min(...values);
// //   const maxValue = Math.max(...values);

// //   const getColor = (value) => {
// //     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
// //     const intensity = (value - minValue) / (maxValue - minValue);
// //     const lightness = 85 - intensity * 25;
// //     return `hsl(210, 100%, ${lightness}%)`;
// //   };

// //   const total = data.reduce((sum, d) => sum + d.value, 0);
// //   if (total === 0) return <div className="text-red-500">No data</div>;

// //   const numericalWidth = parseSize(width);
// //   const numericalHeight = parseSize(height);
// //   const centerX = numericalWidth / 2;
// //   const centerY = numericalHeight / 2;
// //   const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
// //   const innerRadius = type === "ring" ? radius * 0.5 : 0;
// //   const textRadius = Math.max(innerRadius, radius * 0.55);

// //   // Compute full slices
// //   let fullCumulative = 0;
// //   const fullSlices = data.map((d) => {
// //     const fullAngle = (d.value / total) * 360;
// //     const startAngle = fullCumulative;
// //     const endAngle = fullCumulative + fullAngle;
// //     const midAngle = (startAngle + endAngle) / 2;
// //     fullCumulative += fullAngle;
// //     const percent = ((d.value / total) * 100).toFixed(1);
// //     const color = getColor(d.value);
// //     return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
// //   });

// //   // Compute display slices with animation
// //   const displaySlices = fullSlices.map((slice) => ({
// //     ...slice,
// //     startAngle: slice.startAngle * progress,
// //     endAngle: slice.endAngle * progress,
// //     midAngle: slice.midAngle * progress,
// //     angle: slice.angle * progress,
// //   }));

// //   const getPath = (start, end, outerR = radius, innerR = 0) => {
// //     const sa = (start - 90) * (Math.PI / 180);
// //     const ea = (end - 90) * (Math.PI / 180);

// //     if (innerR === 0) {
// //       // Pie slice
// //       const x1 = centerX + outerR * Math.cos(sa);
// //       const y1 = centerY + outerR * Math.sin(sa);
// //       const x2 = centerX + outerR * Math.cos(ea);
// //       const y2 = centerY + outerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
// //     } else {
// //       // Ring sector
// //       const x1o = centerX + outerR * Math.cos(sa);
// //       const y1o = centerY + outerR * Math.sin(sa);
// //       const x2o = centerX + outerR * Math.cos(ea);
// //       const y2o = centerY + outerR * Math.sin(ea);
// //       const x1i = centerX + innerR * Math.cos(sa);
// //       const y1i = centerY + innerR * Math.sin(sa);
// //       const x2i = centerX + innerR * Math.cos(ea);
// //       const y2i = centerY + innerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
// //     }
// //   };

// //   const handleMouseEnter = (displaySlice) => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //     const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
// //     setHoveredPoint(fullSlice);
// //   };

// //   const handleMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const handleTooltipMouseEnter = () => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //   };

// //   const handleTooltipMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
// //     const path = [];
// //     // Top-left corner
// //     path.push(`M ${x + tl} ${y}`);
// //     path.push(`Q ${x} ${y} ${x} ${y + tl}`);
// //     // Left side
// //     path.push(`L ${x} ${y + height - bl}`);
// //     // Bottom-left corner
// //     path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
// //     // Bottom side
// //     path.push(`L ${x + width - br} ${y + height}`);
// //     // Bottom-right corner
// //     path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
// //     // Right side
// //     path.push(`L ${x + width} ${y + tr}`);
// //     // Top-right corner
// //     path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
// //     // Top side
// //     path.push(`L ${x + tl} ${y}`);
// //     path.push('Z');
// //     return path.join(' ');
// //   };

// //   const Legend = () => (
// //     <div className="space-y-4">
// //       {data.map((d, i) => (
// //         <div key={i} className="flex items-center gap-3">
// //           <div
// //             className="w-5 h-5 rounded-full"
// //             style={{ backgroundColor: getColor(d.value) }}
// //           />
// //           <span 
// //             style={{ 
// //               fontSize: `${baseFontSize}px`, 
// //               fontWeight,
// //               color: "#374151" 
// //             }}
// //           >
// //             {d.label}: {d.value}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
// //   const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
// //   const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.disconnect();
// //           setProgress(0);
// //           const duration = 1500;
// //           const start = Date.now();
// //           const animate = () => {
// //             const elapsed = Date.now() - start;
// //             let p = Math.min(elapsed / duration, 1);
// //             p = 1 - Math.pow(1 - p, 3);
// //             setProgress(p);
// //             if (p < 1) requestAnimationFrame(animate);
// //           };
// //           animate();
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (containerRef.current) {
// //       observer.observe(containerRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, [type]);

// //   useEffect(() => {
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   const effectiveTooltipTextColor = tooltipTextColor || "white";
// //   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

// //   //add border
// //   const containerBorderStyle = {
// //     borderTopWidth: `${borderTop}px`,
// //     borderRightWidth: `${borderRight}px`,
// //     borderBottomWidth: `${borderBottom}px`,
// //     borderLeftWidth: `${borderLeft}px`,
// //     borderColor,
// //     borderStyle,
// //   };

// //   return (
// //     <ErrorBoundary>
// //       <div 
// //         className={containerClass} 
// //         ref={containerRef}
// //         style={containerBorderStyle}
// //       >
// //         {isLegendFirst && <Legend />}
// //         <svg 
// //           width={numericalWidth} 
// //           height={numericalHeight} 
// //           style={{ 
// //             minWidth, 
// //             maxWidth, 
// //             minHeight, 
// //             maxHeight,
// //             width: typeof width === 'string' ? width : `${width}px`,
// //             height: typeof height === 'string' ? height : `${height}px`
// //           }} 
// //           className="bg-white"
// //         >
// //           <defs>
// //             <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
// //               <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
// //             </filter>
// //           </defs>
          
// //           {displaySlices.map((slice, i) => {
// //             const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
// //             const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //             const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
// //             const dx = Math.cos(midRad) * popDistance;
// //             const dy = Math.sin(midRad) * popDistance;
// //             const originalAngle = fullSlices[i].angle;
// //             const valueTextX = centerX + Math.cos(midRad) * textRadius;
// //             const valueTextY = centerY + Math.sin(midRad) * textRadius;

// //             return (
// //               <g
// //                 key={i}
// //                 transform={`translate(${dx}, ${dy})`}
// //                 style={{ transition: "transform 0.25s ease-out" }}
// //               >
// //                 <path
// //                   d={path}
// //                   fill={slice.color}
// //                   className="cursor-pointer opacity-80 hover:opacity-100"
// //                   onMouseEnter={() => handleMouseEnter(slice)}
// //                   onMouseLeave={handleMouseLeave}
// //                 />
// //                 {originalAngle > 30 && (
// //                   <g>
// //                     <rect
// //                       x={valueTextX - labelBoxXOffset}
// //                       y={valueTextY - labelBoxYOffset}
// //                       width={labelBoxWidth}
// //                       height={labelBoxHeight}
// //                       rx={borderRadiusX}
// //                       ry={borderRadiusY}
// //                       fill={labelBgColor}
// //                     />
// //                     <text
// //                       x={valueTextX}
// //                       y={valueTextY}
// //                       textAnchor="middle"
// //                       dominantBaseline="middle"
// //                       style={{
// //                         fill: labelTextColor,
// //                         fontSize: baseFontSize,
// //                         fontWeight
// //                       }}
// //                     >
// //                       {slice.value}
// //                     </text>
// //                   </g>
// //                 )}
// //               </g>
// //             );
// //           })}

// //           {/* Tooltip */}
// //           {hoveredPoint && showTooltip && (
// //             (() => {
// //               const slice = hoveredPoint;
// //               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //               const offset = radius + 50;
// //               let tx = centerX + Math.cos(midRad) * offset;
// //               let ty = centerY + Math.sin(midRad) * offset;

// //               let rectX = tx - tooltipWidth / 2;
// //               let rectY = ty - tooltipHeight / 2;

// //               rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
// //               rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

// //               const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
// //               const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
// //               const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
// //               const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

// //               const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

// //               const labelX = rectX + 25;
// //               const valueX = rectX + 10;
// //               const circleX = rectX + 10;
// //               const circleY = rectY + 18;

// //               return (
// //                 <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
// //                   <path
// //                     d={tooltipPath}
// //                     fill={effectiveTooltipBgColor}
// //                     filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
// //                   />
// //                   <circle
// //                     cx={circleX}
// //                     cy={circleY}
// //                     r={6}
// //                     fill={slice.color}
// //                   />
// //                   <text
// //                     x={labelX}
// //                     y={rectY + 20}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize + 2}
// //                     fontWeight={700}
// //                   >
// //                     {slice.label}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 38}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Value: {slice.value}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 52}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Percentage: {slice.percent}%
// //                   </text>
// //                 </g>
// //               );
// //             })()
// //           )}
// //         </svg>
// //         {!isLegendFirst && showLegend && <Legend />}
// //       </div>
// //     </ErrorBoundary>
// //   );
// // }



// /ddddddddddddddddddd


// // import React, { useState, useEffect, useRef } from "react";

// // class ErrorBoundary extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { hasError: false, error: null };
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }


// //   componentDidCatch(error, errorInfo) {
// //     console.error('PieChart Error:', error, errorInfo);
// //     // customize error handling, send to logging service
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <div className="text-red-500 p-4 border border-red-300 rounded">
// //           <h2>Something went wrong in the Pie Chart.</h2>
// //           <details style={{ whiteSpace: 'pre-wrap' }}>
// //             {this.state.error && this.state.error.toString()}
// //           </details>
// //         </div>
// //       );
// //     }

// //     return this.props.children;
// //   }
// // }

// // const parseSize = (size) => {
// //   if (typeof size === 'number') return size;
// //   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
// //   if (!match) return 0;
// //   const num = parseFloat(match[1]);
// //   const unit = match[2];
// //   if (isNaN(num)) return 0;
// //   // % and vw would need viewport info which we don't have here
// //   return num;
// // };

// // export default function PieChart({
// //   data = [
// //     { label: "Sales", value: 35 },
// //     { label: "Marketing", value: 20 },
// //     { label: "Support", value: 25 },
// //     // { label: "Test", value: 10 },

// //   ],

// //   type = "ring", //if the chart is ring or pie

// //   //overall size
// //   width = '400px',
// //   height = '400px',
// //   minWidth = '0px',
// //   maxWidth = 'none',
// //   minHeight = '100px',
// //   maxHeight = 'none',

// //   legendPosition = "right", //set position to left, right, top, bottom
// //   showLegend = true, //hide legend

  
// //   //control label (on chart), color and font for this graph except tooltip.
// //   baseFontSize = 10,
// //   fontWeight = 500,
// //   labelBgColor = "#9caddf",
// //   labelTextColor = "#ffffff",

// //   // pie label box position adjustment
// //   labelBoxWidth = 30,
// //   labelBoxHeight = 20,
// //   labelBoxXOffset = 15,
// //   labelBoxYOffset = 11,
// //     //radius for pie box value on the chart.
// //     borderRadiusX = 4,
// //     borderRadiusY = 4,


// //   //==================Tooltip modification ================================
// //   showTooltip = true,
  
// //   tooltipFontSize = 10,
// //   tooltipFontWeight = 400,
// //   tooltipBorderRadiusAll = 0, //set radius for all the corner together
// //   //change each corner of the tooltip
// //   tooltipBorderRadiusTopLeft = 0,
// //   tooltipBorderRadiusTopRight = 10,
// //   tooltipBorderRadiusBottomRight = 0,
// //   tooltipBorderRadiusBottomLeft = 10,


// //   //if leave blank, default color will apply
// //   tooltipTextColor = "",
// //   tooltipBgColor = "#808000",

  
// //   // Additional tooltip box size
// //   tooltipWidth = 150,
// //   tooltipHeight = 60,

// //   showTooltipShadow = true, // on/off tooltip shadow

// //   //======Border props for overall chart container
// //   borderWidth = 10, // uniform border thickness in px (overrides individual sides if provided)
// //   borderTop = 0,
// //   borderRight = 0,
// //   borderBottom = 0,
// //   borderLeft = 0,
// //   borderColor = "red",
// //   borderStyle = "solid",
// //   borderRadiusAll = 0, //set radius for all the corners together

// //   //change each corner of the container
// //   borderRadiusTopLeft = 20,
// //   borderRadiusTopRight = 0,
// //   borderRadiusBottomRight = 90,
// //   borderRadiusBottomLeft = 0,
// // }) {
// //   const [hoveredPoint, setHoveredPoint] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const containerRef = useRef(null);
// //   const timeoutRef = useRef(null);

// //   if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

// //   const values = data.map((d) => d.value);
// //   const minValue = Math.min(...values);
// //   const maxValue = Math.max(...values);

// //   const getColor = (value) => {
// //     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
// //     const intensity = (value - minValue) / (maxValue - minValue);
// //     const lightness = 85 - intensity * 25;
// //     return `hsl(210, 100%, ${lightness}%)`;
// //   };

// //   const total = data.reduce((sum, d) => sum + d.value, 0);
// //   if (total === 0) return <div className="text-red-500">No data</div>;

// //   const numericalWidth = parseSize(width);
// //   const numericalHeight = parseSize(height);
// //   const centerX = numericalWidth / 2;
// //   const centerY = numericalHeight / 2;
// //   const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
// //   const innerRadius = type === "ring" ? radius * 0.5 : 0;
// //   const textRadius = Math.max(innerRadius, radius * 0.55);

// //   // Compute full slices
// //   let fullCumulative = 0;
// //   const fullSlices = data.map((d) => {
// //     const fullAngle = (d.value / total) * 360;
// //     const startAngle = fullCumulative;
// //     const endAngle = fullCumulative + fullAngle;
// //     const midAngle = (startAngle + endAngle) / 2;
// //     fullCumulative += fullAngle;
// //     const percent = ((d.value / total) * 100).toFixed(1);
// //     const color = getColor(d.value);
// //     return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
// //   });

// //   // Compute display slices with animation
// //   const displaySlices = fullSlices.map((slice) => ({
// //     ...slice,
// //     startAngle: slice.startAngle * progress,
// //     endAngle: slice.endAngle * progress,
// //     midAngle: slice.midAngle * progress,
// //     angle: slice.angle * progress,
// //   }));

// //   const getPath = (start, end, outerR = radius, innerR = 0) => {
// //     const sa = (start - 90) * (Math.PI / 180);
// //     const ea = (end - 90) * (Math.PI / 180);

// //     if (innerR === 0) {
// //       // Pie slice
// //       const x1 = centerX + outerR * Math.cos(sa);
// //       const y1 = centerY + outerR * Math.sin(sa);
// //       const x2 = centerX + outerR * Math.cos(ea);
// //       const y2 = centerY + outerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
// //     } else {
// //       // Ring sector
// //       const x1o = centerX + outerR * Math.cos(sa);
// //       const y1o = centerY + outerR * Math.sin(sa);
// //       const x2o = centerX + outerR * Math.cos(ea);
// //       const y2o = centerY + outerR * Math.sin(ea);
// //       const x1i = centerX + innerR * Math.cos(sa);
// //       const y1i = centerY + innerR * Math.sin(sa);
// //       const x2i = centerX + innerR * Math.cos(ea);
// //       const y2i = centerY + innerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
// //     }
// //   };

// //   const handleMouseEnter = (displaySlice) => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //     const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
// //     setHoveredPoint(fullSlice);
// //   };

// //   const handleMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const handleTooltipMouseEnter = () => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //   };

// //   const handleTooltipMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
// //     const path = [];
// //     // Top-left corner
// //     path.push(`M ${x + tl} ${y}`);
// //     path.push(`Q ${x} ${y} ${x} ${y + tl}`);
// //     // Left side
// //     path.push(`L ${x} ${y + height - bl}`);
// //     // Bottom-left corner
// //     path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
// //     // Bottom side
// //     path.push(`L ${x + width - br} ${y + height}`);
// //     // Bottom-right corner
// //     path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
// //     // Right side
// //     path.push(`L ${x + width} ${y + tr}`);
// //     // Top-right corner
// //     path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
// //     // Top side
// //     path.push(`L ${x + tl} ${y}`);
// //     path.push('Z');
// //     return path.join(' ');
// //   };

// //   const Legend = () => (
// //     <div className="space-y-4">
// //       {data.map((d, i) => (
// //         <div key={i} className="flex items-center gap-3">
// //           <div
// //             className="w-5 h-5 rounded-full"
// //             style={{ backgroundColor: getColor(d.value) }}
// //           />
// //           <span 
// //             style={{ 
// //               fontSize: `${baseFontSize}px`, 
// //               fontWeight,
// //               color: "#374151" 
// //             }}
// //           >
// //             {d.label}: {d.value}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
// //   const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
// //   const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.disconnect();
// //           setProgress(0);
// //           const duration = 1500;
// //           const start = Date.now();
// //           const animate = () => {
// //             const elapsed = Date.now() - start;
// //             let p = Math.min(elapsed / duration, 1);
// //             p = 1 - Math.pow(1 - p, 3);
// //             setProgress(p);
// //             if (p < 1) requestAnimationFrame(animate);
// //           };
// //           animate();
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (containerRef.current) {
// //       observer.observe(containerRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, [type]);

// //   useEffect(() => {
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   const effectiveTooltipTextColor = tooltipTextColor || "white";
// //   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

// //   const containerBorderStyle = {
// //     borderTopWidth: `${borderWidth ?? borderTop}px`,
// //     borderRightWidth: `${borderWidth ?? borderRight}px`,
// //     borderBottomWidth: `${borderWidth ?? borderBottom}px`,
// //     borderLeftWidth: `${borderWidth ?? borderLeft}px`,
// //     borderColor,
// //     borderStyle,
// //     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
// //     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
// //     borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
// //     borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
// //   };

// //   return (
// //     <ErrorBoundary>
// //       <div 
// //         className={containerClass} 
// //         ref={containerRef}
// //         style={containerBorderStyle}
// //       >
// //         {isLegendFirst && <Legend />}
// //         <svg 
// //           width={numericalWidth} 
// //           height={numericalHeight} 
// //           style={{ 
// //             minWidth, 
// //             maxWidth, 
// //             minHeight, 
// //             maxHeight,
// //             width: typeof width === 'string' ? width : `${width}px`,
// //             height: typeof height === 'string' ? height : `${height}px`
// //           }} 
// //           className="bg-white"
// //         >
// //           <defs>
// //             <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
// //               <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
// //             </filter>
// //           </defs>
          
// //           {displaySlices.map((slice, i) => {
// //             const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
// //             const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //             const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
// //             const dx = Math.cos(midRad) * popDistance;
// //             const dy = Math.sin(midRad) * popDistance;
// //             const originalAngle = fullSlices[i].angle;
// //             const valueTextX = centerX + Math.cos(midRad) * textRadius;
// //             const valueTextY = centerY + Math.sin(midRad) * textRadius;

// //             return (
// //               <g
// //                 key={i}
// //                 transform={`translate(${dx}, ${dy})`}
// //                 style={{ transition: "transform 0.25s ease-out" }}
// //               >
// //                 <path
// //                   d={path}
// //                   fill={slice.color}
// //                   className="cursor-pointer opacity-80 hover:opacity-100"
// //                   onMouseEnter={() => handleMouseEnter(slice)}
// //                   onMouseLeave={handleMouseLeave}
// //                 />
// //                 {originalAngle > 30 && (
// //                   <g>
// //                     <rect
// //                       x={valueTextX - labelBoxXOffset}
// //                       y={valueTextY - labelBoxYOffset}
// //                       width={labelBoxWidth}
// //                       height={labelBoxHeight}
// //                       rx={borderRadiusX}
// //                       ry={borderRadiusY}
// //                       fill={labelBgColor}
// //                     />
// //                     <text
// //                       x={valueTextX}
// //                       y={valueTextY}
// //                       textAnchor="middle"
// //                       dominantBaseline="middle"
// //                       style={{
// //                         fill: labelTextColor,
// //                         fontSize: baseFontSize,
// //                         fontWeight
// //                       }}
// //                     >
// //                       {slice.value}
// //                     </text>
// //                   </g>
// //                 )}
// //               </g>
// //             );
// //           })}

// //           {/* Tooltip */}
// //           {hoveredPoint && showTooltip && (
// //             (() => {
// //               const slice = hoveredPoint;
// //               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //               const offset = radius + 50;
// //               let tx = centerX + Math.cos(midRad) * offset;
// //               let ty = centerY + Math.sin(midRad) * offset;

// //               let rectX = tx - tooltipWidth / 2;
// //               let rectY = ty - tooltipHeight / 2;

// //               rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
// //               rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

// //               const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
// //               const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
// //               const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
// //               const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

// //               const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

// //               const labelX = rectX + 25;
// //               const valueX = rectX + 10;
// //               const circleX = rectX + 10;
// //               const circleY = rectY + 18;

// //               return (
// //                 <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
// //                   <path
// //                     d={tooltipPath}
// //                     fill={effectiveTooltipBgColor}
// //                     filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
// //                   />
// //                   <circle
// //                     cx={circleX}
// //                     cy={circleY}
// //                     r={6}
// //                     fill={slice.color}
// //                   />
// //                   <text
// //                     x={labelX}
// //                     y={rectY + 20}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize + 2}
// //                     fontWeight={700}
// //                   >
// //                     {slice.label}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 38}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Value: {slice.value}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 52}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Percentage: {slice.percent}%
// //                   </text>
// //                 </g>
// //               );
// //             })()
// //           )}
// //         </svg>
// //         {!isLegendFirst && showLegend && <Legend />}
// //       </div>
// //     </ErrorBoundary>
// //   );
// // }


// // import React, { useState, useEffect, useRef } from "react";

// // class ErrorBoundary extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { hasError: false, error: null };
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }


// //   componentDidCatch(error, errorInfo) {
// //     console.error('PieChart Error:', error, errorInfo);
// //     // customize error handling, send to logging service
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <div className="text-red-500 p-4 border border-red-300 rounded">
// //           <h2>Something went wrong in the Pie Chart.</h2>
// //           <details style={{ whiteSpace: 'pre-wrap' }}>
// //             {this.state.error && this.state.error.toString()}
// //           </details>
// //         </div>
// //       );
// //     }

// //     return this.props.children;
// //   }
// // }

// // const parseSize = (size) => {
// //   if (typeof size === 'number') return size;
// //   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
// //   if (!match) return 0;
// //   const num = parseFloat(match[1]);
// //   const unit = match[2];
// //   if (isNaN(num)) return 0;
// //   // % and vw would need viewport info which we don't have here
// //   return num;
// // };

// // export default function PieChart({
// //   data = [
// //     { label: "Sales", value: 35 },
// //     { label: "Marketing", value: 20 },
// //     { label: "Support", value: 25 },
// //     // { label: "Test", value: 10 },

// //   ],

// //   type = "ring", //if the chart is ring or pie

// //   //overall size
// //   width = '400px',
// //   height = '400px',
// //   minWidth = '0px',
// //   maxWidth = 'none',
// //   minHeight = '100px',
// //   maxHeight = 'none',

// //   legendPosition = "right", //set position to left, right, top, bottom
// //   showLegend = true, //hide legend

  
// //   //control label (on chart), color and font for this graph except tooltip.
// //   baseFontSize = 10,
// //   fontWeight = 500,
// //   labelBgColor = "#9caddf",
// //   labelTextColor = "#ffffff",

// //   // pie label box position adjustment
// //   labelBoxWidth = 30,
// //   labelBoxHeight = 20,
// //   labelBoxXOffset = 15,
// //   labelBoxYOffset = 11,
// //     //radius for pie box value on the chart.
// //     borderRadiusX = 4,
// //     borderRadiusY = 4,


// //   //==================Tooltip modification ================================
// //   showTooltip = true,
  
// //   tooltipFontSize = 10,
// //   tooltipFontWeight = 400,
// //   tooltipBorderRadiusAll = 0, //set radius for all the corner together
// //   //change each corner of the tooltip
// //   tooltipBorderRadiusTopLeft = 0,
// //   tooltipBorderRadiusTopRight = 10,
// //   tooltipBorderRadiusBottomRight = 0,
// //   tooltipBorderRadiusBottomLeft = 10,


// //   //if leave blank, default color will apply
// //   tooltipTextColor = "",
// //   tooltipBgColor = "#808000",

  
// //   // Additional tooltip box size
// //   tooltipWidth = 150,
// //   tooltipHeight = 60,

// //   showTooltipShadow = true, // on/off tooltip shadow

// //   //======Border props for overall chart container
// //   borderWidth = 0, 

// //   borderTop = 10,
// //   borderRight = 0,
// //   borderBottom = 0,
// //   borderLeft = 0,
// //   borderColor = "red",
// //   borderStyle = "solid",
// //   borderRadiusAll = 0, //set radius for all the corners together

// //   //change each corner of the container
// //   borderRadiusTopLeft = 50,
// //   borderRadiusTopRight = 0,
// //   borderRadiusBottomRight = 90,
// //   borderRadiusBottomLeft = 0,
// // }) {
// //   const [hoveredPoint, setHoveredPoint] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const containerRef = useRef(null);
// //   const timeoutRef = useRef(null);

// //   if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

// //   const values = data.map((d) => d.value);
// //   const minValue = Math.min(...values);
// //   const maxValue = Math.max(...values);

// //   const getColor = (value) => {
// //     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
// //     const intensity = (value - minValue) / (maxValue - minValue);
// //     const lightness = 85 - intensity * 25;
// //     return `hsl(210, 100%, ${lightness}%)`;
// //   };

// //   const total = data.reduce((sum, d) => sum + d.value, 0);
// //   if (total === 0) return <div className="text-red-500">No data</div>;

// //   const numericalWidth = parseSize(width);
// //   const numericalHeight = parseSize(height);
// //   const centerX = numericalWidth / 2;
// //   const centerY = numericalHeight / 2;
// //   const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
// //   const innerRadius = type === "ring" ? radius * 0.5 : 0;
// //   const textRadius = Math.max(innerRadius, radius * 0.55);

// //   // Compute full slices
// //   let fullCumulative = 0;
// //   const fullSlices = data.map((d) => {
// //     const fullAngle = (d.value / total) * 360;
// //     const startAngle = fullCumulative;
// //     const endAngle = fullCumulative + fullAngle;
// //     const midAngle = (startAngle + endAngle) / 2;
// //     fullCumulative += fullAngle;
// //     const percent = ((d.value / total) * 100).toFixed(1);
// //     const color = getColor(d.value);
// //     return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
// //   });

// //   // Compute display slices with animation
// //   const displaySlices = fullSlices.map((slice) => ({
// //     ...slice,
// //     startAngle: slice.startAngle * progress,
// //     endAngle: slice.endAngle * progress,
// //     midAngle: slice.midAngle * progress,
// //     angle: slice.angle * progress,
// //   }));

// //   const getPath = (start, end, outerR = radius, innerR = 0) => {
// //     const sa = (start - 90) * (Math.PI / 180);
// //     const ea = (end - 90) * (Math.PI / 180);

// //     if (innerR === 0) {
// //       // Pie slice
// //       const x1 = centerX + outerR * Math.cos(sa);
// //       const y1 = centerY + outerR * Math.sin(sa);
// //       const x2 = centerX + outerR * Math.cos(ea);
// //       const y2 = centerY + outerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
// //     } else {
// //       // Ring sector
// //       const x1o = centerX + outerR * Math.cos(sa);
// //       const y1o = centerY + outerR * Math.sin(sa);
// //       const x2o = centerX + outerR * Math.cos(ea);
// //       const y2o = centerY + outerR * Math.sin(ea);
// //       const x1i = centerX + innerR * Math.cos(sa);
// //       const y1i = centerY + innerR * Math.sin(sa);
// //       const x2i = centerX + innerR * Math.cos(ea);
// //       const y2i = centerY + innerR * Math.sin(ea);
// //       const large = end - start > 180 ? 1 : 0;
// //       return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
// //     }
// //   };

// //   const handleMouseEnter = (displaySlice) => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //     const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
// //     setHoveredPoint(fullSlice);
// //   };

// //   const handleMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const handleTooltipMouseEnter = () => {
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null;
// //     }
// //   };

// //   const handleTooltipMouseLeave = () => {
// //     timeoutRef.current = setTimeout(() => {
// //       setHoveredPoint(null);
// //       timeoutRef.current = null;
// //     }, 150);
// //   };

// //   const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
// //     const path = [];
// //     // Top-left corner
// //     path.push(`M ${x + tl} ${y}`);
// //     path.push(`Q ${x} ${y} ${x} ${y + tl}`);
// //     // Left side
// //     path.push(`L ${x} ${y + height - bl}`);
// //     // Bottom-left corner
// //     path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
// //     // Bottom side
// //     path.push(`L ${x + width - br} ${y + height}`);
// //     // Bottom-right corner
// //     path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
// //     // Right side
// //     path.push(`L ${x + width} ${y + tr}`);
// //     // Top-right corner
// //     path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
// //     // Top side
// //     path.push(`L ${x + tl} ${y}`);
// //     path.push('Z');
// //     return path.join(' ');
// //   };

// //   const Legend = () => (
// //     <div className="space-y-4">
// //       {data.map((d, i) => (
// //         <div key={i} className="flex items-center gap-3">
// //           <div
// //             className="w-5 h-5 rounded-full"
// //             style={{ backgroundColor: getColor(d.value) }}
// //           />
// //           <span 
// //             style={{ 
// //               fontSize: `${baseFontSize}px`, 
// //               fontWeight,
// //               color: "#374151" 
// //             }}
// //           >
// //             {d.label}: {d.value}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
// //   const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
// //   const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.disconnect();
// //           setProgress(0);
// //           const duration = 1500;
// //           const start = Date.now();
// //           const animate = () => {
// //             const elapsed = Date.now() - start;
// //             let p = Math.min(elapsed / duration, 1);
// //             p = 1 - Math.pow(1 - p, 3);
// //             setProgress(p);
// //             if (p < 1) requestAnimationFrame(animate);
// //           };
// //           animate();
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (containerRef.current) {
// //       observer.observe(containerRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, [type]);

// //   useEffect(() => {
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current);
// //       }
// //     };
// //   }, []);

// //   const effectiveTooltipTextColor = tooltipTextColor || "white";
// //   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

// //   const effectiveBorderTopWidth = borderTop ?? borderWidth ?? 0;
// //   const effectiveBorderRightWidth = borderRight ?? borderWidth ?? 0;
// //   const effectiveBorderBottomWidth = borderBottom ?? borderWidth ?? 0;
// //   const effectiveBorderLeftWidth = borderLeft ?? borderWidth ?? 0;

// //   const containerBorderStyle = {
// //     borderTopWidth: `${effectiveBorderTopWidth}px`,
// //     borderRightWidth: `${effectiveBorderRightWidth}px`,
// //     borderBottomWidth: `${effectiveBorderBottomWidth}px`,
// //     borderLeftWidth: `${effectiveBorderLeftWidth}px`,
// //     borderColor,
// //     borderStyle,
// //     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
// //     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
// //     borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
// //     borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
// //   };

// //   return (
// //     <ErrorBoundary>
// //       <div 
// //         className={containerClass} 
// //         ref={containerRef}
// //         style={containerBorderStyle}
// //       >
// //         {isLegendFirst && <Legend />}
// //         <svg 
// //           width={numericalWidth} 
// //           height={numericalHeight} 
// //           style={{ 
// //             minWidth, 
// //             maxWidth, 
// //             minHeight, 
// //             maxHeight,
// //             width: typeof width === 'string' ? width : `${width}px`,
// //             height: typeof height === 'string' ? height : `${height}px`
// //           }} 
// //           className="bg-white"
// //         >
// //           <defs>
// //             <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
// //               <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
// //             </filter>
// //           </defs>
          
// //           {displaySlices.map((slice, i) => {
// //             const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
// //             const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //             const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
// //             const dx = Math.cos(midRad) * popDistance;
// //             const dy = Math.sin(midRad) * popDistance;
// //             const originalAngle = fullSlices[i].angle;
// //             const valueTextX = centerX + Math.cos(midRad) * textRadius;
// //             const valueTextY = centerY + Math.sin(midRad) * textRadius;

// //             return (
// //               <g
// //                 key={i}
// //                 transform={`translate(${dx}, ${dy})`}
// //                 style={{ transition: "transform 0.25s ease-out" }}
// //               >
// //                 <path
// //                   d={path}
// //                   fill={slice.color}
// //                   className="cursor-pointer opacity-80 hover:opacity-100"
// //                   onMouseEnter={() => handleMouseEnter(slice)}
// //                   onMouseLeave={handleMouseLeave}
// //                 />
// //                 {originalAngle > 30 && (
// //                   <g>
// //                     <rect
// //                       x={valueTextX - labelBoxXOffset}
// //                       y={valueTextY - labelBoxYOffset}
// //                       width={labelBoxWidth}
// //                       height={labelBoxHeight}
// //                       rx={borderRadiusX}
// //                       ry={borderRadiusY}
// //                       fill={labelBgColor}
// //                     />
// //                     <text
// //                       x={valueTextX}
// //                       y={valueTextY}
// //                       textAnchor="middle"
// //                       dominantBaseline="middle"
// //                       style={{
// //                         fill: labelTextColor,
// //                         fontSize: baseFontSize,
// //                         fontWeight
// //                       }}
// //                     >
// //                       {slice.value}
// //                     </text>
// //                   </g>
// //                 )}
// //               </g>
// //             );
// //           })}

// //           {/* Tooltip */}
// //           {hoveredPoint && showTooltip && (
// //             (() => {
// //               const slice = hoveredPoint;
// //               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
// //               const offset = radius + 50;
// //               let tx = centerX + Math.cos(midRad) * offset;
// //               let ty = centerY + Math.sin(midRad) * offset;

// //               let rectX = tx - tooltipWidth / 2;
// //               let rectY = ty - tooltipHeight / 2;

// //               rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
// //               rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

// //               const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
// //               const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
// //               const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
// //               const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

// //               const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

// //               const labelX = rectX + 25;
// //               const valueX = rectX + 10;
// //               const circleX = rectX + 10;
// //               const circleY = rectY + 18;

// //               return (
// //                 <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
// //                   <path
// //                     d={tooltipPath}
// //                     fill={effectiveTooltipBgColor}
// //                     filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
// //                   />
// //                   <circle
// //                     cx={circleX}
// //                     cy={circleY}
// //                     r={6}
// //                     fill={slice.color}
// //                   />
// //                   <text
// //                     x={labelX}
// //                     y={rectY + 20}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize + 2}
// //                     fontWeight={700}
// //                   >
// //                     {slice.label}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 38}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Value: {slice.value}
// //                   </text>
// //                   <text
// //                     x={valueX}
// //                     y={rectY + 52}
// //                     textAnchor="start"
// //                     fill={effectiveTooltipTextColor}
// //                     fontSize={tooltipFontSize}
// //                     fontWeight={tooltipFontWeight}
// //                   >
// //                     Percentage: {slice.percent}%
// //                   </text>
// //                 </g>
// //               );
// //             })()
// //           )}
// //         </svg>
// //         {!isLegendFirst && showLegend && <Legend />}
// //       </div>
// //     </ErrorBoundary>
// //   );
// // }


// import React, { useState, useEffect, useRef } from "react";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }


//   componentDidCatch(error, errorInfo) {
//     console.error('PieChart Error:', error, errorInfo);
//     // customize error handling, send to logging service
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-red-500 p-4 border border-red-300 rounded">
//           <h2>Something went wrong in the Pie Chart.</h2>
//           <details style={{ whiteSpace: 'pre-wrap' }}>
//             {this.state.error && this.state.error.toString()}
//           </details>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// const parseSize = (size) => {
//   if (typeof size === 'number') return size;
//   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
//   if (!match) return 0;
//   const num = parseFloat(match[1]);
//   const unit = match[2];
//   if (isNaN(num)) return 0;
//   // % and vw would need viewport info which we don't have here
//   return num;
// };

// export default function PieChart({
//   data = [
//     { label: "Sales", value: 35 },
//     { label: "Marketing", value: 20 },
//     { label: "Support", value: 25 },
//     // { label: "Test", value: 10 },

//   ],

//   type = "ring", //if the chart is ring or pie

//   //overall size
//   width = '400px',
//   height = '400px',
//   minWidth = '0px',
//   maxWidth = 'none',
//   minHeight = '100px',
//   maxHeight = 'none',

//   legendPosition = "right", //set position to left, right, top, bottom
//   showLegend = true, //hide legend

  
//   //control label (on chart), color and font for this graph except tooltip.
//   baseFontSize = 10,
//   fontWeight = 500,
//   labelBgColor = "#9caddf",
//   labelTextColor = "#ffffff",

//   // pie label box position adjustment
//   labelBoxWidth = 30,
//   labelBoxHeight = 20,
//   labelBoxXOffset = 15,
//   labelBoxYOffset = 11,
//     //radius for pie box value on the chart.
//     borderRadiusX = 4,
//     borderRadiusY = 4,


//   //==================Tooltip modification ================================
//   showTooltip = true,
  
//   tooltipFontSize = 10,
//   tooltipFontWeight = 400,
//   tooltipBorderRadiusAll = 0, //set radius for all the corner together
//   //change each corner of the tooltip
//   tooltipBorderRadiusTopLeft = 0,
//   tooltipBorderRadiusTopRight = 10,
//   tooltipBorderRadiusBottomRight = 0,
//   tooltipBorderRadiusBottomLeft = 10,


//   //if leave blank, default color will apply
//   tooltipTextColor = "",
//   tooltipBgColor = "#808000",

  
//   // Additional tooltip box size
//   tooltipWidth = 150,
//   tooltipHeight = 60,

//   showTooltipShadow = true, // on/off tooltip shadow

//   //======Border props for overall chart container
//   borderWidth = 0, // uniform border thickness in px (applies to all sides if no individual borders provided)
//   borderTop = 0,
//   borderRight = 0,
//   borderBottom = 0,
//   borderLeft = 0,
//   borderColor = "red",
//   borderStyle = "solid",
//   borderRadiusAll = 0, //set radius for all the corners together

//   //change each corner of the container
//   borderRadiusTopLeft = 50,
//   borderRadiusTopRight = 0,
//   borderRadiusBottomRight = 90,
//   borderRadiusBottomLeft = 0,
// }) {
//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const containerRef = useRef(null);
//   const timeoutRef = useRef(null);

//   if (!data || data.length === 0) return <div className="text-red-500">No data</div>;

//   const values = data.map((d) => d.value);
//   const minValue = Math.min(...values);
//   const maxValue = Math.max(...values);

//   const getColor = (value) => {
//     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
//     const intensity = (value - minValue) / (maxValue - minValue);
//     const lightness = 85 - intensity * 25;
//     return `hsl(210, 100%, ${lightness}%)`;
//   };

//   const total = data.reduce((sum, d) => sum + d.value, 0);
//   if (total === 0) return <div className="text-red-500">No data</div>;

//   const numericalWidth = parseSize(width);
//   const numericalHeight = parseSize(height);
//   const centerX = numericalWidth / 2;
//   const centerY = numericalHeight / 2;
//   const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
//   const innerRadius = type === "ring" ? radius * 0.5 : 0;
//   const textRadius = Math.max(innerRadius, radius * 0.55);

//   // Compute full slices
//   let fullCumulative = 0;
//   const fullSlices = data.map((d) => {
//     const fullAngle = (d.value / total) * 360;
//     const startAngle = fullCumulative;
//     const endAngle = fullCumulative + fullAngle;
//     const midAngle = (startAngle + endAngle) / 2;
//     fullCumulative += fullAngle;
//     const percent = ((d.value / total) * 100).toFixed(1);
//     const color = getColor(d.value);
//     return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
//   });

//   // Compute display slices with animation
//   const displaySlices = fullSlices.map((slice) => ({
//     ...slice,
//     startAngle: slice.startAngle * progress,
//     endAngle: slice.endAngle * progress,
//     midAngle: slice.midAngle * progress,
//     angle: slice.angle * progress,
//   }));

//   const getPath = (start, end, outerR = radius, innerR = 0) => {
//     const sa = (start - 90) * (Math.PI / 180);
//     const ea = (end - 90) * (Math.PI / 180);

//     if (innerR === 0) {
//       // Pie slice
//       const x1 = centerX + outerR * Math.cos(sa);
//       const y1 = centerY + outerR * Math.sin(sa);
//       const x2 = centerX + outerR * Math.cos(ea);
//       const y2 = centerY + outerR * Math.sin(ea);
//       const large = end - start > 180 ? 1 : 0;
//       return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
//     } else {
//       // Ring sector
//       const x1o = centerX + outerR * Math.cos(sa);
//       const y1o = centerY + outerR * Math.sin(sa);
//       const x2o = centerX + outerR * Math.cos(ea);
//       const y2o = centerY + outerR * Math.sin(ea);
//       const x1i = centerX + innerR * Math.cos(sa);
//       const y1i = centerY + innerR * Math.sin(sa);
//       const x2i = centerX + innerR * Math.cos(ea);
//       const y2i = centerY + innerR * Math.sin(ea);
//       const large = end - start > 180 ? 1 : 0;
//       return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
//     }
//   };

//   const handleMouseEnter = (displaySlice) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//     const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
//     setHoveredPoint(fullSlice);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredPoint(null);
//       timeoutRef.current = null;
//     }, 150);
//   };

//   const handleTooltipMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//   };

//   const handleTooltipMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHoveredPoint(null);
//       timeoutRef.current = null;
//     }, 150);
//   };

//   const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
//     const path = [];
//     // Top-left corner
//     path.push(`M ${x + tl} ${y}`);
//     path.push(`Q ${x} ${y} ${x} ${y + tl}`);
//     // Left side
//     path.push(`L ${x} ${y + height - bl}`);
//     // Bottom-left corner
//     path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
//     // Bottom side
//     path.push(`L ${x + width - br} ${y + height}`);
//     // Bottom-right corner
//     path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
//     // Right side
//     path.push(`L ${x + width} ${y + tr}`);
//     // Top-right corner
//     path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
//     // Top side
//     path.push(`L ${x + tl} ${y}`);
//     path.push('Z');
//     return path.join(' ');
//   };

//   const Legend = () => (
//     <div className="space-y-4">
//       {data.map((d, i) => (
//         <div key={i} className="flex items-center gap-3">
//           <div
//             className="w-5 h-5 rounded-full"
//             style={{ backgroundColor: getColor(d.value) }}
//           />
//           <span 
//             style={{ 
//               fontSize: `${baseFontSize}px`, 
//               fontWeight,
//               color: "#374151" 
//             }}
//           >
//             {d.label}: {d.value}
//           </span>
//         </div>
//       ))}
//     </div>
//   );

//   const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
//   const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
//   const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           observer.disconnect();
//           setProgress(0);
//           const duration = 1500;
//           const start = Date.now();
//           const animate = () => {
//             const elapsed = Date.now() - start;
//             let p = Math.min(elapsed / duration, 1);
//             p = 1 - Math.pow(1 - p, 3);
//             setProgress(p);
//             if (p < 1) requestAnimationFrame(animate);
//           };
//           animate();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [type]);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const effectiveTooltipTextColor = tooltipTextColor || "white";
//   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

//   const hasIndividualBorders = [borderTop, borderRight, borderBottom, borderLeft].some(prop => prop !== undefined);
//   const uniformBorderWidth = borderWidth ?? 0;

//   const effectiveBorderTopWidth = hasIndividualBorders ? (borderTop ?? 0) : uniformBorderWidth;
//   const effectiveBorderRightWidth = hasIndividualBorders ? (borderRight ?? 0) : uniformBorderWidth;
//   const effectiveBorderBottomWidth = hasIndividualBorders ? (borderBottom ?? 0) : uniformBorderWidth;
//   const effectiveBorderLeftWidth = hasIndividualBorders ? (borderLeft ?? 0) : uniformBorderWidth;

//   const containerBorderStyle = {
//     borderTopWidth: `${effectiveBorderTopWidth}px`,
//     borderRightWidth: `${effectiveBorderRightWidth}px`,
//     borderBottomWidth: `${effectiveBorderBottomWidth}px`,
//     borderLeftWidth: `${effectiveBorderLeftWidth}px`,
//     borderColor,
//     borderStyle,
//     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
//     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
//     borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
//     borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
//   };

//   return (
//     <ErrorBoundary>
//       <div 
//         className={containerClass} 
//         ref={containerRef}
//         style={containerBorderStyle}
//       >
//         {isLegendFirst && <Legend />}
//         <svg 
//           width={numericalWidth} 
//           height={numericalHeight} 
//           style={{ 
//             minWidth, 
//             maxWidth, 
//             minHeight, 
//             maxHeight,
//             width: typeof width === 'string' ? width : `${width}px`,
//             height: typeof height === 'string' ? height : `${height}px`
//           }} 
//           className="bg-white"
//         >
//           <defs>
//             <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
//               <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
//             </filter>
//           </defs>
          
//           {displaySlices.map((slice, i) => {
//             const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
//             const midRad = (slice.midAngle - 90) * (Math.PI / 180);
//             const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
//             const dx = Math.cos(midRad) * popDistance;
//             const dy = Math.sin(midRad) * popDistance;
//             const originalAngle = fullSlices[i].angle;
//             const valueTextX = centerX + Math.cos(midRad) * textRadius;
//             const valueTextY = centerY + Math.sin(midRad) * textRadius;

//             return (
//               <g
//                 key={i}
//                 transform={`translate(${dx}, ${dy})`}
//                 style={{ transition: "transform 0.25s ease-out" }}
//               >
//                 <path
//                   d={path}
//                   fill={slice.color}
//                   className="cursor-pointer opacity-80 hover:opacity-100"
//                   onMouseEnter={() => handleMouseEnter(slice)}
//                   onMouseLeave={handleMouseLeave}
//                 />
//                 {originalAngle > 30 && (
//                   <g>
//                     <rect
//                       x={valueTextX - labelBoxXOffset}
//                       y={valueTextY - labelBoxYOffset}
//                       width={labelBoxWidth}
//                       height={labelBoxHeight}
//                       rx={borderRadiusX}
//                       ry={borderRadiusY}
//                       fill={labelBgColor}
//                     />
//                     <text
//                       x={valueTextX}
//                       y={valueTextY}
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       style={{
//                         fill: labelTextColor,
//                         fontSize: baseFontSize,
//                         fontWeight
//                       }}
//                     >
//                       {slice.value}
//                     </text>
//                   </g>
//                 )}
//               </g>
//             );
//           })}

//           {/* Tooltip */}
//           {hoveredPoint && showTooltip && (
//             (() => {
//               const slice = hoveredPoint;
//               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
//               const offset = radius + 50;
//               let tx = centerX + Math.cos(midRad) * offset;
//               let ty = centerY + Math.sin(midRad) * offset;

//               let rectX = tx - tooltipWidth / 2;
//               let rectY = ty - tooltipHeight / 2;

//               rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
//               rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

//               const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
//               const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
//               const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
//               const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

//               const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

//               const labelX = rectX + 25;
//               const valueX = rectX + 10;
//               const circleX = rectX + 10;
//               const circleY = rectY + 18;

//               return (
//                 <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
//                   <path
//                     d={tooltipPath}
//                     fill={effectiveTooltipBgColor}
//                     filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
//                   />
//                   <circle
//                     cx={circleX}
//                     cy={circleY}
//                     r={6}
//                     fill={slice.color}
//                   />
//                   <text
//                     x={labelX}
//                     y={rectY + 20}
//                     textAnchor="start"
//                     fill={effectiveTooltipTextColor}
//                     fontSize={tooltipFontSize + 2}
//                     fontWeight={700}
//                   >
//                     {slice.label}
//                   </text>
//                   <text
//                     x={valueX}
//                     y={rectY + 38}
//                     textAnchor="start"
//                     fill={effectiveTooltipTextColor}
//                     fontSize={tooltipFontSize}
//                     fontWeight={tooltipFontWeight}
//                   >
//                     Value: {slice.value}
//                   </text>
//                   <text
//                     x={valueX}
//                     y={rectY + 52}
//                     textAnchor="start"
//                     fill={effectiveTooltipTextColor}
//                     fontSize={tooltipFontSize}
//                     fontWeight={tooltipFontWeight}
//                   >
//                     Percentage: {slice.percent}%
//                   </text>
//                 </g>
//               );
//             })()
//           )}
//         </svg>
//         {!isLegendFirst && showLegend && <Legend />}
//       </div>
//     </ErrorBoundary>
//   );
// }
















// IMPORTANT



import React, { useState, useEffect, useRef } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }


  componentDidCatch(error, errorInfo) {
    console.error('PieChart Error:', error, errorInfo);
    // customize error handling, send to logging service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          <h2>Something went wrong in the Pie Chart.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const parseSize = (size) => {
  if (typeof size === 'number') return size;
  const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = match[2];
  if (isNaN(num)) return 0;
  // % and vw would need viewport info which we don't have here
  return num;
};

export default function PieChart({
  data = {
    title: "De",
    data: [
      { label: "Sales", value: 35 },
      { label: "Marketing", value: 20 },
      { label: "Support", value: 25 },
      // { label: "Test", value: 10 },
    ],
  },

  type = "ring", //if the chart is ring or pie

  //overall size
  width = '400px',
  height = '400px',
  minWidth = '0px',
  maxWidth = 'none',
  minHeight = '100px',
  maxHeight = 'none',

  legendPosition = "top", //set position to left, right, top, bottom
  showLegend = true, //hide legend

  
  //control label (on chart), color and font for this graph except tooltip.
  baseFontSize = 10,
  fontWeight = 600,
  labelBgColor = "#9caddf",
  labelTextColor = "#ffffff",

  // pie label box position adjustment
  labelBoxWidth = 30,
  labelBoxHeight = 20,
  labelBoxXOffset = 15,
  labelBoxYOffset = 11,
    //radius for pie box value on the chart.
    borderRadiusX = 4,
    borderRadiusY = 4,

  // title label box position adjustment
  titleBoxWidth = 120,
  titleBoxHeight = 25,
  titleBoxXOffset = 60,
  titleBoxYOffset = 12.5,


  //==================Tooltip modification ================================
  showTooltip = true,
  
  tooltipFontSize = 10,
  tooltipFontWeight = 400,
  tooltipBorderRadiusAll = 0, //set radius for all the corner together
  //change each corner of the tooltip
  tooltipBorderRadiusTopLeft = 0,
  tooltipBorderRadiusTopRight = 10,
  tooltipBorderRadiusBottomRight = 0,
  tooltipBorderRadiusBottomLeft = 10,


  //if leave blank, default color will apply
  tooltipTextColor = "",
  tooltipBgColor = "#808000",

  
  // Additional tooltip box size
  tooltipWidth = 150,
  tooltipHeight = 60,

  showTooltipShadow = true, // on/off tooltip shadow

  //======Border props for overall chart container
  borderTop = 10,
  borderRight = 10,
  borderBottom = 10,
  borderLeft = 10,
  borderColor = "red",
  borderStyle = "solid",


  borderRadiusAll = 0, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft = 50,
  borderRadiusTopRight = 0,
  borderRadiusBottomRight = 90,
  borderRadiusBottomLeft = 0,

  //======Box Shadow props for overall chart container
  boxShadowColor = "blue",
  boxShadowOffsetX = 0,
  boxShadowOffsetY = 0,
  boxShadowBlurRadius = 10,
  boxShadowSpreadRadius = 0,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  if (!data || !data.data || data.data.length === 0) return <div className="text-red-500">No data</div>;

  const values = data.data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getColor = (value) => {
    if (maxValue === minValue) return "hsl(210, 100%, 75%)";
    const intensity = (value - minValue) / (maxValue - minValue);
    const lightness = 85 - intensity * 25;
    return `hsl(210, 100%, ${lightness}%)`;
  };

  const total = data.data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return <div className="text-red-500">No data</div>;

  const numericalWidth = parseSize(width);
  const numericalHeight = parseSize(height);
  const centerX = numericalWidth / 2;
  const centerY = numericalHeight / 2;
  const radius = Math.min(numericalWidth, numericalHeight) / 2 * 0.75;
  const innerRadius = type === "ring" ? radius * 0.5 : 0;
  const textRadius = Math.max(innerRadius, radius * 0.55);

  // Compute full slices
  let fullCumulative = 0;
  const fullSlices = data.data.map((d) => {
    const fullAngle = (d.value / total) * 360;
    const startAngle = fullCumulative;
    const endAngle = fullCumulative + fullAngle;
    const midAngle = (startAngle + endAngle) / 2;
    fullCumulative += fullAngle;
    const percent = ((d.value / total) * 100).toFixed(1);
    const color = getColor(d.value);
    return { ...d, startAngle, endAngle, midAngle, angle: fullAngle, percent, color };
  });

  // Compute display slices with animation
  const displaySlices = fullSlices.map((slice) => ({
    ...slice,
    startAngle: slice.startAngle * progress,
    endAngle: slice.endAngle * progress,
    midAngle: slice.midAngle * progress,
    angle: slice.angle * progress,
  }));

  const getPath = (start, end, outerR = radius, innerR = 0) => {
    const sa = (start - 90) * (Math.PI / 180);
    const ea = (end - 90) * (Math.PI / 180);

    if (innerR === 0) {
      // Pie slice
      const x1 = centerX + outerR * Math.cos(sa);
      const y1 = centerY + outerR * Math.sin(sa);
      const x2 = centerX + outerR * Math.cos(ea);
      const y2 = centerY + outerR * Math.sin(ea);
      const large = end - start > 180 ? 1 : 0;
      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
    } else {
      // Ring sector
      const x1o = centerX + outerR * Math.cos(sa);
      const y1o = centerY + outerR * Math.sin(sa);
      const x2o = centerX + outerR * Math.cos(ea);
      const y2o = centerY + outerR * Math.sin(ea);
      const x1i = centerX + innerR * Math.cos(sa);
      const y1i = centerY + innerR * Math.sin(sa);
      const x2i = centerX + innerR * Math.cos(ea);
      const y2i = centerY + innerR * Math.sin(ea);
      const large = end - start > 180 ? 1 : 0;
      return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${large} 0 ${x1i} ${y1i} Z`;
    }
  };

  const handleMouseEnter = (displaySlice) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const fullSlice = fullSlices.find((s) => s.label === displaySlice.label);
    setHoveredPoint(fullSlice);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredPoint(null);
      timeoutRef.current = null;
    }, 150);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredPoint(null);
      timeoutRef.current = null;
    }, 150);
  };

  const roundedRectPath = (x, y, width, height, tl, tr, br, bl) => {
    const path = [];
    // Top-left corner
    path.push(`M ${x + tl} ${y}`);
    path.push(`Q ${x} ${y} ${x} ${y + tl}`);
    // Left side
    path.push(`L ${x} ${y + height - bl}`);
    // Bottom-left corner
    path.push(`Q ${x} ${y + height} ${x + bl} ${y + height}`);
    // Bottom side
    path.push(`L ${x + width - br} ${y + height}`);
    // Bottom-right corner
    path.push(`Q ${x + width} ${y + height} ${x + width} ${y + height - br}`);
    // Right side
    path.push(`L ${x + width} ${y + tr}`);
    // Top-right corner
    path.push(`Q ${x + width} ${y} ${x + width - tr} ${y}`);
    // Top side
    path.push(`L ${x + tl} ${y}`);
    path.push('Z');
    return path.join(' ');
  };

  const Legend = () => (
    <div className="space-y-4">
      {data.data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: getColor(d.value) }}
          />
          <span 
            style={{ 
              fontSize: `${baseFontSize}px`, 
              fontWeight,
              color: "#374151" 
            }}
          >
            {d.label}: {d.value}
          </span>
        </div>
      ))}
    </div>
  );

  const isVerticalLayout = showLegend && (legendPosition === 'top' || legendPosition === 'bottom');
  const isLegendFirst = showLegend && (legendPosition === 'top' || legendPosition === 'left');
  const containerClass = `mt-20 flex ${isVerticalLayout ? 'flex-col items-center gap-8' : 'items-center justify-center gap-12'}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setProgress(0);
          const duration = 1500;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            let p = Math.min(elapsed / duration, 1);
            p = 1 - Math.pow(1 - p, 3);
            setProgress(p);
            if (p < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [type]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const effectiveTooltipTextColor = tooltipTextColor || "white";
  const effectiveTooltipBgColor = tooltipBgColor || "#1874da";

  const containerBorderStyle = {
    borderTopWidth: `${borderTop}px`,
    borderRightWidth: `${borderRight}px`,
    borderBottomWidth: `${borderBottom}px`,
    borderLeftWidth: `${borderLeft}px`,
    borderColor,
    borderStyle,
    borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
    borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
    borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
    borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
    boxShadow: `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}`,
  };

  return (
    <ErrorBoundary>
      <div 
        className={containerClass} 
        ref={containerRef}
        style={containerBorderStyle}
      >
        {isLegendFirst && <Legend />}
        <svg 
          width={numericalWidth} 
          height={numericalHeight} 
          style={{ 
            minWidth, 
            maxWidth, 
            minHeight, 
            maxHeight,
            width: typeof width === 'string' ? width : `${width}px`,
            height: typeof height === 'string' ? height : `${height}px`
          }} 
          className="bg-white"
        >
          <defs>
            <filter id="tooltipShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* title for the chart */}

          {data.title && data.title.trim() !== "" && (
            <g>
              <rect
                x={centerX - titleBoxXOffset}
                y={centerY - titleBoxYOffset}
                width={titleBoxWidth}
                height={titleBoxHeight}
                rx={borderRadiusX}
                ry={borderRadiusY}
                fill={labelBgColor}
              />
              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: `${baseFontSize * 1.5}px`,
                  fontWeight: 700,
                  fill: labelTextColor,


                  // display: 'inline-block',
                  // backgroundColor: labelBgColor,
                  // color: labelTextColor,
                  padding: '0.25rem 0.75rem',
                  borderRadius: `${borderRadiusX}px`,
                  lineHeight: 1.2,
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  // maxWidth: '100%',
                }}
              >
                {data.title}
              </text>

              
















              {/* <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: labelBgColor,
                color: labelTextColor,
                padding: '0.25rem 0.75rem',
                borderRadius: `${borderRadiusX}px`,
                fontSize: `${baseFontSize * 1.5}px`,
                fontWeight: 700,
                lineHeight: 1.2,
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                maxWidth: '100%',
              }}
            >
              {data.title}
            </div>
          </div> */}












            </g>
          )}
          
          {displaySlices.map((slice, i) => {
            const path = getPath(slice.startAngle, slice.endAngle, radius, innerRadius);
            const midRad = (slice.midAngle - 90) * (Math.PI / 180);
            const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
            const dx = Math.cos(midRad) * popDistance;
            const dy = Math.sin(midRad) * popDistance;
            const originalAngle = fullSlices[i].angle;
            const valueTextX = centerX + Math.cos(midRad) * textRadius;
            const valueTextY = centerY + Math.sin(midRad) * textRadius;

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
                {/* label for pie/ring */}
                
                {originalAngle > 30 && (
                  <g>
                    <rect
                      x={valueTextX - labelBoxXOffset}
                      y={valueTextY - labelBoxYOffset}
                      width={labelBoxWidth}
                      height={labelBoxHeight}
                      rx={borderRadiusX}
                      ry={borderRadiusY}
                      fill={labelBgColor}
                    />
                    <text
                      x={valueTextX}
                      y={valueTextY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fill: labelTextColor,
                        fontSize: baseFontSize,
                        fontWeight
                      }}
                    >
                      {slice.value}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Tooltip */}
          {hoveredPoint && showTooltip && (
            (() => {
              const slice = hoveredPoint;
              const midRad = (slice.midAngle - 90) * (Math.PI / 180);
              const offset = radius + 50;
              let tx = centerX + Math.cos(midRad) * offset;
              let ty = centerY + Math.sin(midRad) * offset;

              let rectX = tx - tooltipWidth / 2;
              let rectY = ty - tooltipHeight / 2;

              rectX = Math.max(10, Math.min(numericalWidth - tooltipWidth - 10, rectX));
              rectY = Math.max(10, Math.min(numericalHeight - tooltipHeight - 10, rectY));

              const tl = tooltipBorderRadiusTopLeft || tooltipBorderRadiusAll || 0;
              const tr = tooltipBorderRadiusTopRight || tooltipBorderRadiusAll || 0;
              const br = tooltipBorderRadiusBottomRight || tooltipBorderRadiusAll || 0;
              const bl = tooltipBorderRadiusBottomLeft || tooltipBorderRadiusAll || 0;

              const tooltipPath = roundedRectPath(rectX, rectY, tooltipWidth, tooltipHeight, tl, tr, br, bl);

              const labelX = rectX + 25;
              const valueX = rectX + 10;
              const circleX = rectX + 10;
              const circleY = rectY + 18;

              return (
                <g onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave}>
                  <path
                    d={tooltipPath}
                    fill={effectiveTooltipBgColor}
                    filter={showTooltipShadow ? "url(#tooltipShadow)" : ""}
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
                    fill={effectiveTooltipTextColor}
                    fontSize={tooltipFontSize + 2}
                    fontWeight={700}
                  >
                    {slice.label}
                  </text>
                  <text
                    x={valueX}
                    y={rectY + 38}
                    textAnchor="start"
                    fill={effectiveTooltipTextColor}
                    fontSize={tooltipFontSize}
                    fontWeight={tooltipFontWeight}
                  >
                    Value: {slice.value}
                  </text>
                  <text
                    x={valueX}
                    y={rectY + 52}
                    textAnchor="start"
                    fill={effectiveTooltipTextColor}
                    fontSize={tooltipFontSize}
                    fontWeight={tooltipFontWeight}
                  >
                    Percentage: {slice.percent}%
                  </text>
                </g>
              );
            })()
          )}
        </svg>
        {!isLegendFirst && showLegend && <Legend />}
      </div>
    </ErrorBoundary>
  );
}
