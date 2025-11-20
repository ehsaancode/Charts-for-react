// import PropTypes from "prop-types";
// import React, { useMemo, useState, useRef, useEffect } from "react";

// const parseLinearGradient = (gradientStr) => {
//   if (!gradientStr || !gradientStr.startsWith('linear-gradient')) return null;
//   const match = gradientStr.match(/^linear-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
//   if (!match) return null;
//   let angle = 0;
//   const angleStr = match[1].trim();
//   const angleMatch = angleStr.match(/^([0-9.-]+)deg$/);
//   if (angleMatch) {
//     angle = parseFloat(angleMatch[1]);
//   }
//   let stopsStr = match[2].replace(/\)$/, '').trim();
//   // Match color stop pairs
//   const stopRegex = /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
//   const stopMatches = [];
//   let m;
//   while ((m = stopRegex.exec(stopsStr)) !== null) {
//     stopMatches.push(m[0]);
//   }
//   if (stopMatches.length === 0) return null;
//   const colorStops = [];
//   stopMatches.forEach((part) => {
//     const percentMatch = part.match(/\s+([0-9.-]+)%?$/);
//     let offset = percentMatch ? parseFloat(percentMatch[1]) : null;
//     let color = part;
//     let index = -1;
//     if (percentMatch) {
//       index = percentMatch.index;
//       color = part.slice(0, index).trim();
//     }
//     if (offset === null || isNaN(offset)) {
//       // Evenly distribute if no explicit stop
//       offset = (colorStops.length / (stopMatches.length - 1)) * 100;
//     }
//     colorStops.push({ color: color.trim(), offset });
//   });
//   return { angle, colorStops };
// };

// const parseRadialGradient = (gradientStr) => {
//   if (!gradientStr || !gradientStr.startsWith('radial-gradient')) return null;
//   const match = gradientStr.match(/^radial-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
//   if (!match) return null;
//   const shapeStr = match[1].trim(); //"circle at center"
//   let stopsStr = match[2].replace(/\)$/, '').trim();
//   // Match color stop pairs
//   const stopRegex = /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
//   const stopMatches = [];
//   let m;
//   while ((m = stopRegex.exec(stopsStr)) !== null) {
//     stopMatches.push(m[0]);
//   }
//   if (stopMatches.length === 0) return null;
//   const colorStops = [];
//   stopMatches.forEach((part) => {
//     const percentMatch = part.match(/\s+([0-9.-]+)%?$/);
//     let offset = percentMatch ? parseFloat(percentMatch[1]) : null;
//     let color = part;
//     let index = -1;
//     if (percentMatch) {
//       index = percentMatch.index;
//       color = part.slice(0, index).trim();
//     }
//     if (offset === null || isNaN(offset)) {
//       // Evenly distribute if no explicit stop
//       offset = (colorStops.length / (stopMatches.length - 1)) * 100;
//     }
//     colorStops.push({ color: color.trim(), offset });
//   });
//   return { shape: shapeStr, colorStops };
// };

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
 
// const QColumnChart = ({
//   data = {
//     title: "Sales",
//     data: [
//       { x: "January", y: 76 },
//       { x: "February", y: 82 },
//       { x: "March", y: 69 },
//       { x: "April", y: 58 },
//       { x: "May", y: 87 },
//     ],
//   },
//   width = 560,
//   height = 400,
//   yMin = 50,
//   yMax = 100,

//   minWidth = undefined,
//   maxWidth = undefined,
//   minHeight = undefined,
//   maxHeight = undefined,

//   showLegend,// toggle the legend
//   showTooltip = true,

//   xAxisGridLines = true, // show/hide grid in X axis
//   yAxisGridLines = true, // show/hide grid in Y axis

//   xAxisLineWidth = "1", 
//   yAxisLineWidth = "1",
//   gridLineXColor = "#00FFFF",
//   gridLineYColor = "#808080",

//   //show and hide X and Y label
//   showXlabel = true,
//   showYlabel = true,

//   //Border props for overall chart container
//   borderAll = 0,
//   borderTop = 0,
//   borderRight = 0,
//   borderBottom = 0,
//   borderLeft = 0,
//   borderColor = "#000000",
//   borderStyle = "solid", //none, solid, dashed, dotted

//   //Border colors for each side
//   borderTopColor = "",
//   borderRightColor = "",
//   borderBottomColor = "",
//   borderLeftColor = "",
//   borderRadiusAll = 20, //set radius for all the corners together
//   //change each corner of the container
//   borderRadiusTopLeft = 0,
//   borderRadiusTopRight = 0,
//   borderRadiusBottomRight = 0,
//   borderRadiusBottomLeft = 0,

//   //Box Shadow props for overall chart container
//   boxShadow = "",

//   //Padding props for inside the border
//   paddingAll = 20,
//   paddingTop = 0,
//   paddingRight = 0,
//   paddingBottom = 0,
//   paddingLeft = 0,

//   //Margin props for outside the border
//   marginAll = 10,
//   marginTop = 0,
//   marginRight = 0,
//   marginBottom = 50,
//   marginLeft = 0,

//   //Background color inside the border
//   bgColor = "#ffffff",

//   //======Background Image props
//   bgUrl,
//   backgroundImageFit = "cover", //none, cover, contain, fill, fit-height, fit-width
//   seoAlt = "img",
//   seoTitle = "background image legend",
//   backgroundImageRepeat = "repeat X", //repeat X, repeat Y, repeat, none

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
//   foreground = "",

//   // chart alignment
//   childAlign, // left, center, right, stretch, baseline, auto

//   legendBoxBackgroundColor = "white",

//   tailwindClasses = "",

//   // Column specific
//   barSpacing = 16, // spacing between bars
//   barRadius = 5, // rx for bars
//   animationDelay = 150, // ms between bar animations
//   animationDuration = 0.6, // seconds for transition
// }) => {
//   const useTailwind = !!tailwindClasses;

//   // Coerce string values to booleans for toggle props
//   const effectiveShowLegend = showLegend === "true" || showLegend === true;
//   const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
//   const effectiveShowXGrid = xAxisGridLines === "true" || xAxisGridLines === true;
//   const effectiveShowYGrid = yAxisGridLines === "true" || yAxisGridLines === true;
//   const effectiveShowXlabel = showXlabel === "true" || showXlabel === true;
//   const effectiveShowYlabel = showYlabel === "true" || showYlabel === true;
//   const effectiveUseLinearGradientForeground = useLinearGradientForeground === "true" || useLinearGradientForeground === true;
//   const effectiveUseRadialGradientForeground = useRadialGradientForeground === "true" || useRadialGradientForeground === true;

//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [animatedHeights, setAnimatedHeights] = useState(Array(data.data.length).fill(0));
//   const containerRef = useRef(null);

//   //foreground
//   const effectiveForegroundColor = foreground || "#374151";
//   const isForegroundGradient = typeof foreground === 'string' && (foreground.startsWith('linear-gradient(') || foreground.startsWith('radial-gradient('));
//   const useGradientForText =
//     effectiveUseLinearGradientForeground || effectiveUseRadialGradientForeground || isForegroundGradient;
//   const getForegroundGradientCSS = () => {
//     if (isForegroundGradient) {
//       return foreground;
//     }
//     if (
//       effectiveUseRadialGradientForeground &&
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
//       effectiveUseLinearGradientForeground &&
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
//     const map = {
//       none: "no-repeat",
//       "repeat X": "repeat-x",
//       "repeat Y": "repeat-y",
//       repeat: "repeat",
//     };
//     return map[rep] || "no-repeat";
//   };

//   const effectiveBgColor = bgColor || "#ffffff";
//   const isGradient = effectiveBgColor.startsWith('linear-gradient(') || effectiveBgColor.startsWith('radial-gradient(');
//   let bgStyle = {};
//   if (isGradient) {
//     let bgImage = effectiveBgColor;
//     if (bgUrl) {
//       bgImage = `url(${bgUrl}), ${effectiveBgColor}`;
//     }
//     bgStyle = {
//       backgroundImage: bgImage,
//       backgroundColor: 'transparent',
//       ...(bgUrl && {
//         backgroundRepeat: getBackgroundRepeat(backgroundImageRepeat),
//         backgroundSize: getBackgroundSize(backgroundImageFit),
//         backgroundPosition: "center center",
//       }),
//     };
//   } else {
//     bgStyle = {
//       backgroundColor: effectiveBgColor,
//     };
//     if (bgUrl) {
//       bgStyle.backgroundImage = `url(${bgUrl})`;
//       bgStyle.backgroundRepeat = getBackgroundRepeat(backgroundImageRepeat);
//       bgStyle.backgroundSize = getBackgroundSize(backgroundImageFit);
//       bgStyle.backgroundPosition= "center center"
//     }
//   }

//   if (!data || !data.data || data.data.length === 0)
//     return <div className="text-red-500">No data</div>;

//   const effectiveBorderTop = useTailwind ? 0 : (borderTop || borderAll || 0);
//   const effectiveBorderRight = useTailwind ? 0 : (borderRight || borderAll || 0);
//   const effectiveBorderBottom = useTailwind ? 0 : (borderBottom || borderAll || 0);
//   const effectiveBorderLeft = useTailwind ? 0 : (borderLeft || borderAll || 0);

//   let effectivePaddingTop = useTailwind ? 0 : (paddingTop || paddingAll || 0);
//   let effectivePaddingRight = useTailwind ? 0 : (paddingRight || paddingAll || 0);
//   let effectivePaddingBottom = useTailwind ? 0 : (paddingBottom || paddingAll || 0);
//   let effectivePaddingLeft = useTailwind ? 0 : (paddingLeft || paddingAll || 0);

//   // Adjust padding to at least match border thickness to prevent overlap
//   effectivePaddingTop = Math.max(effectivePaddingTop, effectiveBorderTop);
//   effectivePaddingRight = Math.max(effectivePaddingRight, effectiveBorderRight);
//   effectivePaddingBottom = Math.max(effectivePaddingBottom, effectiveBorderBottom);
//   effectivePaddingLeft = Math.max(effectivePaddingLeft, effectiveBorderLeft);

//   const effectiveMarginTop = useTailwind ? 0 : (marginTop || marginAll || 0);
//   const effectiveMarginRight = useTailwind ? 0 : (marginRight || marginAll || 0);
//   const effectiveMarginBottom = useTailwind ? 0 : (marginBottom || marginAll || 0);
//   const effectiveMarginLeft = useTailwind ? 0 : (marginLeft || marginAll || 0);

//   const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
//   const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
//   const totalPaddingHorizontal = effectivePaddingLeft + effectivePaddingRight;
//   const totalPaddingVertical = effectivePaddingTop + effectivePaddingBottom;
//   const titleSpace = 0;
//   const legendSpace = effectiveShowLegend ? 80 : 0;
//   const totalWidth = parseSize(width);
//   const totalHeight = parseSize(height);
//   const svgWidth = Math.max(0, totalWidth - totalBorderHorizontal - totalPaddingHorizontal);
//   const contentHeight = Math.max(0, totalHeight - totalBorderVertical - totalPaddingVertical);
//   const svgHeight = Math.max(0, contentHeight - titleSpace - legendSpace);
  

//   if (svgWidth <= 0 || svgHeight <= 0)
//     return <div className="text-red-500">Insufficient space</div>;

//   const padding = 60;

//   const scaleX = (i) =>
//     ((i + 1) / (data.data.length + 1)) * (svgWidth - 2 * padding) + padding / 2;
//   const scaleY = (y) =>
//     svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

//   const numYTicks = 6;
//   const yStep = (yMax - yMin) / (numYTicks - 1);
//   const yTicks = useMemo(() => 
//     Array.from({ length: numYTicks }, (_, i) => Math.round(yMin + i * yStep)),
//     [yMin, yMax]
//   );

//   const barWidth = (svgWidth - 2 * padding) / data.data.length - barSpacing;

//   const fullHeights = useMemo(() => data.data.map((d) => svgHeight - padding - scaleY(d.y)), [data.data, svgHeight, padding, yMin, yMax]);

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
//       const animateBar = (index) => {
//         setAnimatedHeights((prev) => {
//           const newHeights = [...prev];
//           newHeights[index] = fullHeights[index];
//           return newHeights;
//         });
//       };

//       data.data.forEach((_, i) => {
//         setTimeout(() => animateBar(i), i * animationDelay);
//       });
//     }
//   }, [isVisible, data.data, fullHeights, animationDelay]);

//   const getColor = (value) => {
//     const intensity = (value - yMin) / (yMax - yMin);
//     const lightness = 85 - intensity * 25;
//     return `hsl(210, 100%, ${lightness}%)`;
//   };

//   const handleMouseEnter = (p) => setHoveredPoint(p);
//   const handleMouseLeave = () => setHoveredPoint(null);

//   const getAlignItemsClass = (align) => {
//     switch (align) {
//       case "left":
//         return "items-start";
//       case "center":
//         return "items-center";
//       case "right":
//         return "items-end";
//       case "stretch":
//         return "items-stretch";
//       case "baseline":
//         return "items-baseline";
//       case "auto":
//       default:
//         return "items-center";
//     }
//   };

//   const outerItemsClass = getAlignItemsClass(childAlign);

//   const marginStyle = useTailwind ? {} : {
//     marginTop: `${effectiveMarginTop}px`,
//     marginRight: `${effectiveMarginRight}px`,
//     marginBottom: `${effectiveMarginBottom}px`,
//     marginLeft: `${effectiveMarginLeft}px`,
//   };

//   const getSizedValue = (value) => {
//     if (value === undefined || value === null) return undefined;
//     if (typeof value === 'number') return `${value}px`;
//     // Preserve strings like "100%", "50vw", "auto", "none"
//     return value.toString();
//   };

//   const containerWidthStyle = typeof width === "string" ? width : `${totalWidth}px`;
//   const containerHeightStyle = typeof height === "string" ? height : `${totalHeight}px`;

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
//     borderStyle: borderStyle === "none" ? "none" : borderStyle,
//     borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
//     borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
//     borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
//     borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
//     paddingTop: `${effectivePaddingTop}px`,
//     paddingRight: `${effectivePaddingRight}px`,
//     paddingBottom: `${effectivePaddingBottom}px`,
//     paddingLeft: `${effectivePaddingLeft}px`,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   };

//   const effectiveBoxShadow = boxShadow || undefined;

//   const borderedContainerStyle = {
//     ...layoutStyles,
//     position: "relative",
//     ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
//     ...bgStyle,
//     overflow: "hidden",
//   };

//   // SVG responsive handling: use viewBox for scaling when Tailwind is used
//   const isResponsive = useTailwind;
//   const svgAttrs = isResponsive
//     ? {
//         viewBox: `0 0 ${svgWidth} ${svgHeight}`,
//       }
//     : {
//         width: svgWidth,
//         height: svgHeight,
//       };
//   const svgStyle = isResponsive ? { width: "100%", height: "auto" } : {};
//   const svgClassName = "";

//   const innerClassName = tailwindClasses;

//   const transitionStyle = `y ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55), height ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;

//   return (
//     <div ref={containerRef} className={`flex flex-col ${outerItemsClass}`}>
//       <div style={marginStyle}>
//         <div 
//           style={borderedContainerStyle} 
//           className={innerClassName}
//           title={seoTitle} 
//           aria-label={seoAlt}
//         >
//           <svg
//             className={svgClassName}
//             {...svgAttrs}
//             style={svgStyle}
//           >
//             <defs>
//               {useGradientForText && (
//                 <>
//                   {isForegroundGradient ? (
//                     (() => {
//                       const parsed = foreground.startsWith('linear-gradient')
//                         ? parseLinearGradient(foreground)
//                         : parseRadialGradient(foreground);
//                       if (!parsed) return null;
//                       if (parsed.angle !== undefined) { // Linear
//                         return (
//                           <linearGradient
//                             id="fgGrad"
//                             x1="0"
//                             y1="0"
//                             x2="1"
//                             y2="0"
//                             gradientUnits="objectBoundingBox"
//                             gradientTransform={`rotate(${parsed.angle}, 0.5, 0.5)`}
//                           >
//                             {parsed.colorStops.map((stop, i) => (
//                               <stop
//                                 key={i}
//                                 offset={`${stop.offset}%`}
//                                 stopColor={stop.color}
//                               />
//                             ))}
//                           </linearGradient>
//                         );
//                       } else { // Radial
//                         return (
//                           <radialGradient
//                             id="fgGrad"
//                             cx="0.5"
//                             cy="0.5"
//                             r="0.5"
//                             gradientUnits="objectBoundingBox"
//                           >
//                             {parsed.colorStops.map((stop, i) => (
//                               <stop
//                                 key={i}
//                                 offset={`${stop.offset}%`}
//                                 stopColor={stop.color}
//                               />
//                             ))}
//                           </radialGradient>
//                         );
//                       }
//                     })()
//                   ) : effectiveUseRadialGradientForeground ? (
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
            
//             {/* Y grid lines (horizontal for values) */}
//             {effectiveShowYGrid && yTicks.map((y) => (
//               <line
//                 key={`gy-${y}`}
//                 x1={padding}
//                 y1={scaleY(y)}
//                 x2={svgWidth - padding}
//                 y2={scaleY(y)}
//                 stroke={gridLineYColor}
//                 strokeWidth={yAxisLineWidth}
//               />
//             ))}

//             {/* X grid lines (vertical for categories) */}
//             {effectiveShowXGrid && data.data.map((_, i) => (
//               <line
//                 key={`gx-${i}`}
//                 x1={scaleX(i)}
//                 y1={padding}
//                 x2={scaleX(i)}
//                 y2={svgHeight - padding}
//                 stroke={gridLineXColor}
//                 strokeWidth={xAxisLineWidth}
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

//             {/* Bars */}
//             {data.data.map((p, i) => {
//               const xPos = scaleX(i);
//               const yPos = scaleY(p.y);
//               const animatedHeight = animatedHeights[i];
//               const barY = svgHeight - padding - animatedHeight;
//               const barColor = getColor(p.y);

//               return (
//                 <g key={i}>
//                   <rect
//                     x={xPos - barWidth / 2}
//                     y={barY}
//                     width={barWidth}
//                     height={animatedHeight}
//                     fill={barColor}
//                     rx={barRadius}
//                     style={{
//                       transition: transitionStyle,
//                     }}
//                     className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
//                     onMouseEnter={() => handleMouseEnter(p)}
//                     onMouseLeave={handleMouseLeave}
//                   />

//                   {/* Tooltip */}
//                   {effectiveShowTooltip && hoveredPoint?.x === p.x && (
//                     <g>
//                       <rect
//                         x={xPos - 45}
//                         y={yPos - 55}
//                         width={100}
//                         height={40}
//                         rx={8}
//                         fill="rgba(0,0,0,0.85)"
//                       />
//                       <text
//                         x={xPos + 5}
//                         y={yPos - 40}
//                         fill="white"
//                         textAnchor="middle"
//                         fontSize="12"
//                       >
//                         <tspan
//                           x={xPos + 5}
//                           dy="0"
//                           fontWeight="bold"
//                           fontSize="13"
//                         >
//                           {p.x}
//                         </tspan>
//                         <tspan x={xPos + 5} dy="16" fontSize="12">
//                           {`Value: ${p.y}`}
//                         </tspan>
//                       </text>
//                     </g>
//                   )}
//                 </g>
//               );
//             })}

//             {/* X labels */}
//             {effectiveShowXlabel && data.data.map((p, i) => (
//               <text
//                 key={`tx-${p.x}`}
//                 x={scaleX(i)}
//                 y={svgHeight - padding + 20}
//                 textAnchor="middle"
//                 className="text-xs text-center"
//                 fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
//               >
//                 {p.x}
//               </text>
//             ))}

//             {/* Y labels */}
//             {effectiveShowYlabel && yTicks.map((y) => (
//               <text
//                 key={`ty-${y}`}
//                 x={padding - 10}
//                 y={scaleY(y) + 4}
//                 textAnchor="end"
//                 className="text-xs text-right"
//                 fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
//               >
//                 {y}
//               </text>
//             ))}
//           </svg>

//           {/* Legend */}
//           {effectiveShowLegend && (
//             <div className="w-full flex flex-wrap justify-center gap-2 rounded-2xl shadow-2xl shadow-black px-4 py-4 mt-4" style={{ backgroundColor: legendBoxBackgroundColor }}>
//               {data.data.map((p) => {
//                 const barColor = getColor(p.y);
//                 return (
//                   <div key={p.x} className="flex items-center gap-2">
//                     <div
//                       className="w-3.5 h-3.5 rounded-sm opacity-70"
//                       style={{ backgroundColor: barColor }}
//                     />
//                     <span className="text-[12px] text-gray-700" style={titleTextStyle}>{p.x}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // PropTypes for type-checking
// QColumnChart.propTypes = {
   
//   data: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         x: PropTypes.string.isRequired,
//         y: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
  
//   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   yMin: PropTypes.number,
//   yMax: PropTypes.number,
//   minWidth: PropTypes.string,
//   maxWidth: PropTypes.string,
//   minHeight: PropTypes.string,
//   maxHeight: PropTypes.string,
//   showLegend: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   xAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   yAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   xAxisLineWidth: PropTypes.string,
//   yAxisLineWidth: PropTypes.string,
//   gridLineXColor: PropTypes.string,
//   gridLineYColor: PropTypes.string,
//   showXlabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   showYlabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   borderAll: PropTypes.number,
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
//   boxShadow: PropTypes.string,
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
//   bgColor: PropTypes.string,
//   bgUrl: PropTypes.string,
//   backgroundImageFit: PropTypes.string,
//   seoAlt: PropTypes.string,
//   seoTitle: PropTypes.string,
//   backgroundImageRepeat: PropTypes.string,
//   useLinearGradientForeground: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   gradientAngleForeground: PropTypes.number,
//   gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   useRadialGradientForeground: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   foreground: PropTypes.string,
//   childAlign: PropTypes.string,
//   legendBoxBackgroundColor: PropTypes.string,
//   tailwindClasses: PropTypes.string,
//   barSpacing: PropTypes.number,
//   barRadius: PropTypes.number,
//   animationDelay: PropTypes.number,
//   animationDuration: PropTypes.number,
// }

// export default QColumnChart;
// QColumnChart.displayName = "QColumnChart";




import PropTypes from "prop-types";
import React, { useMemo, useState, useRef, useEffect } from "react";

const parseLinearGradient = (gradientStr) => {
  if (!gradientStr || !gradientStr.startsWith("linear-gradient")) return null;
  const match = gradientStr.match(
    /^linear-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/
  );
  if (!match) return null;
  let angle = 0;
  const angleStr = match[1].trim();
  const angleMatch = angleStr.match(/^([0-9.-]+)deg$/);
  if (angleMatch) {
    angle = parseFloat(angleMatch[1]);
  }
  let stopsStr = match[2].replace(/\)$/, "").trim();
  // Match color stop pairs
  const stopRegex =
    /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
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

const parseRadialGradient = (gradientStr) => {
  if (!gradientStr || !gradientStr.startsWith("radial-gradient")) return null;
  const match = gradientStr.match(
    /^radial-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/
  );
  if (!match) return null;
  const shapeStr = match[1].trim(); //"circle at center"
  let stopsStr = match[2].replace(/\)$/, "").trim();
  // Match color stop pairs
  const stopRegex =
    /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
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
  return { shape: shapeStr, colorStops };
};

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

const QColumnChart = ({
  data = {
    title: "Sales",
    data: [
      { x: "January", y: 76 },
      { x: "February", y: 82 },
      { x: "March", y: 69 },
      { x: "April", y: 58 },
      { x: "May", y: 87 },
    ],
  },
  width = 560,
  height = 400,
  yMin = 50,
  yMax = 100,

  minWidth,
  maxWidth,
  minHeight,
  maxHeight,

  showLegend, // toggle the legend
  showTooltip,

  xAxisGridLines, // show/hide grid in X axis
  yAxisGridLines, // show/hide grid in Y axis

  xAxisLineWidth,
  yAxisLineWidth,
  gridLineXColor = "#808080",
  gridLineYColor = "#808080",

  //show and hide X and Y label
  showXlabel = "true",
  showYlabel = "true",

  //Border props for overall chart container
  borderAll,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderStyle, //none, solid, dashed, dotted

  //Border colors for each side
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadiusAll, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft,
  borderRadiusTopRight,
  borderRadiusBottomRight,
  borderRadiusBottomLeft,

  //Box Shadow props for overall chart container
  boxShadow,

  //Padding props for inside the border
  paddingAll,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,

  //Margin props for outside the border
  marginAll,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,

  //Background color inside the border
  bgColor,

  //======Background Image props
  bgUrl,
  backgroundImageFit, //none, cover, contain, fill, fit-height, fit-width
  seoAlt,
  seoTitle,
  backgroundImageRepeat, //repeat X, repeat Y, repeat, none

  //===Linear Gradient Foreground props
  useLinearGradientForeground,
  gradientColorsForeground,
  gradientAngleForeground,
  gradientStopsForeground,

  //Radial Gradient Foreground props
  useRadialGradientForeground,
  radialGradientColorsForeground,
  radialGradientStopsForeground,

  //single foreground color
  foreground,

  // chart alignment
  childAlign, // left, center, right, stretch, baseline, auto

  legendBoxBackgroundColor,

  tailwaindClasses,

  // Column specific
  barSpacing = 16, // spacing between bars
  barRadius = 5, // rx for bars
  animationDelay = 150, // ms between bar animations
  animationDuration = 0.6, // seconds for transition
}) => {
  const useTailwind = !!tailwaindClasses;

  // Coerce string values to booleans for toggle props
  const effectiveShowLegend = showLegend === "true" || showLegend === true;
  const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
  const effectiveShowXGrid =
    xAxisGridLines === "true" || xAxisGridLines === true;
  const effectiveShowYGrid =
    yAxisGridLines === "true" || yAxisGridLines === true;
  const effectiveShowXlabel = showXlabel === "true" || showXlabel === true;
  const effectiveShowYlabel = showYlabel === "true" || showYlabel === true;
  const effectiveUseLinearGradientForeground =
    useLinearGradientForeground === "true" ||
    useLinearGradientForeground === true;
  const effectiveUseRadialGradientForeground =
    useRadialGradientForeground === "true" ||
    useRadialGradientForeground === true;

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState(
    Array(data.data.length).fill(0)
  );
  const containerRef = useRef(null);

  //foreground
  const effectiveForegroundColor = foreground || "#374151";
  const isForegroundGradient =
    typeof foreground === "string" &&
    (foreground.startsWith("linear-gradient(") ||
      foreground.startsWith("radial-gradient("));
  const useGradientForText =
    effectiveUseLinearGradientForeground ||
    effectiveUseRadialGradientForeground ||
    isForegroundGradient;
  const getForegroundGradientCSS = () => {
    if (isForegroundGradient) {
      return foreground;
    }
    if (
      effectiveUseRadialGradientForeground &&
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
      effectiveUseLinearGradientForeground &&
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
  const titleTextStyle = {
    color: useGradientForText ? "transparent" : effectiveForegroundColor,
    ...(useGradientForText && {
      backgroundImage: foregroundGradientCSS,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    }),
  };

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
    const map = {
      none: "no-repeat",
      "repeat X": "repeat-x",
      "repeat Y": "repeat-y",
      repeat: "repeat",
    };
    return map[rep] || "no-repeat";
  };

  const effectiveBgColor = bgColor || "#ffffff";
  const isGradient =
    effectiveBgColor.startsWith("linear-gradient(") ||
    effectiveBgColor.startsWith("radial-gradient(");
  let bgStyle = {};
  if (isGradient) {
    let bgImage = effectiveBgColor;
    if (bgUrl) {
      bgImage = `url(${bgUrl}), ${effectiveBgColor}`;
    }
    bgStyle = {
      backgroundImage: bgImage,
      backgroundColor: "transparent",
      ...(bgUrl && {
        backgroundRepeat: getBackgroundRepeat(backgroundImageRepeat),
        backgroundSize: getBackgroundSize(backgroundImageFit),
        backgroundPosition: "center center",
      }),
    };
  } else {
    bgStyle = {
      backgroundColor: effectiveBgColor,
    };
    if (bgUrl) {
      bgStyle.backgroundImage = `url(${bgUrl})`;
      bgStyle.backgroundRepeat = getBackgroundRepeat(backgroundImageRepeat);
      bgStyle.backgroundSize = getBackgroundSize(backgroundImageFit);
      bgStyle.backgroundPosition = "center center";
    }
  }

  if (!data || !data.data || data.data.length === 0)
    return <div className="text-red-500">No data</div>;

  const effectiveBorderTop = useTailwind ? 0 : borderTop || borderAll || 0;
  const effectiveBorderRight = useTailwind ? 0 : borderRight || borderAll || 0;
  const effectiveBorderBottom = useTailwind
    ? 0
    : borderBottom || borderAll || 0;
  const effectiveBorderLeft = useTailwind ? 0 : borderLeft || borderAll || 0;

  let effectivePaddingTop = useTailwind ? 0 : paddingTop || paddingAll || 0;
  let effectivePaddingRight = useTailwind ? 0 : paddingRight || paddingAll || 0;
  let effectivePaddingBottom = useTailwind
    ? 0
    : paddingBottom || paddingAll || 0;
  let effectivePaddingLeft = useTailwind ? 0 : paddingLeft || paddingAll || 0;

  // Adjust padding to at least match border thickness to prevent overlap
  effectivePaddingTop = Math.max(effectivePaddingTop, effectiveBorderTop);
  effectivePaddingRight = Math.max(effectivePaddingRight, effectiveBorderRight);
  effectivePaddingBottom = Math.max(
    effectivePaddingBottom,
    effectiveBorderBottom
  );
  effectivePaddingLeft = Math.max(effectivePaddingLeft, effectiveBorderLeft);

  const effectiveMarginTop = useTailwind ? 0 : marginTop || marginAll || 0;
  const effectiveMarginRight = useTailwind ? 0 : marginRight || marginAll || 0;
  const effectiveMarginBottom = useTailwind
    ? 0
    : marginBottom || marginAll || 0;
  const effectiveMarginLeft = useTailwind ? 0 : marginLeft || marginAll || 0;

  const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
  const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
  const totalPaddingHorizontal = effectivePaddingLeft + effectivePaddingRight;
  const totalPaddingVertical = effectivePaddingTop + effectivePaddingBottom;
  const titleSpace = 0;
  const legendSpace = effectiveShowLegend ? 80 : 0;
  const totalWidth = parseSize(width);
  const totalHeight = parseSize(height);
  const svgWidth = Math.max(
    0,
    totalWidth - totalBorderHorizontal - totalPaddingHorizontal
  );
  const contentHeight = Math.max(
    0,
    totalHeight - totalBorderVertical - totalPaddingVertical
  );
  const svgHeight = Math.max(0, contentHeight - titleSpace - legendSpace);

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (i) =>
    ((i + 1) / (data.data.length + 1)) * (svgWidth - 2 * padding) + padding / 2;
  const scaleY = (y) =>
    svgHeight -
    padding -
    ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

  const numYTicks = 6;
  const yStep = (yMax - yMin) / (numYTicks - 1);
  const yTicks = useMemo(
    () =>
      Array.from({ length: numYTicks }, (_, i) => Math.round(yMin + i * yStep)),
    [yMin, yMax]
  );

  const barWidth = (svgWidth - 2 * padding) / data.data.length - barSpacing;

  const fullHeights = useMemo(
    () => data.data.map((d) => svgHeight - padding - scaleY(d.y)),
    [data.data, svgHeight, padding, yMin, yMax]
  );

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
      const animateBar = (index) => {
        setAnimatedHeights((prev) => {
          const newHeights = [...prev];
          newHeights[index] = fullHeights[index];
          return newHeights;
        });
      };

      data.data.forEach((_, i) => {
        setTimeout(() => animateBar(i), i * animationDelay);
      });
    }
  }, [isVisible, data.data, fullHeights, animationDelay]);

  const getColor = (value) => {
    const intensity = (value - yMin) / (yMax - yMin);
    const lightness = 85 - intensity * 25;
    return `hsl(210, 100%, ${lightness}%)`;
  };

  const handleMouseEnter = (p) => setHoveredPoint(p);
  const handleMouseLeave = () => setHoveredPoint(null);

  const getAlignItemsClass = (align) => {
    switch (align) {
      case "left":
        return "items-start";
      case "center":
        return "items-center";
      case "right":
        return "items-end";
      case "stretch":
        return "items-stretch";
      case "baseline":
        return "items-baseline";
      case "auto":
      default:
        return "items-center";
    }
  };

  const outerItemsClass = getAlignItemsClass(childAlign);

  const marginStyle = useTailwind
    ? {}
    : {
        marginTop: `${effectiveMarginTop}px`,
        marginRight: `${effectiveMarginRight}px`,
        marginBottom: `${effectiveMarginBottom}px`,
        marginLeft: `${effectiveMarginLeft}px`,
      };

  const getSizedValue = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === "number") return `${value}px`;
    // Preserve strings like "100%", "50vw", "auto", "none"
    return value.toString();
  };

  const containerWidthStyle =
    typeof width === "string" ? width : `${totalWidth}px`;
  const containerHeightStyle =
    typeof height === "string" ? height : `${totalHeight}px`;

  // Layout styles (sizing, borders, paddings, radii) - skip entirely when using Tailwind
  const layoutStyles = useTailwind
    ? {}
    : {
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
        borderStyle: borderStyle === "none" ? "none" : borderStyle,
        borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
        borderTopRightRadius: `${
          borderRadiusTopRight || borderRadiusAll || 0
        }px`,
        borderBottomRightRadius: `${
          borderRadiusBottomRight || borderRadiusAll || 0
        }px`,
        borderBottomLeftRadius: `${
          borderRadiusBottomLeft || borderRadiusAll || 0
        }px`,
        paddingTop: `${effectivePaddingTop}px`,
        paddingRight: `${effectivePaddingRight}px`,
        paddingBottom: `${effectivePaddingBottom}px`,
        paddingLeft: `${effectivePaddingLeft}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      };

  const effectiveBoxShadow = boxShadow || undefined;

  const borderedContainerStyle = {
    ...layoutStyles,
    position: "relative",
    ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
    ...bgStyle,
    overflow: "hidden",
  };

  // SVG responsive handling: use viewBox for scaling when Tailwind is used
  const isResponsive = useTailwind;
  const svgAttrs = isResponsive
    ? {
        viewBox: `0 0 ${svgWidth} ${svgHeight}`,
      }
    : {
        width: svgWidth,
        height: svgHeight,
      };
  const svgStyle = isResponsive ? { width: "100%", height: "auto" } : {};
  const svgClassName = "";

  const innerClassName = tailwaindClasses;

  const transitionStyle = `y ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55), height ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;

  return (
    <div ref={containerRef} className={`flex flex-col ${outerItemsClass}`}>
      <div style={marginStyle}>
        <div
          style={borderedContainerStyle}
          className={innerClassName}
          title={seoTitle}
          aria-label={seoAlt}
        >
          <svg className={svgClassName} {...svgAttrs} style={svgStyle}>
            <defs>
              {useGradientForText && (
                <>
                  {isForegroundGradient ? (
                    (() => {
                      const parsed = foreground.startsWith("linear-gradient")
                        ? parseLinearGradient(foreground)
                        : parseRadialGradient(foreground);
                      if (!parsed) return null;
                      if (parsed.angle !== undefined) {
                        // Linear
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
                      } else {
                        // Radial
                        return (
                          <radialGradient
                            id="fgGrad"
                            cx="0.5"
                            cy="0.5"
                            r="0.5"
                            gradientUnits="objectBoundingBox"
                          >
                            {parsed.colorStops.map((stop, i) => (
                              <stop
                                key={i}
                                offset={`${stop.offset}%`}
                                stopColor={stop.color}
                              />
                            ))}
                          </radialGradient>
                        );
                      }
                    })()
                  ) : effectiveUseRadialGradientForeground ? (
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

            {/* Y grid lines (horizontal for values) */}
            {effectiveShowYGrid &&
              yTicks.map((y) => (
                <line
                  key={`gy-${y}`}
                  x1={padding}
                  y1={scaleY(y)}
                  x2={svgWidth - padding}
                  y2={scaleY(y)}
                  stroke={gridLineYColor}
                  strokeWidth={yAxisLineWidth}
                />
              ))}

            {/* X grid lines (vertical for categories) */}
            {effectiveShowXGrid &&
              data.data.map((_, i) => (
                <line
                  key={`gx-${i}`}
                  x1={scaleX(i)}
                  y1={padding}
                  x2={scaleX(i)}
                  y2={svgHeight - padding}
                  stroke={gridLineXColor}
                  strokeWidth={xAxisLineWidth}
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

            {/* Bars */}
            {data.data.map((p, i) => {
              const xPos = scaleX(i);
              const yPos = scaleY(p.y);
              const animatedHeight = animatedHeights[i];
              const barY = svgHeight - padding - animatedHeight;
              const barColor = getColor(p.y);

              return (
                <g key={i}>
                  <rect
                    x={xPos - barWidth / 2}
                    y={barY}
                    width={barWidth}
                    height={animatedHeight}
                    fill={barColor}
                    rx={barRadius}
                    style={{
                      transition: transitionStyle,
                    }}
                    className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                    onMouseEnter={() => handleMouseEnter(p)}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Tooltip */}
                  {effectiveShowTooltip && hoveredPoint?.x === p.x && (
                    <g>
                      <rect
                        x={xPos - 45}
                        y={yPos - 55}
                        width={100}
                        height={40}
                        rx={8}
                        fill="rgba(0,0,0,0.85)"
                      />
                      <text
                        x={xPos + 5}
                        y={yPos - 40}
                        fill="white"
                        textAnchor="middle"
                        fontSize="12"
                      >
                        <tspan
                          x={xPos + 5}
                          dy="0"
                          fontWeight="bold"
                          fontSize="13"
                        >
                          {p.x}
                        </tspan>
                        <tspan x={xPos + 5} dy="16" fontSize="12">
                          {`Value: ${p.y}`}
                        </tspan>
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* X labels */}
            {effectiveShowXlabel &&
              data.data.map((p, i) => (
                <text
                  key={`tx-${p.x}`}
                  x={scaleX(i)}
                  y={svgHeight - padding + 20}
                  textAnchor="middle"
                  className="text-xs text-center"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                >
                  {p.x}
                </text>
              ))}

            {/* Y labels */}
            {effectiveShowYlabel &&
              yTicks.map((y) => (
                <text
                  key={`ty-${y}`}
                  x={padding - 10}
                  y={scaleY(y) + 4}
                  textAnchor="end"
                  className="text-xs text-right"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                >
                  {y}
                </text>
              ))}
          </svg>

          {/* Legend */}
          {effectiveShowLegend && (
            <div
              className="w-full flex flex-wrap justify-center gap-2 rounded-2xl shadow-2xl shadow-black px-4 py-4 mt-4"
              style={{ backgroundColor: legendBoxBackgroundColor }}
            >
              {data.data.map((p) => {
                const barColor = getColor(p.y);
                return (
                  <div key={p.x} className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-sm opacity-70"
                      style={{ backgroundColor: barColor }}
                    />
                    <span
                      className="text-[12px] text-gray-700"
                      style={titleTextStyle}
                    >
                      {p.x}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking
QColumnChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.string.isRequired,
        y: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,

  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  showLegend: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  showTooltip: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  xAxisGridLines: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  yAxisGridLines: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  xAxisLineWidth: PropTypes.string,
  yAxisLineWidth: PropTypes.string,
  gridLineXColor: PropTypes.string,
  gridLineYColor: PropTypes.string,
  showXlabel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  showYlabel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  borderAll: PropTypes.number,
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
  boxShadow: PropTypes.string,
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
  bgColor: PropTypes.string,
  bgUrl: PropTypes.string,
  backgroundImageFit: PropTypes.string,
  seoAlt: PropTypes.string,
  seoTitle: PropTypes.string,
  backgroundImageRepeat: PropTypes.string,
  useLinearGradientForeground: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  gradientAngleForeground: PropTypes.number,
  gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  useRadialGradientForeground: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["true", "false"]),
  ]),
  radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  foreground: PropTypes.string,
  childAlign: PropTypes.string,
  legendBoxBackgroundColor: PropTypes.string,
  tailwaindClasses: PropTypes.string,
  barSpacing: PropTypes.number,
  barRadius: PropTypes.number,
  animationDelay: PropTypes.number,
  animationDuration: PropTypes.number,
};

export default QColumnChart;
QColumnChart.displayName = "QColumnChart";
