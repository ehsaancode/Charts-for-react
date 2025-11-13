// import PropTypes from "prop-types";
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
//     console.error("PieChart Error:", error, errorInfo);
//     // error handling
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-red-500 p-4 border border-red-300 rounded">
//           <h2>Something went wrong in the Pie Chart.</h2>
//           <details style={{ whiteSpace: "pre-wrap" }}>
//             {this.state.error && this.state.error.toString()}
//           </details>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }
// const parseSize = (size) => {
//   if (typeof size === "number") return size;
//   const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
//   if (!match) return 0;
//   const num = parseFloat(match[1]);
//   const unit = match[2];
//   if (isNaN(num)) return 0;
//   // % and vw need viewport info.
//   return num;
// };

// const parseRadius = (val) => {
//   if (val === undefined || val === null) return 0;
//   if (typeof val === "number") return val;
//   if (typeof val === "string") {
//     const num = parseFloat(val);
//     return isNaN(num) ? 0 : num;
//   }
//   return 0;
// };

// const QPieChart = ({
//   data = {
//     title: "Departments",
//     data: [
//       { label: "Sales", value: 35 },
//       { label: "Marketing", value: 20 },
//       { label: "Support", value: 25 },
//       { label: "Test", value: 10 },
//     ],
//   },
//   pieChartType, //if the chart is ring or pie
//   //overall size
//   width = "550px",
//   height = "400px",
//   minWidth = "0px",
//   maxWidth = "none",
//   minHeight = "100px",
//   maxHeight = "none",

//   legendPosition = "Bottom", //set position to Left, Right, Top, Bottom
//   showLegend, //hide legend
//   alignment = "center", // left, center, right, stretch, baseline, auto
//   legendTextColor = "#374151",

//   //control [label] (on chart), color and font for this graph except tooltip.
//   baseFontSize = 10,
//   fontWeight = 600,
//   labelBgColor = "#9caddf",
//   labelTextColor = "#ffffff",

//   //single foreground color
//   foregroundColor = "",

//   //======Linear Gradient Foreground props
//   useLinearGradientForeground = false,
//   gradientColorsForeground = ["red", "white", "green"],
//   gradientAngleForeground = 30,
//   gradientStopsForeground = [0, 50, 100],

//   //======Radial Gradient Foreground
//   useRadialGradientForeground = false,
//   radialGradientColorsForeground = ["red", "pink", "green"],
//   radialGradientStopsForeground = [0, 50, 100],

//   // pie label [box] position adjustment
//   labelBoxWidth = 30,
//   labelBoxHeight = 20,
//   labelBoxXOffset = 15,
//   labelBoxYOffset = 11,
//   //radius for pie [box] value on the chart.
//   borderRadiusX = 4,
//   borderRadiusY = 4,
//   //==================Tooltip modification
//   showTooltip,

//   tooltipFontSize = 10,
//   tooltipFontWeight = 400,
//   pieTooltipborderRadiusType = 0, //set radius for all the corner together
//   //change each corner of the tooltip
//   pieTooltipborderRadiusValueTopLeft = 10,
//   pieTooltipborderRadiusValueTopRight = 10,
//   pieTooltipborderRadiusValueBottomRight = 10,
//   pieTooltipborderRadiusValueBottomLeft = 10,
//   //if leave blank, default color will apply
//   tooltipTextColor,
//   tooltipBgColor,

//   // Additional tooltip box size
//   tooltipWidth = 150,
//   tooltipHeight = 60,
//   showTooltipShadow, // on/off tooltip shadow
//   //======Border props for overall chart container
//   borderTop = 0,
//   borderRight = 0,
//   borderBottom = 0,
//   borderLeft = 0,
//   borderColor,
//   borderStyle, //dotted, dashed, solid
//   //======Border colors for each side
//   borderTopColor,
//   borderRightColor = "",
//   borderBottomColor = "",
//   borderLeftColor = "",
//   borderRadiusAll = 0, //set radius for all the corners together
//   //change each corner of the container
//   borderRadiusTopLeft,
//   borderRadiusTopRight,
//   borderRadiusBottomRight,
//   borderRadiusBottomLeft,
//   //======Box Shadow props for overall chart container
//   boxShadowColor,
//   boxShadowOffsetX,
//   boxShadowOffsetY,
//   boxShadowBlurRadius,
//   boxShadowSpreadRadius,
//   boxShadow = "",
//   textShadow = "",
//   //======Background color inside the border
//   backgroundColor,
//   //======Linear Gradient Background props
//   useLinearGradient = true,
//   gradientColors,
//   gradientAngle = 30,
//   gradientStops = [20, 50, 90],
//   //======Radial Gradient Background props
//   useRadialGradient = false,
//   radialGradientColors,
//   radialGradientStops = [10, 50, 90],
//   //======Padding props for inside the border
//   paddingAll = 0,
//   paddingTop = 0,
//   paddingRight = 0,
//   paddingBottom = 0,
//   paddingLeft = 0,
//   //======Margin props for outside the border
//   marginAll = 0,
//   marginTop = 0,
//   marginRight = 0,
//   marginBottom = 0,
//   marginLeft = 0,

//   //======Background Image props
//   bgUrl,
//   backgroundImageFit = "cover", //none, cover, contain, fill, fit-height, fit-width
//   backgroundSize = "",
//   backgroundImageAlt,
//   seoAlt,
//   backgroundImageTitle,
//   seoTitle,
//   backgroundImageRepeat = "repeat Y", //repeat X, repeat Y, repeat, none

//   tailwindClasses = "",
// }) => {
//   const useTailwind = !!tailwindClasses;

//   // Coerce string values to booleans for toggle props
//   const effectiveShowLegend = showLegend === "true" || showLegend === true;
//   const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
//   const effectiveShowTooltipShadow = showTooltipShadow === "true" || showTooltipShadow === true;

//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [titleSize, setTitleSize] = useState({ width: 0, height: 0 });
//   const [legendSize, setLegendSize] = useState({ width: 0, height: 0 });
//   const containerRef = useRef(null);
//   const titleRef = useRef(null);
//   const legendRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const effectiveLabelTextColor = foregroundColor || labelTextColor;
//   const effectiveLegendTextColor = foregroundColor || legendTextColor;
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
//   const titleStyle = {
//     display: "inline-block",
//     backgroundColor: labelBgColor,
//     color: useGradientForText ? "transparent" : effectiveLabelTextColor,
//     ...(useGradientForText && {
//       backgroundImage: foregroundGradientCSS,
//       WebkitBackgroundClip: "text",
//       backgroundClip: "text",
//     }),
//     padding: "0.25rem 0.75rem",
//     borderRadius: `${borderRadiusX}px`,
//     fontSize: `${baseFontSize * 1.5}px`,
//     fontWeight: 700,
//     lineHeight: 1.2,
//     whiteSpace: "normal",
//     wordWrap: "break-word",
//   };
//   useEffect(() => {
//     if (titleRef.current) {
//       const rect = titleRef.current.getBoundingClientRect();
//       setTitleSize({ width: rect.width, height: rect.height });
//     }
//   }, [
//     data.title,
//     baseFontSize,
//     labelBgColor,
//     effectiveLabelTextColor,
//     borderRadiusX,
//   ]);
//   useEffect(() => {
//     if (effectiveShowLegend && legendRef.current) {
//       // Use setTimeout to ensure the DOM has updated
//       setTimeout(() => {
//         const rect = legendRef.current.getBoundingClientRect();
//         setLegendSize({ width: rect.width, height: rect.height });
//       }, 0);
//     } else {
//       setLegendSize({ width: 0, height: 0 });
//     }
//   }, [effectiveShowLegend, baseFontSize, fontWeight, data.data, legendPosition]);
//   if (!data || !data.data || data.data.length === 0)
//     return <div className="text-red-500">No data</div>;
//   const values = data.data.map((d) => d.value);
//   const minValue = Math.min(...values);
//   const maxValue = Math.max(...values);
//   const getColor = (value) => {
//     if (maxValue === minValue) return "hsl(210, 100%, 75%)";
//     const intensity = (value - minValue) / (maxValue - minValue);
//     const lightness = 85 - intensity * 25;
//     return `hsl(210, 100%, ${lightness}%)`;
//   };
//   const total = data.data.reduce((sum, d) => sum + d.value, 0);
//   if (total === 0) return <div className="text-red-500">No data</div>;
//   const effectiveBorderTop = useTailwind ? 0 : (borderTop || 0);
//   const effectiveBorderRight = useTailwind ? 0 : (borderRight || 0);
//   const effectiveBorderBottom = useTailwind ? 0 : (borderBottom || 0);
//   const effectiveBorderLeft = useTailwind ? 0 : (borderLeft || 0);
//   const effectivePadding = {
//     top: useTailwind ? 0 : (paddingTop || paddingAll || 0),
//     right: useTailwind ? 0 : (paddingRight || paddingAll || 0),
//     bottom: useTailwind ? 0 : (paddingBottom || paddingAll || 0),
//     left: useTailwind ? 0 : (paddingLeft || paddingAll || 0),
//   };
//   const totalWidth = parseSize(width);
//   const totalHeight = parseSize(height);
//   const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
//   const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
//   const totalPaddingHorizontal = effectivePadding.left + effectivePadding.right;
//   const totalPaddingVertical = effectivePadding.top + effectivePadding.bottom;
//   let svgWidth = Math.max(
//     0,
//     totalWidth - totalBorderHorizontal - totalPaddingHorizontal
//   );
//   let svgHeight = Math.max(
//     0,
//     totalHeight - totalBorderVertical - totalPaddingVertical
//   );
//   if (svgWidth <= 0 || svgHeight <= 0)
//     return <div className="text-red-500">Insufficient space</div>;
//   const isVerticalLayout =
//     effectiveShowLegend && (legendPosition === "Top" || legendPosition === "Bottom");
//   let chartWidth = svgWidth;
//   let chartHeight = svgHeight;
//   const svgPadding = 50;
//   const innerWidth = Math.max(0, chartWidth - 2 * svgPadding);
//   const innerHeight = Math.max(0, chartHeight - 2 * svgPadding);
//   if (innerWidth <= 0 || innerHeight <= 0)
//     return <div className="text-red-500">Insufficient space for chart</div>;
//   let adjustedCenterX = innerWidth / 2 + svgPadding;
//   let adjustedCenterY = innerHeight / 2 + svgPadding;
//   if (effectiveShowLegend) {
//     const lh = legendSize.height || (data.data.length * 24);
//     const lw = legendSize.width || 200;
//     const shiftGap = 16;
//     if (isVerticalLayout) {
//       const dimension = lh;
//       if (legendPosition === "Top") {
//         adjustedCenterY += dimension / 2 + shiftGap;
//       } else if (legendPosition === "Bottom") {
//         adjustedCenterY -= dimension / 2 + shiftGap;
//       }
//     } else {
//       const dimension = lw;
//       if (legendPosition === "Left") {
//         adjustedCenterX += dimension / 2 + shiftGap;
//       } else if (legendPosition === "Right") {
//         adjustedCenterX -= dimension / 2 + shiftGap;
//       }
//     }
//   }
//   const radius = (Math.min(innerWidth, innerHeight) / 2) * 0.75;
//   const innerRadius = pieChartType === "Ring" ? radius * 0.5 : 0;
//   const textRadius = Math.max(innerRadius, radius * 0.55);
//   // Compute full slices
//   let fullCumulative = 0;
//   const fullSlices = data.data.map((d) => {
//     const fullAngle = (d.value / total) * 360;
//     const startAngle = fullCumulative;
//     const endAngle = fullCumulative + fullAngle;
//     const midAngle = (startAngle + endAngle) / 2;
//     fullCumulative += fullAngle;
//     const percent = ((d.value / total) * 100).toFixed(1);
//     const color = getColor(d.value);
//     return {
//       ...d,
//       startAngle,
//       endAngle,
//       midAngle,
//       angle: fullAngle,
//       percent,
//       color,
//     };
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
//       const x1 = adjustedCenterX + outerR * Math.cos(sa);
//       const y1 = adjustedCenterY + outerR * Math.sin(sa);
//       const x2 = adjustedCenterX + outerR * Math.cos(ea);
//       const y2 = adjustedCenterY + outerR * Math.sin(ea);
//       const large = end - start > 180 ? 1 : 0;
//       return `M ${adjustedCenterX} ${adjustedCenterY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
//     } else {
//       // Ring sector
//       const x1o = adjustedCenterX + outerR * Math.cos(sa);
//       const y1o = adjustedCenterY + outerR * Math.sin(sa);
//       const x2o = adjustedCenterX + outerR * Math.cos(ea);
//       const y2o = adjustedCenterY + outerR * Math.sin(ea);
//       const x1i = adjustedCenterX + innerR * Math.cos(sa);
//       const y1i = adjustedCenterY + innerR * Math.sin(sa);
//       const x2i = adjustedCenterX + innerR * Math.cos(ea);
//       const y2i = adjustedCenterY + innerR * Math.sin(ea);
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
//     path.push("Z");
//     return path.join(" ");
//   };
//   const legendClassName = isVerticalLayout ? "flex gap-4 justify-center" : "space-y-4";
//   const renderLegendItems = () => (
//     <>
//       {data.data.map((d, i) => (
//         <div key={i} className="flex items-center gap-3">
//           <div
//             className="w-5 h-5 rounded-full flex-shrink-0"
//             style={{ backgroundColor: getColor(d.value) }}
//           />
//           <span
//             style={{
//               fontSize: `${baseFontSize}px`,
//               fontWeight,
//               color: useGradientForText
//                 ? "transparent"
//                 : effectiveLegendTextColor,
//               ...(useGradientForText && {
//                 backgroundImage: foregroundGradientCSS,
//                 WebkitBackgroundClip: "text",
//                 backgroundClip: "text",
//               }),
//             }}
//           >
//             {d.label}: {d.value}
//           </span>
//         </div>
//       ))}
//     </>
//   );
//   const Legend = () => {
//     if (!effectiveShowLegend) return null;
//     let legendStyle = {
//       position: "absolute",
//     };
//     const gapPx = "16px";
//     if (["Top", "Bottom"].includes(legendPosition)) {
//       const posKey = legendPosition.toLowerCase();
//       legendStyle[posKey] = gapPx;
//       legendStyle.left = "50%";
//       legendStyle.transform = "translateX(-50%)";
//     } else {
//       const posKey = legendPosition.toLowerCase();
//       legendStyle[posKey] = gapPx;
//       legendStyle.top = "50%";
//       legendStyle.transform = "translateY(-50%)";
//     }
//     return (
//       <div style={legendStyle} className={legendClassName}>
//         {renderLegendItems()}
//       </div>
//     );
//   };
//   const getJustifyClass = (align) => {
//     switch (align) {
//       case "left":
//         return "justify-start";
//       case "center":
//         return "justify-center";
//       case "right":
//         return "justify-end";
//       case "stretch":
//         return "justify-between";
//       case "baseline":
//         return "justify-start";
//       case "auto":
//         return "justify-center";
//       default:
//         return "justify-center";
//     }
//   };
//   const outerJustifyClass = getJustifyClass(alignment);
//   const outerItemsClass =
//     alignment === "baseline" ? "items-baseline" : "items-center";
//   const containerClass = `flex ${outerItemsClass} ${outerJustifyClass}`;
//   const effectiveMarginTop = useTailwind ? 0 : (marginTop || marginAll || 0);
//   const effectiveMarginRight = useTailwind ? 0 : (marginRight || marginAll || 0);
//   const effectiveMarginBottom = useTailwind ? 0 : (marginBottom || marginAll || 0);
//   const effectiveMarginLeft = useTailwind ? 0 : (marginLeft || marginAll || 0);
//   const outerStyle = useTailwind ? {} : {
//     marginTop: `${effectiveMarginTop}px`,
//     marginRight: `${effectiveMarginRight}px`,
//     marginBottom: `${effectiveMarginBottom}px`,
//     marginLeft: `${effectiveMarginLeft}px`,
//   };
//   const getFallbackBackgroundImage = () => {
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
//     return null;
//   };

//   const fallbackBgImage = getFallbackBackgroundImage();
//   const isFallbackGradient = fallbackBgImage !== null;
//   const fallbackColor = isFallbackGradient
//     ? "transparent"
//     : backgroundColor || "transparent";

//   const effectiveBackgroundImageFit = backgroundImageFit || backgroundSize || "cover";
//   const effectiveBackgroundImageRepeat = backgroundImageRepeat || "repeat X";
//   const effectiveBackgroundImageAlt = backgroundImageAlt || seoAlt || "test img";
//   const effectiveBackgroundImageTitle = backgroundImageTitle || seoTitle || "background image title";

//   const getBackgroundSize = (fit) => {
//     const map = {
//       none: "auto",
//       cover: "cover",
//       contain: "contain",
//       fill: "100% 100%",
//       "fit-height": "auto 100%",
//       "fit-width": "100% auto",
//     };
//     return map[fit] || "auto";
//   };

//   const getBackgroundRepeat = (rep) => {
//     const normalized = rep.toLowerCase().replace(/\s+/g, '');
//     const map = {
//       none: "no-repeat",
//       repeatx: "repeat-x",
//       repeaty: "repeat-y",
//       repeat: "repeat",
//     };
//     return map[normalized] || "no-repeat";
//   };

//   let backgroundImage = "";
//   if (bgUrl) {
//     backgroundImage = `url(${bgUrl})`;
//     if (fallbackBgImage) {
//       backgroundImage += `, ${fallbackBgImage}`;
//     }
//   } else if (fallbackBgImage) {
//     backgroundImage = fallbackBgImage;
//   }

//   const effectiveBackground = backgroundImage || fallbackColor;
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
//   useEffect(() => {
//     if (isVisible) {
//       setProgress(0);
//       const duration = 1500;
//       let startTime = null;
//       const animate = (timestamp) => {
//         if (startTime === null) startTime = timestamp;
//         const elapsed = timestamp - startTime;
//         let p = Math.min(elapsed / duration, 1);
//         p = 1 - Math.pow(1 - p, 3);
//         setProgress(p);
//         if (p < 1) requestAnimationFrame(animate);
//       };
//       requestAnimationFrame(animate);
//     }
//   }, [isVisible]);
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);
//   const effectiveTooltipTextColor = tooltipTextColor || "white";
//   const effectiveTooltipBgColor = tooltipBgColor || "#1874da";
//   const containerWidthStyle =
//     typeof width === "string" ? width : `${totalWidth}px`;
//   const containerHeightStyle =
//     typeof height === "string" ? height : `${totalHeight}px`;

//   const getSizedValue = (value) => {
//     if (value === undefined || value === null) return undefined;
//     if (typeof value === 'number') return `${value}px`;
//     // Preserve strings like "100%", "50vw", "auto", "none"
//     return value.toString();
//   };

//   // Layout styles (sizing, borders, paddings, radii) - skip entirely when using Tailwind
//   const layoutStyles = useTailwind ? {} : {
//     width: containerWidthStyle,
//     height: containerHeightStyle,
//     minWidth: getSizedValue(minWidth),
//     maxWidth: getSizedValue(maxWidth),
//     minHeight: getSizedValue(minHeight),
//     maxHeight: getSizedValue(maxHeight),
//     boxSizing: "border-box",
//     borderTopWidth: `${effectiveBorderTop}px`,
//     borderRightWidth: `${effectiveBorderRight}px`,
//     borderBottomWidth: `${effectiveBorderBottom}px`,
//     borderLeftWidth: `${effectiveBorderLeft}px`,
//     borderTopColor: borderTopColor || borderColor,
//     borderRightColor: borderRightColor || borderColor,
//     borderBottomColor: borderBottomColor || borderColor,
//     borderLeftColor: borderLeftColor || borderColor,
//     borderStyle,
//     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
//     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
//     borderBottomRightRadius: `${
//       borderRadiusBottomRight || borderRadiusAll || 0
//     }px`,
//     borderBottomLeftRadius: `${
//       borderRadiusBottomLeft || borderRadiusAll || 0
//     }px`,
//     paddingTop: `${effectivePadding.top}px`,
//     paddingRight: `${effectivePadding.right}px`,
//     paddingBottom: `${effectivePadding.bottom}px`,
//     paddingLeft: `${effectivePadding.left}px`,
//   };

//   const effectiveBoxShadow = boxShadow ||
//     (boxShadowColor
//       ? `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 0}px ${boxShadowBlurRadius || 0}px ${boxShadowSpreadRadius || 0}px ${boxShadowColor}`
//       : undefined);

//   const borderedContainerStyle = {
//     ...layoutStyles,
//     position: "relative",
//     ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
//     ...(textShadow && { textShadow }),
//     backgroundColor: fallbackColor,
//     ...(backgroundImage && { backgroundImage }),
//     ...(bgUrl && {
//       backgroundRepeat: getBackgroundRepeat(effectiveBackgroundImageRepeat),
//       backgroundSize: getBackgroundSize(effectiveBackgroundImageFit),
//       backgroundPosition: "center center",
//     }),
//     overflow: "hidden",
//   };

//   // SVG responsive handling: use viewBox for scaling when Tailwind is used
//   const isResponsive = useTailwind;
//   const svgAttrs = {
//     width: "100%",
//     height: "100%",
//     viewBox: `0 0 ${chartWidth} ${chartHeight}`,
//   };
//   const svgStyle = {};
//   const svgClassName = "";

//   const innerClassName = tailwindClasses;

//   const LegendHidden = () => {
//     if (!effectiveShowLegend) return null;
//     return (
//       <div
//         ref={legendRef}
//         style={{
//           position: "absolute",
//           left: "-9999px",
//           visibility: "hidden",
//         }}
//         className={legendClassName}
//       >
//         {renderLegendItems()}
//       </div>
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <div className={containerClass} ref={containerRef} style={outerStyle}>
//         <div
//           style={borderedContainerStyle}
//           className={innerClassName}
//           title={effectiveBackgroundImageTitle}
//           aria-label={effectiveBackgroundImageAlt}
//         >
//           <svg
//             className={svgClassName}
//             {...svgAttrs}
//             style={svgStyle}
//           >
//             <defs>
//               <filter
//                 id="tooltipShadow"
//                 x="-40%"
//                 y="-40%"
//                 width="180%"
//                 height="180%"
//               >
//                 <feDropShadow
//                   dx="0"
//                   dy="3"
//                   stdDeviation="4"
//                   floodColor="#000000"
//                   floodOpacity="0.4"
//                 />
//               </filter>
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

//             {displaySlices.map((slice, i) => {
//               const path = getPath(
//                 slice.startAngle,
//                 slice.endAngle,
//                 radius,
//                 innerRadius
//               );
//               const midRad = (slice.midAngle - 90) * (Math.PI / 180);
//               const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
//               const dx = Math.cos(midRad) * popDistance;
//               const dy = Math.sin(midRad) * popDistance;
//               const originalAngle = fullSlices[i].angle;
//               const valueTextX = adjustedCenterX + Math.cos(midRad) * textRadius;
//               const valueTextY = adjustedCenterY + Math.sin(midRad) * textRadius;
//               return (
//                 <g
//                   key={i}
//                   transform={`translate(${dx}, ${dy})`}
//                   style={{ transition: "transform 0.25s ease-out" }}
//                 >
//                   <path
//                     d={path}
//                     fill={slice.color}
//                     className="cursor-pointer opacity-80 hover:opacity-100"
//                     onMouseEnter={() => handleMouseEnter(slice)}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                   {/* label for pie/ring */}

//                   {originalAngle > 30 && (
//                     <g>
//                       <rect
//                         x={valueTextX - labelBoxXOffset}
//                         y={valueTextY - labelBoxYOffset}
//                         width={labelBoxWidth}
//                         height={labelBoxHeight}
//                         rx={borderRadiusX}
//                         ry={borderRadiusY}
//                         fill={labelBgColor}
//                       />
//                       <text
//                         x={valueTextX}
//                         y={valueTextY}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                         style={{
//                           fill: useGradientForText
//                             ? "url(#fgGrad)"
//                             : effectiveLabelTextColor,
//                           fontSize: baseFontSize,
//                           fontWeight,
//                         }}
//                       >
//                         {slice.value}
//                       </text>
//                     </g>
//                   )}
//                 </g>
//               );
//             })}
//             {/* Centered Title */}
//             {data.title && data.title.trim() !== "" && titleSize.width > 0 && (
//               <foreignObject
//                 x={adjustedCenterX - titleSize.width / 2}
//                 y={adjustedCenterY - titleSize.height / 2}
//                 width={titleSize.width}
//                 height={titleSize.height}
//                 style={{ zIndex: 1000 }}
//               >
//                 <div style={titleStyle}>{data.title}</div>
//               </foreignObject>
//             )}
//             {/* Tooltip */}
//             {hoveredPoint &&
//               effectiveShowTooltip &&
//               (() => {
//                 const slice = hoveredPoint;
//                 const midRad = (slice.midAngle - 90) * (Math.PI / 180);
//                 const offset = radius + 50;
//                 let tx = adjustedCenterX + Math.cos(midRad) * offset;
//                 let ty = adjustedCenterY + Math.sin(midRad) * offset;
//                 let rectX = tx - tooltipWidth / 2;
//                 let rectY = ty - tooltipHeight / 2;
//                 rectX = Math.max(
//                   svgPadding + 10,
//                   Math.min(chartWidth - svgPadding - tooltipWidth - 10, rectX)
//                 );
//                 rectY = Math.max(
//                   svgPadding + 10,
//                   Math.min(chartHeight - svgPadding - tooltipHeight - 10, rectY)
//                 );
//                 const tl =
//                   parseRadius(pieTooltipborderRadiusValueTopLeft) ||
//                   parseRadius(pieTooltipborderRadiusType) ||
//                   0;
//                 const tr =
//                   parseRadius(pieTooltipborderRadiusValueTopRight) ||
//                   parseRadius(pieTooltipborderRadiusType) ||
//                   0;
//                 const br =
//                   parseRadius(pieTooltipborderRadiusValueBottomRight) ||
//                   parseRadius(pieTooltipborderRadiusType) ||
//                   0;
//                 const bl =
//                   parseRadius(pieTooltipborderRadiusValueBottomLeft) ||
//                   parseRadius(pieTooltipborderRadiusType) ||
//                   0;
//                 const tooltipPath = roundedRectPath(
//                   rectX,
//                   rectY,
//                   tooltipWidth,
//                   tooltipHeight,
//                   tl,
//                   tr,
//                   br,
//                   bl
//                 );
//                 const labelX = rectX + 25;
//                 const valueX = rectX + 10;
//                 const circleX = rectX + 10;
//                 const circleY = rectY + 18;
//                 return (
//                   <g
//                     onMouseEnter={handleTooltipMouseEnter}
//                     onMouseLeave={handleTooltipMouseLeave}
//                   >
//                     <path
//                       d={tooltipPath}
//                       fill={effectiveTooltipBgColor}
//                       filter={effectiveShowTooltipShadow ? "url(#tooltipShadow)" : ""}
//                     />
//                     <circle
//                       cx={circleX}
//                       cy={circleY}
//                       r={6}
//                       fill={slice.color}
//                     />
//                     <text
//                       x={labelX}
//                       y={rectY + 20}
//                       textAnchor="start"
//                       fill={effectiveTooltipTextColor}
//                       fontSize={tooltipFontSize}
//                       fontWeight={700}
//                     >
//                       {slice.label}
//                     </text>
//                     <text
//                       x={valueX}
//                       y={rectY + 38}
//                       textAnchor="start"
//                       fill={effectiveTooltipTextColor}
//                       fontSize={tooltipFontSize}
//                       fontWeight={tooltipFontWeight}
//                     >
//                       Value: {slice.value}
//                     </text>
//                     <text
//                       x={valueX}
//                       y={rectY + 52}
//                       textAnchor="start"
//                       fill={effectiveTooltipTextColor}
//                       fontSize={tooltipFontSize}
//                       fontWeight={tooltipFontWeight}
//                     >
//                       Percentage: {slice.percent}%
//                     </text>
//                   </g>
//                 );
//               })()}
//           </svg>
//           <Legend />
//         </div>
//       </div>
//       {data.title && data.title.trim() !== "" && (
//         <div
//           ref={titleRef}
//           style={{
//             position: "absolute",
//             left: "-9999px",
//             visibility: "hidden",
//             ...titleStyle,
//           }}
//         >
//           {data.title}
//         </div>
//       )}
//       <LegendHidden />
//     </ErrorBoundary>
//   );
// };

// // PropTypes for type-checking
// QPieChart.propTypes = {
//   data: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         value: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,

//   pieChartType: PropTypes.string,
//   width: PropTypes.string,
//   height: PropTypes.string,
//   minWidth: PropTypes.string,
//   maxWidth: PropTypes.string,
//   minHeight: PropTypes.string,
//   maxHeight: PropTypes.string,
//   legendPosition: PropTypes.string,
//   showLegend: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   alignment: PropTypes.string,
//   legendTextColor: PropTypes.string,
//   baseFontSize: PropTypes.number,
//   fontWeight: PropTypes.number,
//   labelBgColor: PropTypes.string,
//   labelTextColor: PropTypes.string,
//   foregroundColor: PropTypes.string,
//   useLinearGradientForeground: PropTypes.bool,
//   gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   gradientAngleForeground: PropTypes.number,
//   gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   useRadialGradientForeground: PropTypes.bool,
//   radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   labelBoxWidth: PropTypes.number,
//   labelBoxHeight: PropTypes.number,
//   labelBoxXOffset: PropTypes.number,
//   labelBoxYOffset: PropTypes.number,
//   borderRadiusX: PropTypes.number,
//   borderRadiusY: PropTypes.number,
//   showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   tooltipFontSize: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   tooltipFontWeight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   pieTooltipborderRadiusType: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   pieTooltipborderRadiusValueTopLeft: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   pieTooltipborderRadiusValueTopRight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   pieTooltipborderRadiusValueBottomRight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   pieTooltipborderRadiusValueBottomLeft: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
//   tooltipTextColor: PropTypes.string,
//   tooltipBgColor: PropTypes.string,
//   tooltipWidth: PropTypes.number,
//   tooltipHeight: PropTypes.number,
//   showTooltipShadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   borderTop: PropTypes.number,
//   borderRight: PropTypes.number,
//   borderBottom: PropTypes.number,
//   borderLeft: PropTypes.number,
//   borderColor: PropTypes.string,
//   borderStyle: PropTypes.string,
//   borderTopColor: PropTypes.string,
//   borderRightColor: PropTypes.string,
//   borderBottomColor: PropTypes.string,
//   borderLeftColor: PropTypes.string,
//   borderRadiusAll: PropTypes.number,
//   borderRadiusTopLeft: PropTypes.number,
//   borderRadiusTopRight: PropTypes.number,
//   borderRadiusBottomRight: PropTypes.number,
//   borderRadiusBottomLeft: PropTypes.number,
//   boxShadowColor: PropTypes.string,
//   boxShadowOffsetX: PropTypes.number,
//   boxShadowOffsetY: PropTypes.number,
//   boxShadowBlurRadius: PropTypes.number,
//   boxShadowSpreadRadius: PropTypes.number,
//   boxShadow: PropTypes.string,
//   textShadow: PropTypes.string,
//   backgroundColor: PropTypes.string,
//   useLinearGradient: PropTypes.bool,
//   gradientColors: PropTypes.arrayOf(PropTypes.string),
//   gradientAngle: PropTypes.number,
//   gradientStops: PropTypes.arrayOf(PropTypes.number),
//   useRadialGradient: PropTypes.bool,
//   radialGradientColors: PropTypes.arrayOf(PropTypes.string),
//   radialGradientStops: PropTypes.arrayOf(PropTypes.number),
//   paddingAll: PropTypes.number,
//   paddingTop: PropTypes.number,
//   paddingRight: PropTypes.number,
//   paddingBottom: PropTypes.number,
//   paddingLeft: PropTypes.number,
//   marginAll: PropTypes.number,
//   marginTop: PropTypes.number,
//   marginRight: PropTypes.number,
//   marginBottom: PropTypes.number,
//   marginLeft: PropTypes.number,
//   bgUrl: PropTypes.string,
//   backgroundImageFit: PropTypes.string,
//   backgroundSize: PropTypes.string,
//   backgroundImageAlt: PropTypes.string,
//   seoAlt: PropTypes.string,
//   backgroundImageTitle: PropTypes.string,
//   seoTitle: PropTypes.string,
//   backgroundImageRepeat: PropTypes.string,
//   tailwindClasses: PropTypes.string,
// };

// export default QPieChart;
// QPieChart.displayName = "QPieChart";




import PropTypes from "prop-types";
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
    console.error("PieChart Error:", error, errorInfo);
    // error handling
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          <h2>Something went wrong in the Pie Chart.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
const parseSize = (size) => {
  if (typeof size === "number") return size;
  const match = size.toString().match(/^([0-9.]+)(px|%|vw)?$/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = match[2];
  if (isNaN(num)) return 0;
  // % and vw need viewport info.
  return num;
};

const parseRadius = (val) => {
  if (val === undefined || val === null) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

const parseLinearGradient = (gradientStr) => {
  if (!gradientStr || !gradientStr.startsWith('linear-gradient')) return null;
  const match = gradientStr.match(/^linear-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
  if (!match) return null;
  let angle = 0;
  const angleStr = match[1].trim();
  const angleMatch = angleStr.match(/^([0-9.-]+)deg$/);
  if (angleMatch) {
    angle = parseFloat(angleMatch[1]);
  }
  let stopsStr = match[2].replace(/\)$/, '').trim();
  // Match color stop pairs
  const stopRegex = /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
  const stopMatches = [];
  let m;
  while ((m = stopRegex.exec(stopsStr)) !== null) {
    stopMatches.push(m[0]);
  }
  if (stopMatches.length === 0) return null;
  const colorStops = [];
  stopMatches.forEach((part) => {
    const percentMatch = part.match(/\s+([0-9.-]+)%?$/);
    let offset = percentMatch ? parseFloat(percentMatch[1]) : null;
    let color = part;
    let index = -1;
    if (percentMatch) {
      index = percentMatch.index;
      color = part.slice(0, index).trim();
    }
    if (offset === null || isNaN(offset)) {
      // Evenly distribute if no explicit stop
      offset = (colorStops.length / (stopMatches.length - 1)) * 100;
    }
    colorStops.push({ color: color.trim(), offset });
  });
  return { angle, colorStops };
};

const QPieChart = ({
  data = {
    title: "Departments",
    data: [
      { label: "Sales", value: 35 },
      { label: "Marketing", value: 20 },
      { label: "Support", value: 25 },
      { label: "Test", value: 10 },
    ],
  },
  pieChartType, //if the chart is ring or pie
  //overall size
  width = "550px",
  height = "400px",
  minWidth = "0px",
  maxWidth = "none",
  minHeight = "100px",
  maxHeight = "none",

  legendPosition = "Bottom", //set position to Left, Right, Top, Bottom
  showLegend, //hide legend
  alignment = "center", // left, center, right, stretch, baseline, auto
  legendTextColor = "#374151",

  //control [label] (on chart), color and font for this graph except tooltip.
  baseFontSize = 10,
  fontWeight = 600,
  labelBgColor = "#9caddf",
  labelTextColor = "#ffffff",

  //single foreground color
  foreground= "",

  //======Linear Gradient Foreground props
  useLinearGradientForeground = false,
  gradientColorsForeground = ["red", "white", "green"],
  gradientAngleForeground = 30,
  gradientStopsForeground = [0, 50, 100],

  //======Radial Gradient Foreground
  useRadialGradientForeground = false,
  radialGradientColorsForeground = ["red", "pink", "green"],
  radialGradientStopsForeground = [0, 50, 100],

  // pie label [box] position adjustment
  labelBoxWidth = 30,
  labelBoxHeight = 20,
  labelBoxXOffset = 15,
  labelBoxYOffset = 11,
  //radius for pie [box] value on the chart.
  borderRadiusX = 4,
  borderRadiusY = 4,
  //==================Tooltip modification
  showTooltip,

  tooltipFontSize = 10,
  tooltipFontWeight = 400,
  pieTooltipborderRadiusType = 0, //set radius for all the corner together
  //change each corner of the tooltip
  pieTooltipborderRadiusValueTopLeft = 10,
  pieTooltipborderRadiusValueTopRight = 10,
  pieTooltipborderRadiusValueBottomRight = 10,
  pieTooltipborderRadiusValueBottomLeft = 10,
  //if leave blank, default color will apply
  tooltipTextColor,
  tooltipBgColor,

  // Additional tooltip box size
  tooltipWidth = 150,
  tooltipHeight = 60,
  showTooltipShadow, // on/off tooltip shadow
  //======Border props for overall chart container
  borderTop = 0,
  borderRight = 0,
  borderBottom = 0,
  borderLeft = 0,
  borderColor,
  borderStyle, //dotted, dashed, solid
  //======Border colors for each side
  borderTopColor,
  borderRightColor = "",
  borderBottomColor = "",
  borderLeftColor = "",
  borderRadiusAll = 0, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft,
  borderRadiusTopRight,
  borderRadiusBottomRight,
  borderRadiusBottomLeft,
  //======Box Shadow props for overall chart container
  boxShadowColor,
  boxShadowOffsetX,
  boxShadowOffsetY,
  boxShadowBlurRadius,
  boxShadowSpreadRadius,
  boxShadow = "",
  textShadow = "",
  //======Background color inside the border
  backgroundColor,
  //======Linear Gradient Background props
  useLinearGradient = true,
  gradientColors,
  gradientAngle = 30,
  gradientStops = [20, 50, 90],
  //======Radial Gradient Background props
  useRadialGradient = false,
  radialGradientColors,
  radialGradientStops = [10, 50, 90],
  //======Padding props for inside the border
  paddingAll = 0,
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  //======Margin props for outside the border
  marginAll = 0,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,

  //======Background Image props
  bgUrl,
  backgroundImageFit = "cover", //none, cover, contain, fill, fit-height, fit-width
  backgroundSize = "",
  backgroundImageAlt,
  seoAlt,
  backgroundImageTitle,
  seoTitle,
  backgroundImageRepeat = "repeat Y", //repeat X, repeat Y, repeat, none

  tailwindClasses = "",
}) => {
  const useTailwind = !!tailwindClasses;

  // Coerce string values to booleans for toggle props
  const effectiveShowLegend = showLegend === "true" || showLegend === true;
  const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
  const effectiveShowTooltipShadow = showTooltipShadow === "true" || showTooltipShadow === true;

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [titleSize, setTitleSize] = useState({ width: 0, height: 0 });
  const [legendSize, setLegendSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const legendRef = useRef(null);
  const timeoutRef = useRef(null);
  const effectiveLabelTextColor = foreground || labelTextColor;
  const effectiveLegendTextColor = foreground || legendTextColor;
  const isForegroundGradient = typeof foreground === 'string' && (foreground.startsWith('linear-gradient(') || foreground.startsWith('radial-gradient('));
  const useGradientForText =
    useLinearGradientForeground || useRadialGradientForeground || isForegroundGradient;
  const getForegroundGradientCSS = () => {
    if (isForegroundGradient) {
      return foreground;
    }
    if (
      useRadialGradientForeground &&
      radialGradientColorsForeground &&
      radialGradientColorsForeground.length > 0
    ) {
      const stops =
        radialGradientStopsForeground.length ===
        radialGradientColorsForeground.length
          ? radialGradientStopsForeground
          : Array.from(
              { length: radialGradientColorsForeground.length },
              (_, i) =>
                Math.round(
                  (i / (radialGradientColorsForeground.length - 1)) * 100
                )
            );
      const colorStops = radialGradientColorsForeground
        .map((color, i) => `${color} ${stops[i]}%`)
        .join(", ");
      return `radial-gradient(circle at center, ${colorStops})`;
    } else if (
      useLinearGradientForeground &&
      gradientColorsForeground &&
      gradientColorsForeground.length > 0
    ) {
      const stops =
        gradientStopsForeground.length === gradientColorsForeground.length
          ? gradientStopsForeground
          : Array.from({ length: gradientColorsForeground.length }, (_, i) =>
              Math.round((i / (gradientColorsForeground.length - 1)) * 100)
            );
      const colorStops = gradientColorsForeground
        .map((color, i) => `${color} ${stops[i]}%`)
        .join(", ");
      return `linear-gradient(${gradientAngleForeground}deg, ${colorStops})`;
    }
    return null;
  };
  const foregroundGradientCSS = useGradientForText
    ? getForegroundGradientCSS()
    : null;
  const titleStyle = {
    display: "inline-block",
    backgroundColor: labelBgColor,
    color: useGradientForText ? "transparent" : effectiveLabelTextColor,
    ...(useGradientForText && {
      backgroundImage: foregroundGradientCSS,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    }),
    padding: "0.25rem 0.75rem",
    borderRadius: `${borderRadiusX}px`,
    fontSize: `${baseFontSize * 1.5}px`,
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "normal",
    wordWrap: "break-word",
  };
  useEffect(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setTitleSize({ width: rect.width, height: rect.height });
    }
  }, [
    data.title,
    baseFontSize,
    labelBgColor,
    effectiveLabelTextColor,
    borderRadiusX,
  ]);
  useEffect(() => {
    if (effectiveShowLegend && legendRef.current) {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        const rect = legendRef.current.getBoundingClientRect();
        setLegendSize({ width: rect.width, height: rect.height });
      }, 0);
    } else {
      setLegendSize({ width: 0, height: 0 });
    }
  }, [effectiveShowLegend, baseFontSize, fontWeight, data.data, legendPosition]);
  if (!data || !data.data || data.data.length === 0)
    return <div className="text-red-500">No data</div>;
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
  const effectiveBorderTop = useTailwind ? 0 : (borderTop || 0);
  const effectiveBorderRight = useTailwind ? 0 : (borderRight || 0);
  const effectiveBorderBottom = useTailwind ? 0 : (borderBottom || 0);
  const effectiveBorderLeft = useTailwind ? 0 : (borderLeft || 0);
  const effectivePadding = {
    top: useTailwind ? 0 : (paddingTop || paddingAll || 0),
    right: useTailwind ? 0 : (paddingRight || paddingAll || 0),
    bottom: useTailwind ? 0 : (paddingBottom || paddingAll || 0),
    left: useTailwind ? 0 : (paddingLeft || paddingAll || 0),
  };
  const totalWidth = parseSize(width);
  const totalHeight = parseSize(height);
  const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
  const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
  const totalPaddingHorizontal = effectivePadding.left + effectivePadding.right;
  const totalPaddingVertical = effectivePadding.top + effectivePadding.bottom;
  let svgWidth = Math.max(
    0,
    totalWidth - totalBorderHorizontal - totalPaddingHorizontal
  );
  let svgHeight = Math.max(
    0,
    totalHeight - totalBorderVertical - totalPaddingVertical
  );
  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;
  const isVerticalLayout =
    effectiveShowLegend && (legendPosition === "Top" || legendPosition === "Bottom");
  let chartWidth = svgWidth;
  let chartHeight = svgHeight;
  const svgPadding = 50;
  const innerWidth = Math.max(0, chartWidth - 2 * svgPadding);
  const innerHeight = Math.max(0, chartHeight - 2 * svgPadding);
  if (innerWidth <= 0 || innerHeight <= 0)
    return <div className="text-red-500">Insufficient space for chart</div>;
  let adjustedCenterX = innerWidth / 2 + svgPadding;
  let adjustedCenterY = innerHeight / 2 + svgPadding;
  if (effectiveShowLegend) {
    const lh = legendSize.height || (data.data.length * 24);
    const lw = legendSize.width || 200;
    const shiftGap = 16;
    if (isVerticalLayout) {
      const dimension = lh;
      if (legendPosition === "Top") {
        adjustedCenterY += dimension / 2 + shiftGap;
      } else if (legendPosition === "Bottom") {
        adjustedCenterY -= dimension / 2 + shiftGap;
      }
    } else {
      const dimension = lw;
      if (legendPosition === "Left") {
        adjustedCenterX += dimension / 2 + shiftGap;
      } else if (legendPosition === "Right") {
        adjustedCenterX -= dimension / 2 + shiftGap;
      }
    }
  }
  const radius = (Math.min(innerWidth, innerHeight) / 2) * 0.75;
  const innerRadius = pieChartType === "Ring" ? radius * 0.5 : 0;
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
    return {
      ...d,
      startAngle,
      endAngle,
      midAngle,
      angle: fullAngle,
      percent,
      color,
    };
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
      const x1 = adjustedCenterX + outerR * Math.cos(sa);
      const y1 = adjustedCenterY + outerR * Math.sin(sa);
      const x2 = adjustedCenterX + outerR * Math.cos(ea);
      const y2 = adjustedCenterY + outerR * Math.sin(ea);
      const large = end - start > 180 ? 1 : 0;
      return `M ${adjustedCenterX} ${adjustedCenterY} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`;
    } else {
      // Ring sector
      const x1o = adjustedCenterX + outerR * Math.cos(sa);
      const y1o = adjustedCenterY + outerR * Math.sin(sa);
      const x2o = adjustedCenterX + outerR * Math.cos(ea);
      const y2o = adjustedCenterY + outerR * Math.sin(ea);
      const x1i = adjustedCenterX + innerR * Math.cos(sa);
      const y1i = adjustedCenterY + innerR * Math.sin(sa);
      const x2i = adjustedCenterX + innerR * Math.cos(ea);
      const y2i = adjustedCenterY + innerR * Math.sin(ea);
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
    path.push("Z");
    return path.join(" ");
  };
  const legendClassName = isVerticalLayout ? "flex gap-4 justify-center" : "space-y-4";
  const renderLegendItems = () => (
    <>
      {data.data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full flex-shrink-0"
            style={{ backgroundColor: getColor(d.value) }}
          />
          <span
            style={{
              fontSize: `${baseFontSize}px`,
              fontWeight,
              color: useGradientForText
                ? "transparent"
                : effectiveLegendTextColor,
              ...(useGradientForText && {
                backgroundImage: foregroundGradientCSS,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }),
            }}
          >
            {d.label}: {d.value}
          </span>
        </div>
      ))}
    </>
  );
  const Legend = () => {
    if (!effectiveShowLegend) return null;
    let legendStyle = {
      position: "absolute",
    };
    const gapPx = "16px";
    if (["Top", "Bottom"].includes(legendPosition)) {
      const posKey = legendPosition.toLowerCase();
      legendStyle[posKey] = gapPx;
      legendStyle.left = "50%";
      legendStyle.transform = "translateX(-50%)";
    } else {
      const posKey = legendPosition.toLowerCase();
      legendStyle[posKey] = gapPx;
      legendStyle.top = "50%";
      legendStyle.transform = "translateY(-50%)";
    }
    return (
      <div style={legendStyle} className={legendClassName}>
        {renderLegendItems()}
      </div>
    );
  };
  const getJustifyClass = (align) => {
    switch (align) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      case "stretch":
        return "justify-between";
      case "baseline":
        return "justify-start";
      case "auto":
        return "justify-center";
      default:
        return "justify-center";
    }
  };
  const outerJustifyClass = getJustifyClass(alignment);
  const outerItemsClass =
    alignment === "baseline" ? "items-baseline" : "items-center";
  const containerClass = `flex ${outerItemsClass} ${outerJustifyClass}`;
  const effectiveMarginTop = useTailwind ? 0 : (marginTop || marginAll || 0);
  const effectiveMarginRight = useTailwind ? 0 : (marginRight || marginAll || 0);
  const effectiveMarginBottom = useTailwind ? 0 : (marginBottom || marginAll || 0);
  const effectiveMarginLeft = useTailwind ? 0 : (marginLeft || marginAll || 0);
  const outerStyle = useTailwind ? {} : {
    marginTop: `${effectiveMarginTop}px`,
    marginRight: `${effectiveMarginRight}px`,
    marginBottom: `${effectiveMarginBottom}px`,
    marginLeft: `${effectiveMarginLeft}px`,
  };
  const getFallbackBackgroundImage = () => {
    if (
      useRadialGradient &&
      radialGradientColors &&
      radialGradientColors.length > 0
    ) {
      const stops =
        radialGradientStops.length === radialGradientColors.length
          ? radialGradientStops
          : Array.from({ length: radialGradientColors.length }, (_, i) =>
              Math.round((i / (radialGradientColors.length - 1)) * 100)
            );
      const colorStops = radialGradientColors
        .map((color, i) => `${color} ${stops[i]}%`)
        .join(", ");
      return `radial-gradient(circle at center, ${colorStops})`;
    } else if (
      useLinearGradient &&
      gradientColors &&
      gradientColors.length > 0
    ) {
      const stops =
        gradientStops.length === gradientColors.length
          ? gradientStops
          : Array.from({ length: gradientColors.length }, (_, i) =>
              Math.round((i / (gradientColors.length - 1)) * 100)
            );
      const colorStops = gradientColors
        .map((color, i) => `${color} ${stops[i]}%`)
        .join(", ");
      return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
    }
    return null;
  };

  const fallbackBgImage = getFallbackBackgroundImage();
  const isFallbackGradient = fallbackBgImage !== null;
  const fallbackColor = isFallbackGradient
    ? "transparent"
    : backgroundColor || "transparent";

  const effectiveBackgroundImageFit = backgroundImageFit || backgroundSize || "cover";
  const effectiveBackgroundImageRepeat = backgroundImageRepeat || "repeat X";
  const effectiveBackgroundImageAlt = backgroundImageAlt || seoAlt || "test img";
  const effectiveBackgroundImageTitle = backgroundImageTitle || seoTitle || "background image title";

  const getBackgroundSize = (fit) => {
    const map = {
      none: "auto",
      cover: "cover",
      contain: "contain",
      fill: "100% 100%",
      "fit-height": "auto 100%",
      "fit-width": "100% auto",
    };
    return map[fit] || "auto";
  };

  const getBackgroundRepeat = (rep) => {
    const normalized = rep.toLowerCase().replace(/\s+/g, '');
    const map = {
      none: "no-repeat",
      repeatx: "repeat-x",
      repeaty: "repeat-y",
      repeat: "repeat",
    };
    return map[normalized] || "no-repeat";
  };

  let backgroundImage = "";
  if (bgUrl) {
    backgroundImage = `url(${bgUrl})`;
    if (fallbackBgImage) {
      backgroundImage += `, ${fallbackBgImage}`;
    }
  } else if (fallbackBgImage) {
    backgroundImage = fallbackBgImage;
  }

  const effectiveBackground = backgroundImage || fallbackColor;
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
  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      const duration = 1500;
      let startTime = null;
      const animate = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        let p = Math.min(elapsed / duration, 1);
        p = 1 - Math.pow(1 - p, 3);
        setProgress(p);
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const effectiveTooltipTextColor = tooltipTextColor || "white";
  const effectiveTooltipBgColor = tooltipBgColor || "#1874da";
  const containerWidthStyle =
    typeof width === "string" ? width : `${totalWidth}px`;
  const containerHeightStyle =
    typeof height === "string" ? height : `${totalHeight}px`;

  const getSizedValue = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value}px`;
    // Preserve strings like "100%", "50vw", "auto", "none"
    return value.toString();
  };

  // Layout styles (sizing, borders, paddings, radii) - skip entirely when using Tailwind
  const layoutStyles = useTailwind ? {} : {
    width: containerWidthStyle,
    height: containerHeightStyle,
    minWidth: getSizedValue(minWidth),
    maxWidth: getSizedValue(maxWidth),
    minHeight: getSizedValue(minHeight),
    maxHeight: getSizedValue(maxHeight),
    boxSizing: "border-box",
    borderTopWidth: `${effectiveBorderTop}px`,
    borderRightWidth: `${effectiveBorderRight}px`,
    borderBottomWidth: `${effectiveBorderBottom}px`,
    borderLeftWidth: `${effectiveBorderLeft}px`,
    borderTopColor: borderTopColor || borderColor,
    borderRightColor: borderRightColor || borderColor,
    borderBottomColor: borderBottomColor || borderColor,
    borderLeftColor: borderLeftColor || borderColor,
    borderStyle,
    borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
    borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
    borderBottomRightRadius: `${
      borderRadiusBottomRight || borderRadiusAll || 0
    }px`,
    borderBottomLeftRadius: `${
      borderRadiusBottomLeft || borderRadiusAll || 0
    }px`,
    paddingTop: `${effectivePadding.top}px`,
    paddingRight: `${effectivePadding.right}px`,
    paddingBottom: `${effectivePadding.bottom}px`,
    paddingLeft: `${effectivePadding.left}px`,
  };

  const effectiveBoxShadow = boxShadow ||
    (boxShadowColor
      ? `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 0}px ${boxShadowBlurRadius || 0}px ${boxShadowSpreadRadius || 0}px ${boxShadowColor}`
      : undefined);

  const borderedContainerStyle = {
    ...layoutStyles,
    position: "relative",
    ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
    ...(textShadow && { textShadow }),
    backgroundColor: fallbackColor,
    ...(backgroundImage && { backgroundImage }),
    ...(bgUrl && {
      backgroundRepeat: getBackgroundRepeat(effectiveBackgroundImageRepeat),
      backgroundSize: getBackgroundSize(effectiveBackgroundImageFit),
      backgroundPosition: "center center",
    }),
    overflow: "hidden",
  };

  // SVG responsive handling: use viewBox for scaling when Tailwind is used
  const isResponsive = useTailwind;
  const svgAttrs = {
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${chartWidth} ${chartHeight}`,
  };
  const svgStyle = {};
  const svgClassName = "";

  const innerClassName = tailwindClasses;

  const LegendHidden = () => {
    if (!effectiveShowLegend) return null;
    return (
      <div
        ref={legendRef}
        style={{
          position: "absolute",
          left: "-9999px",
          visibility: "hidden",
        }}
        className={legendClassName}
      >
        {renderLegendItems()}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className={containerClass} ref={containerRef} style={outerStyle}>
        <div
          style={borderedContainerStyle}
          className={innerClassName}
          title={effectiveBackgroundImageTitle}
          aria-label={effectiveBackgroundImageAlt}
        >
          <svg
            className={svgClassName}
            {...svgAttrs}
            style={svgStyle}
          >
            <defs>
              <filter
                id="tooltipShadow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="4"
                  floodColor="#000000"
                  floodOpacity="0.4"
                />
              </filter>
              {useGradientForText && (
                <>
                  {isForegroundGradient && foreground.startsWith('linear-gradient') ? (
                    (() => {
                      const parsed = parseLinearGradient(foreground);
                      if (!parsed) return null;
                      return (
                        <linearGradient
                          id="fgGrad"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                          gradientUnits="objectBoundingBox"
                          gradientTransform={`rotate(${parsed.angle}, 0.5, 0.5)`}
                        >
                          {parsed.colorStops.map((stop, i) => (
                            <stop
                              key={i}
                              offset={`${stop.offset}%`}
                              stopColor={stop.color}
                            />
                          ))}
                        </linearGradient>
                      );
                    })()
                  ) : useRadialGradientForeground ? (
                    <radialGradient
                      id="fgGrad"
                      cx="0.5"
                      cy="0.5"
                      r="0.5"
                      gradientUnits="objectBoundingBox"
                    >
                      {(() => {
                        const colors = radialGradientColorsForeground;
                        const stopsArr =
                          radialGradientStopsForeground.length === colors.length
                            ? radialGradientStopsForeground
                            : Array.from({ length: colors.length }, (_, i) =>
                                Math.round((i / (colors.length - 1)) * 100)
                              );
                        return colors.map((color, i) => (
                          <stop
                            key={i}
                            offset={`${stopsArr[i]}%`}
                            stopColor={color}
                          />
                        ));
                      })()}
                    </radialGradient>
                  ) : (
                    <linearGradient
                      id="fgGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                      gradientUnits="objectBoundingBox"
                      gradientTransform={`rotate(${gradientAngleForeground}, 0.5, 0.5)`}
                    >
                      {(() => {
                        const colors = gradientColorsForeground;
                        const stopsArr =
                          gradientStopsForeground.length === colors.length
                            ? gradientStopsForeground
                            : Array.from({ length: colors.length }, (_, i) =>
                                Math.round((i / (colors.length - 1)) * 100)
                              );
                        return colors.map((color, i) => (
                          <stop
                            key={i}
                            offset={`${stopsArr[i]}%`}
                            stopColor={color}
                          />
                        ));
                      })()}
                    </linearGradient>
                  )}
                </>
              )}
            </defs>

            {displaySlices.map((slice, i) => {
              const path = getPath(
                slice.startAngle,
                slice.endAngle,
                radius,
                innerRadius
              );
              const midRad = (slice.midAngle - 90) * (Math.PI / 180);
              const popDistance = hoveredPoint?.label === slice.label ? 18 : 0;
              const dx = Math.cos(midRad) * popDistance;
              const dy = Math.sin(midRad) * popDistance;
              const originalAngle = fullSlices[i].angle;
              const valueTextX = adjustedCenterX + Math.cos(midRad) * textRadius;
              const valueTextY = adjustedCenterY + Math.sin(midRad) * textRadius;
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
                          fill: useGradientForText
                            ? "url(#fgGrad)"
                            : effectiveLabelTextColor,
                          fontSize: baseFontSize,
                          fontWeight,
                        }}
                      >
                        {slice.value}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            {/* Centered Title */}
            {data.title && data.title.trim() !== "" && titleSize.width > 0 && (
              <foreignObject
                x={adjustedCenterX - titleSize.width / 2}
                y={adjustedCenterY - titleSize.height / 2}
                width={titleSize.width}
                height={titleSize.height}
                style={{ zIndex: 1000 }}
              >
                <div style={titleStyle}>{data.title}</div>
              </foreignObject>
            )}
            {/* Tooltip */}
            {hoveredPoint &&
              effectiveShowTooltip &&
              (() => {
                const slice = hoveredPoint;
                const midRad = (slice.midAngle - 90) * (Math.PI / 180);
                const offset = radius + 50;
                let tx = adjustedCenterX + Math.cos(midRad) * offset;
                let ty = adjustedCenterY + Math.sin(midRad) * offset;
                let rectX = tx - tooltipWidth / 2;
                let rectY = ty - tooltipHeight / 2;
                rectX = Math.max(
                  svgPadding + 10,
                  Math.min(chartWidth - svgPadding - tooltipWidth - 10, rectX)
                );
                rectY = Math.max(
                  svgPadding + 10,
                  Math.min(chartHeight - svgPadding - tooltipHeight - 10, rectY)
                );
                const tl =
                  parseRadius(pieTooltipborderRadiusValueTopLeft) ||
                  parseRadius(pieTooltipborderRadiusType) ||
                  0;
                const tr =
                  parseRadius(pieTooltipborderRadiusValueTopRight) ||
                  parseRadius(pieTooltipborderRadiusType) ||
                  0;
                const br =
                  parseRadius(pieTooltipborderRadiusValueBottomRight) ||
                  parseRadius(pieTooltipborderRadiusType) ||
                  0;
                const bl =
                  parseRadius(pieTooltipborderRadiusValueBottomLeft) ||
                  parseRadius(pieTooltipborderRadiusType) ||
                  0;
                const tooltipPath = roundedRectPath(
                  rectX,
                  rectY,
                  tooltipWidth,
                  tooltipHeight,
                  tl,
                  tr,
                  br,
                  bl
                );
                const labelX = rectX + 25;
                const valueX = rectX + 10;
                const circleX = rectX + 10;
                const circleY = rectY + 18;
                return (
                  <g
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <path
                      d={tooltipPath}
                      fill={effectiveTooltipBgColor}
                      filter={effectiveShowTooltipShadow ? "url(#tooltipShadow)" : ""}
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
                      fontSize={tooltipFontSize}
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
              })()}
          </svg>
          <Legend />
        </div>
      </div>
      {data.title && data.title.trim() !== "" && (
        <div
          ref={titleRef}
          style={{
            position: "absolute",
            left: "-9999px",
            visibility: "hidden",
            ...titleStyle,
          }}
        >
          {data.title}
        </div>
      )}
      <LegendHidden />
    </ErrorBoundary>
  );
};

// PropTypes for type-checking
QPieChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,

  pieChartType: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  legendPosition: PropTypes.string,
  showLegend: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  alignment: PropTypes.string,
  legendTextColor: PropTypes.string,
  baseFontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  labelBgColor: PropTypes.string,
  labelTextColor: PropTypes.string,
  foreground: PropTypes.string,
  useLinearGradientForeground: PropTypes.bool,
  gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  gradientAngleForeground: PropTypes.number,
  gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  useRadialGradientForeground: PropTypes.bool,
  radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  labelBoxWidth: PropTypes.number,
  labelBoxHeight: PropTypes.number,
  labelBoxXOffset: PropTypes.number,
  labelBoxYOffset: PropTypes.number,
  borderRadiusX: PropTypes.number,
  borderRadiusY: PropTypes.number,
  showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  tooltipFontSize: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  tooltipFontWeight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  pieTooltipborderRadiusType: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  pieTooltipborderRadiusValueTopLeft: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  pieTooltipborderRadiusValueTopRight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  pieTooltipborderRadiusValueBottomRight: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  pieTooltipborderRadiusValueBottomLeft: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  tooltipTextColor: PropTypes.string,
  tooltipBgColor: PropTypes.string,
  tooltipWidth: PropTypes.number,
  tooltipHeight: PropTypes.number,
  showTooltipShadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  borderTop: PropTypes.number,
  borderRight: PropTypes.number,
  borderBottom: PropTypes.number,
  borderLeft: PropTypes.number,
  borderColor: PropTypes.string,
  borderStyle: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderRightColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderLeftColor: PropTypes.string,
  borderRadiusAll: PropTypes.number,
  borderRadiusTopLeft: PropTypes.number,
  borderRadiusTopRight: PropTypes.number,
  borderRadiusBottomRight: PropTypes.number,
  borderRadiusBottomLeft: PropTypes.number,
  boxShadowColor: PropTypes.string,
  boxShadowOffsetX: PropTypes.number,
  boxShadowOffsetY: PropTypes.number,
  boxShadowBlurRadius: PropTypes.number,
  boxShadowSpreadRadius: PropTypes.number,
  boxShadow: PropTypes.string,
  textShadow: PropTypes.string,
  backgroundColor: PropTypes.string,
  useLinearGradient: PropTypes.bool,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  gradientAngle: PropTypes.number,
  gradientStops: PropTypes.arrayOf(PropTypes.number),
  useRadialGradient: PropTypes.bool,
  radialGradientColors: PropTypes.arrayOf(PropTypes.string),
  radialGradientStops: PropTypes.arrayOf(PropTypes.number),
  paddingAll: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  marginAll: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  bgUrl: PropTypes.string,
  backgroundImageFit: PropTypes.string,
  backgroundSize: PropTypes.string,
  backgroundImageAlt: PropTypes.string,
  seoAlt: PropTypes.string,
  backgroundImageTitle: PropTypes.string,
  seoTitle: PropTypes.string,
  backgroundImageRepeat: PropTypes.string,
  tailwindClasses: PropTypes.string,
};

export default QPieChart;
QPieChart.displayName = "QPieChart";