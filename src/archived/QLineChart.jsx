// // import PropTypes from "prop-types";
// // import React, { useMemo, useState, useRef, useEffect } from "react";

// // const parseLinearGradient = (gradientStr) => {
// //   if (!gradientStr || !gradientStr.startsWith('linear-gradient')) return null;
// //   const match = gradientStr.match(/^linear-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
// //   if (!match) return null;
// //   let angle = 0;
// //   const angleStr = match[1].trim();
// //   const angleMatch = angleStr.match(/^([0-9.-]+)deg$/);
// //   if (angleMatch) {
// //     angle = parseFloat(angleMatch[1]);
// //   }
// //   let stopsStr = match[2].replace(/\)$/, '').trim();
// //   // Match color stop pairs
// //   const stopRegex = /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
// //   const stopMatches = [];
// //   let m;
// //   while ((m = stopRegex.exec(stopsStr)) !== null) {
// //     stopMatches.push(m[0]);
// //   }
// //   if (stopMatches.length === 0) return null;
// //   const colorStops = [];
// //   stopMatches.forEach((part) => {
// //     const percentMatch = part.match(/\s+([0-9.-]+)%?$/);
// //     let offset = percentMatch ? parseFloat(percentMatch[1]) : null;
// //     let color = part;
// //     let index = -1;
// //     if (percentMatch) {
// //       index = percentMatch.index;
// //       color = part.slice(0, index).trim();
// //     }
// //     if (offset === null || isNaN(offset)) {
// //       // Evenly distribute if no explicit stop
// //       offset = (colorStops.length / (stopMatches.length - 1)) * 100;
// //     }
// //     colorStops.push({ color: color.trim(), offset });
// //   });
// //   return { angle, colorStops };
// // };

// // const parseRadialGradient = (gradientStr) => {
// //   if (!gradientStr || !gradientStr.startsWith('radial-gradient')) return null;
// //   const match = gradientStr.match(/^radial-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
// //   if (!match) return null;
// //   const shapeStr = match[1].trim(); // e.g., "circle at center"
// //   let stopsStr = match[2].replace(/\)$/, '').trim();
// //   // Match color stop pairs
// //   const stopRegex = /((?:rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-z]+)\s*(?:([0-9.-]+)%?)?)/g;
// //   const stopMatches = [];
// //   let m;
// //   while ((m = stopRegex.exec(stopsStr)) !== null) {
// //     stopMatches.push(m[0]);
// //   }
// //   if (stopMatches.length === 0) return null;
// //   const colorStops = [];
// //   stopMatches.forEach((part) => {
// //     const percentMatch = part.match(/\s+([0-9.-]+)%?$/);
// //     let offset = percentMatch ? parseFloat(percentMatch[1]) : null;
// //     let color = part;
// //     let index = -1;
// //     if (percentMatch) {
// //       index = percentMatch.index;
// //       color = part.slice(0, index).trim();
// //     }
// //     if (offset === null || isNaN(offset)) {
// //       // Evenly distribute if no explicit stop
// //       offset = (colorStops.length / (stopMatches.length - 1)) * 100;
// //     }
// //     colorStops.push({ color: color.trim(), offset });
// //   });
// //   return { shape: shapeStr, colorStops };
// // };

// // const QLineChart = ({
// //   data = {
// //     title: "Product A",
// //     data: [
// //       { x: 1, y: 80 },
// //       { x: 2, y: 50 },
// //       { x: 3, y: 90 },
// //       { x: 4, y: 20 },
// //       { x: 5, y: 40 },
// //       { x: 6, y: 95 },
// //       { x: 7, y: 30 },
// //       { x: 8, y: 60 },
// //       { x: 9, y: 10 },
// //       { x: 10, y: 20 },
// //     ],
// //   },
// //   width = 560,
// //   height = 400,
// //   xMin = 1,
// //   xMax = 10,
// //   yMin = 0,
// //   yMax = 100,
// //   color = "#4A90E2", //graph line color

// //   //in px, vw/vh, %
// //   minWidth = "10px",
// //   maxWidth = "100vw",
// //   minHeight = "none",
// //   maxHeight = "100%",

// //   showLegend, // toggle the title
// //   showTooltip = "true",
// //   showMarker, // toggle marker points
// //   markerSize = 14, // marker point size in px

// //   xAxisGridLines = "true", // show/hide grid in X axis
// //   yAxisGridLines = "true", // show/hide grid in Y axis

// //   xAxisLineWidth = "1",
// //   yAxisLineWidth = "1",
// //   gridLineXColor = "#808080",
// //   gridLineYColor = "#808080",

// //   //show and hide X and Y label
// //   xAxisLabel = "true",
// //   yAxisLabel = "true",

// //   //Border props for overall chart container
// //   borderAll = 0,
// //   borderTop = 0,
// //   borderRight = 0,
// //   borderBottom = 0,
// //   borderLeft = 0,
// //   borderColor = "#000000",
// //   borderStyle = "solid", //none, solid, dashed, dotted

// //   //Border colors for each side
// //   borderTopColor = "",
// //   borderRightColor = "",
// //   borderBottomColor = "",
// //   borderLeftColor = "",
// //   borderRadiusAll = 0, //set radius for all the corners together
// //   //change each corner of the container
// //   borderRadiusTopLeft = 0,
// //   borderRadiusTopRight = 0,
// //   borderRadiusBottomRight = 0,
// //   borderRadiusBottomLeft = 0,

// //   //==Box Shadow props for overall chart container
// //   boxShadow = "", // Full shadow string support (prioritized)
// //   boxShadowColor,
// //   boxShadowOffsetX = 0,
// //   boxShadowOffsetY = 0,
// //   boxShadowBlurRadius = 0,
// //   boxShadowSpreadRadius = 0,

// //   //Padding props for inside the border
// //   paddingAll = 0,
// //   paddingTop = 0,
// //   paddingRight = 0,
// //   paddingBottom = 0,
// //   paddingLeft = 0,

// //   //Margin props for outside the border
// //   marginAll = 0,
// //   marginTop = 0,
// //   marginRight = 0,
// //   marginBottom = 0,
// //   marginLeft = 0,

// //   //Background color inside the border
// //   bgColor,
// //   //============Linear Gradient Background props
// //   useLinearGradient = false,
// //   gradientColors = ["pink", "white"],
// //   gradientAngle = 0,
// //   gradientStops = [20, 90],
// //   //=====Radial Gradient Background props
// //   useRadialGradient = false,
// //   radialGradientColors = ["pink", "pink", "white"],
// //   radialGradientStops = [10, 40, 90],

// //   //======Background Image props
// //   bgUrl,
// //   backgroundSize = "cover", //none, cover, contain, fill, fit-height, fit-width
// //   seoAlt = "test img",
// //   seoTitle = "image title",
// //   backgroundRepeat = "repeat", //repeat X, repeat Y, repeat, none

// //   //===Linear Gradient Foreground props
// //   useLinearGradientForeground = false,
// //   gradientColorsForeground = ["red", "white", "green"],
// //   gradientAngleForeground = 30,
// //   gradientStopsForeground = [0, 50, 100],

// //   //Radial Gradient Foreground props
// //   useRadialGradientForeground = false,
// //   radialGradientColorsForeground = ["red", "pink", "green"],
// //   radialGradientStopsForeground = [0, 50, 100],

// //   //single foreground color
// //   foreground = "",

// //   // chart alignment
// //   alignment = "auto", // left, center, right, stretch, baseline, auto
// //   tailwindClasses,
// // }) => {
// //   const [hoveredPoint, setHoveredPoint] = useState(null);
// //   const [isVisible, setIsVisible] = useState(false);
// //   const [svgDimensions, setSvgDimensions] = useState({ width: 560, height: 400 });
// //   const pathRef = useRef(null);
// //   const containerRef = useRef(null);
// //   const svgRef = useRef(null);

// //   // Coerce string values to booleans for all toggle props
// //   const effectiveShowLegend = showLegend === "true" || showLegend === true;
// //   const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
// //   const effectiveShowMarker = showMarker === "true" || showMarker === true;
// //   const effectiveXAxisGridLines = xAxisGridLines === "true" || xAxisGridLines === true;
// //   const effectiveYAxisGridLines = yAxisGridLines === "true" || yAxisGridLines === true;
// //   const effectiveXAxisLabel = xAxisLabel === "true" || xAxisLabel === true;
// //   const effectiveYAxisLabel = yAxisLabel === "true" || yAxisLabel === true;

// //   const applyInlineSizing = !tailwindClasses;
// //   const applyInlinePadding = !tailwindClasses;
// //   const applyInlineMargin = !tailwindClasses;
// //   const applyInlineBorders = !tailwindClasses; // to prioritize Tailwind for borders/radii/shadows

// //   // Compute effective min/max to encompass data and avoid clipping/distortion
// //   const dataXValues = data.data.map((d) => d.x);
// //   const dataYValues = data.data.map((d) => d.y);
// //   const dataXMin = Math.min(...dataXValues);
// //   const dataXMax = Math.max(...dataXValues);
// //   const dataYMin = Math.min(...dataYValues);
// //   const dataYMax = Math.max(...dataYValues);

// //   let effectiveXMin = Math.min(xMin, dataXMin);
// //   let effectiveXMax = Math.max(xMax, dataXMax);
// //   let effectiveYMin = Math.min(yMin, dataYMin);
// //   let effectiveYMax = Math.max(yMax, dataYMax);

// //   // Ensure range is valid to avoid division by zero
// //   if (effectiveXMax === effectiveXMin) effectiveXMax = effectiveXMin + 1;
// //   if (effectiveYMax === effectiveYMin) effectiveYMax = effectiveYMin + 1;

// //   // Compute effective box shadow (full string or constructed fallback)
// //   const effectiveBoxShadow = boxShadow ||
// //     (boxShadowColor ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}` : undefined);

// //   // Handle bgColor as solid, linear, or radial gradient
// //   let chartBgColor = "transparent";
// //   let chartBgImage = "";
// //   if (bgColor) {
// //     if (bgColor.trim().startsWith("linear-gradient(") || bgColor.trim().startsWith("radial-gradient(")) {
// //       chartBgImage = bgColor;
// //       chartBgColor = "transparent";
// //     } else {
// //       chartBgColor = bgColor;
// //     }
// //   }
// //   // Fallback to gradient props
// //   const getFallbackBackgroundImage = () => {
// //     if (
// //       useRadialGradient &&
// //       radialGradientColors &&
// //       radialGradientColors.length > 0
// //     ) {
// //       const stops =
// //         radialGradientStops.length === radialGradientColors.length
// //           ? radialGradientStops
// //           : Array.from({ length: radialGradientColors.length }, (_, i) =>
// //               Math.round((i / (radialGradientColors.length - 1)) * 100)
// //             );
// //       const colorStops = radialGradientColors
// //         .map((color, i) => `${color} ${stops[i]}%`)
// //         .join(", ");
// //       return `radial-gradient(circle at center, ${colorStops})`;
// //     } else if (
// //       useLinearGradient &&
// //       gradientColors &&
// //       gradientColors.length > 0
// //     ) {
// //       const stops =
// //         gradientStops.length === gradientColors.length
// //           ? gradientStops
// //           : Array.from({ length: gradientColors.length }, (_, i) =>
// //               Math.round((i / (gradientColors.length - 1)) * 100)
// //             );
// //       const colorStops = gradientColors
// //         .map((color, i) => `${color} ${stops[i]}%`)
// //         .join(", ");
// //       return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
// //     }
// //     return null;
// //   };
// //   const fallbackBgImage = getFallbackBackgroundImage();
// //   if (!chartBgImage && fallbackBgImage) {
// //     chartBgImage = fallbackBgImage;
// //   }
// //   // Handle background image URL
// //   if (bgUrl) {
// //     const imgUrl = `url(${bgUrl})`;
// //     chartBgImage = chartBgImage ? `${imgUrl}, ${chartBgImage}` : imgUrl;
// //   }

// //   //foreground
// //   const effectiveForegroundColor = foreground || "#374151";
// //   const isForegroundGradient = typeof foreground === 'string' && (foreground.startsWith('linear-gradient(') || foreground.startsWith('radial-gradient('));
// //   const useGradientForText =
// //     useLinearGradientForeground || useRadialGradientForeground || isForegroundGradient;
// //   const getForegroundGradientCSS = () => {
// //     if (isForegroundGradient) {
// //       return foreground;
// //     }
// //     if (
// //       useRadialGradientForeground &&
// //       radialGradientColorsForeground &&
// //       radialGradientColorsForeground.length > 0
// //     ) {
// //       const stops =
// //         radialGradientStopsForeground.length ===
// //         radialGradientColorsForeground.length
// //           ? radialGradientStopsForeground
// //           : Array.from(
// //               { length: radialGradientColorsForeground.length },
// //               (_, i) =>
// //                 Math.round(
// //                   (i / (radialGradientColorsForeground.length - 1)) * 100
// //                 )
// //             );
// //       const colorStops = radialGradientColorsForeground
// //         .map((color, i) => `${color} ${stops[i]}%`)
// //         .join(", ");
// //       return `radial-gradient(circle at center, ${colorStops})`;
// //     } else if (
// //       useLinearGradientForeground &&
// //       gradientColorsForeground &&
// //       gradientColorsForeground.length > 0
// //     ) {
// //       const stops =
// //         gradientStopsForeground.length === gradientColorsForeground.length
// //           ? gradientStopsForeground
// //           : Array.from({ length: gradientColorsForeground.length }, (_, i) =>
// //               Math.round((i / (gradientColorsForeground.length - 1)) * 100)
// //             );
// //       const colorStops = gradientColorsForeground
// //         .map((color, i) => `${color} ${stops[i]}%`)
// //         .join(", ");
// //       return `linear-gradient(${gradientAngleForeground}deg, ${colorStops})`;
// //     }
// //     return null;
// //   };
// //   const foregroundGradientCSS = useGradientForText
// //     ? getForegroundGradientCSS()
// //     : null;
// //   const titleTextStyle = {
// //     color: useGradientForText ? "#d3d3d3" : effectiveForegroundColor,
// //     ...(useGradientForText && {
// //       backgroundImage: foregroundGradientCSS,
// //       WebkitBackgroundClip: "text",
// //       backgroundClip: "text",
// //     }),
// //   };

// //   const getBackgroundSize = (fit) => {
// //     const map = {
// //       none: "auto",
// //       cover: "cover",
// //       contain: "contain",
// //       fill: "100% 100%",
// //       "fitHeight": "auto 100%",
// //       "fitWidth": "100% auto",
// //     };
// //     return map[fit] || "auto";
// //   };

// //   const getBackgroundRepeat = (rep) => {
// //     const map = {
// //       none: "no-repeat",
// //       "repeatX": "repeat-x",
// //       "repeatY": "repeat-y",
// //       repeat: "repeat",
// //     };
// //     return map[rep] || "no-repeat";
// //   };

// //   if (!data || !data.data || data.data.length === 0)
// //     return <div className="text-red-500">No data</div>;

// //   // effective borders to be 0 when using Tailwind to avoid miscalculations
// //   const effectiveBorderTop = applyInlineBorders ? (borderTop || borderAll || 0) : 0;
// //   const effectiveBorderRight = applyInlineBorders ? (borderRight || borderAll || 0) : 0;
// //   const effectiveBorderBottom = applyInlineBorders ? (borderBottom || borderAll || 0) : 0;
// //   const effectiveBorderLeft = applyInlineBorders ? (borderLeft || borderAll || 0) : 0;

// //   const effectivePaddingTop = applyInlinePadding ? (paddingTop || paddingAll || 0) : 0;
// //   const effectivePaddingRight = applyInlinePadding ? (paddingRight || paddingAll || 0) : 0;
// //   const effectivePaddingBottom = applyInlinePadding ? (paddingBottom || paddingAll || 0) : 0;
// //   const effectivePaddingLeft = applyInlinePadding ? (paddingLeft || paddingAll || 0) : 0;

// //   const effectiveMarginTop = applyInlineMargin ? (marginTop || marginAll || 0) : 0;
// //   const effectiveMarginRight = applyInlineMargin ? (marginRight || marginAll || 0) : 0;
// //   const effectiveMarginBottom = applyInlineMargin ? (marginBottom || marginAll || 0) : 0;
// //   const effectiveMarginLeft = applyInlineMargin ? (marginLeft || marginAll || 0) : 0;

// //   const marginStyle = applyInlineMargin ? {
// //     marginTop: `${effectiveMarginTop}px`,
// //     marginRight: `${effectiveMarginRight}px`,
// //     marginBottom: `${effectiveMarginBottom}px`,
// //     marginLeft: `${effectiveMarginLeft}px`,
// //   } : {};

// //   const getSizedValue = (value) => {
// //     if (value === undefined || value === null) return undefined;
// //     if (typeof value === "number") return `${value}px`;
// //     return value.toString();
// //   };

// //   const borderedContainerStyle = {
// //     ...(applyInlineSizing && {
// //       width: getSizedValue(width),
// //       height: getSizedValue(height),
// //       minWidth: getSizedValue(minWidth),
// //       maxWidth: getSizedValue(maxWidth),
// //       minHeight: getSizedValue(minHeight),
// //       maxHeight: getSizedValue(maxHeight),
// //     }),
// //     boxSizing: "border-box",
// //     ...(applyInlineBorders && {  // Skip if using Tailwind
// //       borderTopWidth: `${effectiveBorderTop}px`,
// //       borderRightWidth: `${effectiveBorderRight}px`,
// //       borderBottomWidth: `${effectiveBorderBottom}px`,
// //       borderLeftWidth: `${effectiveBorderLeft}px`,
// //       borderTopColor: borderTopColor || borderColor,
// //       borderRightColor: borderRightColor || borderColor,
// //       borderBottomColor: borderBottomColor || borderColor,
// //       borderLeftColor: borderLeftColor || borderColor,
// //       borderStyle: borderStyle === "none" ? "none" : borderStyle,
// //       borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
// //       borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
// //       borderBottomRightRadius: `${
// //         borderRadiusBottomRight || borderRadiusAll || 0
// //       }px`,
// //       borderBottomLeftRadius: `${
// //         borderRadiusBottomLeft || borderRadiusAll || 0
// //       }px`,
// //     }),
// //     // Use effectiveBoxShadow (supports full string or fallback)
// //     ...(effectiveBoxShadow && applyInlineBorders && {  // Skip if using Tailwind
// //       boxShadow: effectiveBoxShadow,
// //     }),
// //     overflow: "hidden",
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     ...(applyInlinePadding && {
// //       paddingTop: `${effectivePaddingTop}px`,
// //       paddingRight: `${effectivePaddingRight}px`,
// //       paddingBottom: `${effectivePaddingBottom}px`,
// //       paddingLeft: `${effectivePaddingLeft}px`,
// //     }),
// //     backgroundColor: chartBgColor,
// //     ...(chartBgImage && { backgroundImage: chartBgImage }),
// //     ...(bgUrl && {
// //       backgroundRepeat: getBackgroundRepeat(backgroundRepeat),
// //       backgroundSize: getBackgroundSize(backgroundSize),
// //       backgroundPosition: "center center",
// //     }),
// //   };

// //   // Dynamic padding based on size to avoid clipping
// //   const basePadding = 60;
// //   const dynamicPadding = Math.max(20, Math.min(basePadding, svgDimensions.width * 0.1, svgDimensions.height * 0.1));
// //   const padding = dynamicPadding;
// //   // Separate left padding to ensure space for Y-axis labels without clipping
// //   const leftPadding = Math.max(50, dynamicPadding);

// //   const scaleX = (x) =>
// //     ((x - effectiveXMin) / (effectiveXMax - effectiveXMin)) *
// //       (svgDimensions.width - leftPadding - padding) +
// //     leftPadding;
// //   const scaleY = (y) =>
// //     svgDimensions.height -
// //     padding -
// //     ((y - effectiveYMin) / (effectiveYMax - effectiveYMin)) *
// //       (svgDimensions.height - 2 * padding);

// //   const createSmoothPath = (points) => {
// //     if (points.length < 2) return "";
// //     let d = `M ${scaleX(points[0].x)} ${scaleY(points[0].y)}`;
// //     for (let i = 0; i < points.length - 1; i++) {
// //       const p0 = points[i - 1] || points[i];
// //       const p1 = points[i];
// //       const p2 = points[i + 1];
// //       const p3 = points[i + 2] || p2;
// //       const cp1x = scaleX(p1.x + (p2.x - p0.x) / 6);
// //       const cp1y = scaleY(p1.y + (p2.y - p0.y) / 6);
// //       const cp2x = scaleX(p2.x - (p3.x - p1.x) / 6);
// //       const cp2y = scaleY(p2.y - (p3.y - p1.y) / 6);
// //       d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${scaleX(p2.x)} ${scaleY(
// //         p2.y
// //       )}`;
// //     }
// //     return d;
// //   };

// //   const pathD = createSmoothPath(data.data);

// //   useEffect(() => {
// //     if (pathRef.current) {
// //       const length = pathRef.current.getTotalLength();
// //       pathRef.current.style.strokeDasharray = length;
// //       pathRef.current.style.strokeDashoffset = length;
// //     }
// //   }, [pathD]);

// //   useEffect(() => {
// //     if (isVisible && pathRef.current) {
// //       requestAnimationFrame(() => {
// //         pathRef.current.style.transition = "stroke-dashoffset 2s ease-in-out";
// //         pathRef.current.style.strokeDashoffset = "0";
// //       });
// //     }
// //   }, [isVisible]);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.disconnect();
// //           setIsVisible(true);
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );
// //     if (containerRef.current) {
// //       observer.observe(containerRef.current);
// //     }
// //     return () => observer.disconnect();
// //   }, []);

// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       if (svgRef.current) {
// //         const rect = svgRef.current.getBoundingClientRect();
// //         setSvgDimensions({ width: rect.width, height: rect.height });
// //       }
// //     };

// //     // Initial update
// //     if (svgRef.current) {
// //       updateDimensions();
// //     }

// //     // Resize observer
// //     const resizeObserver = new ResizeObserver(updateDimensions);
// //     if (svgRef.current) {
// //       resizeObserver.observe(svgRef.current);
// //     }

// //     return () => {
// //       resizeObserver.disconnect();
// //     };
// //   }, [effectiveShowLegend, tailwindClasses]);

// //   const xTicks = useMemo(
// //     () =>
// //       Array.from(
// //         { length: Math.floor(effectiveXMax - effectiveXMin) + 1 },
// //         (_, i) => effectiveXMin + i
// //       ),
// //     [effectiveXMin, effectiveXMax]
// //   );

// //   const numYTicks = 6;
// //   const yStep = (effectiveYMax - effectiveYMin) / (numYTicks - 1);
// //   const yTicks = useMemo(
// //     () =>
// //       Array.from({ length: numYTicks }, (_, i) =>
// //         Math.round(effectiveYMin + i * yStep)
// //       ),
// //     [effectiveYMin, effectiveYMax]
// //   );

// //   // Add console logs to debug hover state
// //   const handleMouseEnter = (p) => {
// //     console.log("Mouse Enter:", p);
// //     setHoveredPoint(p);
// //   };

// //   const handleMouseLeave = () => {
// //     console.log("Mouse Leave");
// //     setHoveredPoint(null);
// //   };

// //   const getAlignItemsClass = (align) => {
// //     switch (align) {
// //       case "left":
// //         return "items-start";
// //       case "center":
// //         return "items-center";
// //       case "right":
// //         return "items-end";
// //       case "stretch":
// //         return "items-stretch";
// //       case "baseline":
// //         return "items-baseline";
// //       case "auto":
// //       default:
// //         return "items-center";
// //     }
// //   };

// //   const outerItemsClass = getAlignItemsClass(alignment);

// //   if (svgDimensions.width <= 0 || svgDimensions.height <= 0)
// //     return <div className="text-red-500">Insufficient space</div>;

// //   return (
// //     <div
// //       ref={containerRef}
// //       className={`relative flex flex-col ${outerItemsClass}`}
// //     >
// //       <div style={marginStyle}>
// //         <div
// //           style={borderedContainerStyle}
// //           className={tailwindClasses || ''}
// //           title={seoTitle}
// //           aria-label={seoAlt}
// //         >
// //           <svg
// //             ref={svgRef}
// //             width="100%"
// //             height={effectiveShowLegend ? "auto" : "100%"}
// //             viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
// //             preserveAspectRatio="xMidYMid meet"
// //             style={{
// //               flex: effectiveShowLegend ? 1 : undefined,
// //               width: "100%",
// //               height: "100%",
// //             }}
// //             className=""
// //           >
// //             <defs>
// //               {useGradientForText && (
// //                 <>
// //                   {isForegroundGradient ? (
// //                     (() => {
// //                       const parsed = foreground.startsWith('linear-gradient')
// //                         ? parseLinearGradient(foreground)
// //                         : parseRadialGradient(foreground);
// //                       if (!parsed) return null;
// //                       if (parsed.angle !== undefined) { // Linear
// //                         return (
// //                           <linearGradient
// //                             id="fgGrad"
// //                             x1="0"
// //                             y1="0"
// //                             x2="1"
// //                             y2="0"
// //                             gradientUnits="objectBoundingBox"
// //                             gradientTransform={`rotate(${parsed.angle}, 0.5, 0.5)`}
// //                           >
// //                             {parsed.colorStops.map((stop, i) => (
// //                               <stop
// //                                 key={i}
// //                                 offset={`${stop.offset}%`}
// //                                 stopColor={stop.color}
// //                               />
// //                             ))}
// //                           </linearGradient>
// //                         );
// //                       } else { // Radial
// //                         return (
// //                           <radialGradient
// //                             id="fgGrad"
// //                             cx="0.5"
// //                             cy="0.5"
// //                             r="0.5"
// //                             gradientUnits="objectBoundingBox"
// //                           >
// //                             {parsed.colorStops.map((stop, i) => (
// //                               <stop
// //                                 key={i}
// //                                 offset={`${stop.offset}%`}
// //                                 stopColor={stop.color}
// //                               />
// //                             ))}
// //                           </radialGradient>
// //                         );
// //                       }
// //                     })()
// //                   ) : useRadialGradientForeground ? (
// //                     <radialGradient
// //                       id="fgGrad"
// //                       cx="0.5"
// //                       cy="0.5"
// //                       r="0.5"
// //                       gradientUnits="objectBoundingBox"
// //                     >
// //                       {(() => {
// //                         const colors = radialGradientColorsForeground;
// //                         const stopsArr =
// //                           radialGradientStopsForeground.length === colors.length
// //                             ? radialGradientStopsForeground
// //                             : Array.from({ length: colors.length }, (_, i) =>
// //                                 Math.round((i / (colors.length - 1)) * 100)
// //                               );
// //                         return colors.map((color, i) => (
// //                           <stop
// //                             key={i}
// //                             offset={`${stopsArr[i]}%`}
// //                             stopColor={color}
// //                           />
// //                         ));
// //                       })()}
// //                     </radialGradient>
// //                   ) : (
// //                     <linearGradient
// //                       id="fgGrad"
// //                       x1="0"
// //                       y1="0"
// //                       x2="1"
// //                       y2="0"
// //                       gradientUnits="objectBoundingBox"
// //                       gradientTransform={`rotate(${gradientAngleForeground}, 0.5, 0.5)`}
// //                     >
// //                       {(() => {
// //                         const colors = gradientColorsForeground;
// //                         const stopsArr =
// //                           gradientStopsForeground.length === colors.length
// //                             ? gradientStopsForeground
// //                             : Array.from({ length: colors.length }, (_, i) =>
// //                                 Math.round((i / (colors.length - 1)) * 100)
// //                               );
// //                         return colors.map((color, i) => (
// //                           <stop
// //                             key={i}
// //                             offset={`${stopsArr[i]}%`}
// //                             stopColor={color}
// //                           />
// //                         ));
// //                       })()}
// //                     </linearGradient>
// //                   )}
// //                 </>
// //               )}
// //             </defs>

// //             {/* Grid lines */}
// //             {effectiveXAxisGridLines && 
// //               xTicks.map((x) => (
// //                 <line
// //                   key={`gx-${x}`}
// //                   x1={scaleX(x)}
// //                   y1={padding}
// //                   x2={scaleX(x)}
// //                   y2={svgDimensions.height - padding}
// //                   stroke={gridLineXColor}
// //                   strokeWidth={xAxisLineWidth}
// //                 />
// //               ))}
// //             {effectiveYAxisGridLines && 
// //               yTicks.map((y) => (
// //                 <line
// //                   key={`gy-${y}`}
// //                   x1={leftPadding}
// //                   y1={scaleY(y)}
// //                   x2={svgDimensions.width - padding}
// //                   y2={scaleY(y)}
// //                   stroke={gridLineYColor}
// //                   strokeWidth={yAxisLineWidth}
// //                 />
// //               ))}

// //             {/* Axes */}
// //             <line
// //               x1={leftPadding}
// //               y1={svgDimensions.height - padding}
// //               x2={svgDimensions.width - padding}
// //               y2={svgDimensions.height - padding}
// //               className="stroke-black"
// //             />
// //             <line
// //               x1={leftPadding}
// //               y1={padding}
// //               x2={leftPadding}
// //               y2={svgDimensions.height - padding}
// //               className="stroke-black"
// //             />

// //             {/* Smooth line with animation */}
// //             <path
// //               ref={pathRef}
// //               d={pathD}
// //               fill="none"
// //               stroke={color}
// //               strokeWidth={4}
// //               className="opacity-60"
// //             />

// //             {data.data.map((p, i) => (
// //               <g key={i}>
// //                 {(effectiveShowMarker || effectiveShowTooltip) && ( 
// //                   <circle
// //                     cx={scaleX(p.x)}
// //                     cy={scaleY(p.y)}
// //                     r={effectiveShowMarker ? markerSize : 8} 
// //                     fill={effectiveShowMarker ? color : "transparent"} 
// //                     className={
// //                       effectiveShowMarker 
// //                         ? "stroke-white cursor-pointer"
// //                         : "cursor-pointer"
// //                     }
// //                     stroke={effectiveShowMarker ? "white" : "none"} 
// //                     strokeWidth={effectiveShowMarker ? 1.5 : 0} 
// //                     onMouseEnter={() => handleMouseEnter(p)}
// //                     onMouseLeave={handleMouseLeave}
// //                   />
// //                 )}

// //                 {effectiveShowTooltip && 
// //                   hoveredPoint?.x === p.x &&
// //                   hoveredPoint?.y === p.y && (
// //                     <g>
// //                       {/* Tooltip background */}
// //                       <rect
// //                         x={scaleX(p.x) - 45}
// //                         y={scaleY(p.y) - 50}
// //                         width={100}
// //                         height={40}
// //                         fill="rgba(0,0,0,0.85)"
// //                         rx={8}
// //                       />

// //                       {/* Tooltip text */}
// //                       <text
// //                         x={scaleX(p.x) + 5}
// //                         y={scaleY(p.y) - 35}
// //                         fill="white"
// //                         textAnchor="middle"
// //                         fontSize="12"
// //                       >
// //                         <tspan
// //                           x={scaleX(p.x) + 5}
// //                           dy="0"
// //                           fontWeight="bold"
// //                           fontSize="13"
// //                         >
// //                           {data.title}
// //                         </tspan>
// //                         <tspan x={scaleX(p.x) + 5} dy="16" fontSize="12">
// //                           {`x: ${p.x}, y: ${p.y}`}
// //                         </tspan>
// //                       </text>
// //                     </g>
// //                   )}
// //               </g>
// //             ))}

// //             {/* Axis labels */}
// //             {effectiveXAxisLabel && 
// //               xTicks.map((x) => (
// //                 <text
// //                   key={`tx-${x}`}
// //                   x={scaleX(x)}
// //                   y={svgDimensions.height - padding + 20}
// //                   className="text-xs text-center"
// //                   textAnchor="middle"
// //                   fill={
// //                     useGradientForText
// //                       ? "url(#fgGrad)"
// //                       : effectiveForegroundColor
// //                   }
// //                 >
// //                   {x}
// //                 </text>
// //               ))}
// //             {effectiveYAxisLabel &&
// //               yTicks.map((y) => (
// //                 <text
// //                   key={`ty-${y}`}
// //                   x={leftPadding - 10}
// //                   y={scaleY(y) + 4}
// //                   className="text-xs text-right"
// //                   textAnchor="end"
// //                   fill={
// //                     useGradientForText
// //                       ? "url(#fgGrad)"
// //                       : effectiveForegroundColor
// //                   }
// //                 >
// //                   {y.toFixed(1)}
// //                 </text>
// //               ))}
// //           </svg>
// //           {effectiveShowLegend && (
// //             <div className="flex items-center justify-center mt-4 gap-2">
// //               <div
// //                 className="w-3 h-3 rounded opacity-60"
// //                 style={{ backgroundColor: color }}
// //               />
// //               <span className="text-xs" style={titleTextStyle}>
// //                 {data.title}
// //               </span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // QLineChart.propTypes = {
// //   data: PropTypes.shape({
// //     title: PropTypes.string.isRequired,
// //     data: PropTypes.arrayOf(
// //       PropTypes.shape({
// //         x: PropTypes.number.isRequired,
// //         y: PropTypes.number.isRequired,
// //       })
// //     ).isRequired,
// //   }).isRequired,

// //   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// //   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// //   xMin: PropTypes.number,
// //   xMax: PropTypes.number,
// //   yMin: PropTypes.number,
// //   yMax: PropTypes.number,
// //   color: PropTypes.string,
// //   minWidth: PropTypes.string,
// //   maxWidth: PropTypes.string,
// //   minHeight: PropTypes.string,
// //   maxHeight: PropTypes.string,
// //   showLegend: PropTypes.bool,
// //   showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   showMarker: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   markerSize: PropTypes.number,
// //   xAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   yAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   xAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// //   yAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// //   gridLineXColor: PropTypes.string,
// //   gridLineYColor: PropTypes.string,
// //   xAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   yAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
// //   borderAll: PropTypes.number,
// //   borderTop: PropTypes.number,
// //   borderRight: PropTypes.number,
// //   borderBottom: PropTypes.number,
// //   borderLeft: PropTypes.number,
// //   borderColor: PropTypes.string,
// //   borderStyle: PropTypes.string,
// //   borderTopColor: PropTypes.string,
// //   borderRightColor: PropTypes.string,
// //   borderBottomColor: PropTypes.string,
// //   borderLeftColor: PropTypes.string,
// //   borderRadiusAll: PropTypes.number,
// //   borderRadiusTopLeft: PropTypes.number,
// //   borderRadiusTopRight: PropTypes.number,
// //   borderRadiusBottomRight: PropTypes.number,
// //   borderRadiusBottomLeft: PropTypes.number,
// //   boxShadow: PropTypes.string,
// //   boxShadowColor: PropTypes.string,
// //   boxShadowOffsetX: PropTypes.number,
// //   boxShadowOffsetY: PropTypes.number,
// //   boxShadowBlurRadius: PropTypes.number,
// //   boxShadowSpreadRadius: PropTypes.number,
// //   paddingAll: PropTypes.number,
// //   paddingTop: PropTypes.number,
// //   paddingRight: PropTypes.number,
// //   paddingBottom: PropTypes.number,
// //   paddingLeft: PropTypes.number,
// //   marginAll: PropTypes.number,
// //   marginTop: PropTypes.number,
// //   marginRight: PropTypes.number,
// //   marginBottom: PropTypes.number,
// //   marginLeft: PropTypes.number,
// //   bgColor: PropTypes.string,
// //   useLinearGradient: PropTypes.bool,
// //   gradientColors: PropTypes.arrayOf(PropTypes.string),
// //   gradientAngle: PropTypes.number,
// //   gradientStops: PropTypes.arrayOf(PropTypes.number),
// //   useRadialGradient: PropTypes.bool,
// //   radialGradientColors: PropTypes.arrayOf(PropTypes.string),
// //   radialGradientStops: PropTypes.arrayOf(PropTypes.number),
// //   bgUrl: PropTypes.string,
// //   backgroundSize: PropTypes.string,
// //   seoAlt: PropTypes.string,
// //   seoTitle: PropTypes.string,
// //   backgroundRepeat: PropTypes.string,
// //   useLinearGradientForeground: PropTypes.bool,
// //   gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
// //   gradientAngleForeground: PropTypes.number,
// //   gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
// //   useRadialGradientForeground: PropTypes.bool,
// //   radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
// //   radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
// //   foreground: PropTypes.string,
// //   alignment: PropTypes.string,
// //   tailwindClasses: PropTypes.string,
// // };

// // export default QLineChart;
// // QLineChart.displayName = "QLineChart";





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

// const QLineChart = ({
//   data = {
//     title: "Product A",
//     data: [
//       { x: 1, y: 80 },
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

//   //in px, vw/vh, %
//   minWidth = "10px",
//   maxWidth = "100vw",
//   minHeight = "none",
//   maxHeight = "100%",

//   showLegend, // toggle the title
//   showTooltip = "true",
//   showMarker, // toggle marker points
//   markerSize = 14, // marker point size in px

//   xAxisGridLines = "true", // show/hide grid in X axis
//   yAxisGridLines = "true", // show/hide grid in Y axis

//   xAxisLineWidth = "1",
//   yAxisLineWidth = "1",
//   gridLineXColor = "#808080",
//   gridLineYColor = "#808080",

//   //show and hide X and Y label
//   xAxisLabel = "true",
//   yAxisLabel = "true",

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
//   borderRadiusAll = 0, //set radius for all the corners together
//   //change each corner of the container
//   borderRadiusTopLeft = 0,
//   borderRadiusTopRight = 0,
//   borderRadiusBottomRight = 0,
//   borderRadiusBottomLeft = 0,

//   //==Box Shadow props for overall chart container
//   boxShadow = "",
//   boxShadowColor,
//   boxShadowOffsetX = 0,
//   boxShadowOffsetY = 0,
//   boxShadowBlurRadius = 0,
//   boxShadowSpreadRadius = 0,

//   //Padding props for inside the border
//   paddingAll = 0,
//   paddingTop = 0,
//   paddingRight = 0,
//   paddingBottom = 0,
//   paddingLeft = 0,

//   //Margin props for outside the border
//   marginAll = 0,
//   marginTop = 0,
//   marginRight = 0,
//   marginBottom = 0,
//   marginLeft = 0,

//   //Background color inside the border
//   bgColor,
//   //============Linear Gradient Background props
//   useLinearGradient = false,
//   gradientColors = ["pink", "white"],
//   gradientAngle = 0,
//   gradientStops = [20, 90],
//   //=====Radial Gradient Background props
//   useRadialGradient = false,
//   radialGradientColors = ["pink", "pink", "white"],
//   radialGradientStops = [10, 40, 90],

//   //======Background Image props
//   bgUrl,
//   backgroundSize = "cover", //none, cover, contain, fill, fit-height, fit-width
//   seoAlt = "test img",
//   seoTitle = "image title",
//   backgroundRepeat = "repeat", //repeat X, repeat Y, repeat, none

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
//   tailwindClasses,
// }) => {
//   const [hoveredPoint, setHoveredPoint] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [svgDimensions, setSvgDimensions] = useState({ width: 560, height: 400 });
//   const pathRef = useRef(null);
//   const containerRef = useRef(null);
//   const svgRef = useRef(null);

//   // Coerce string values to booleans for all toggle props
//   const effectiveShowLegend = showLegend === "true" || showLegend === true;
//   const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
//   const effectiveShowMarker = showMarker === "true" || showMarker === true;
//   const effectiveXAxisGridLines = xAxisGridLines === "true" || xAxisGridLines === true;
//   const effectiveYAxisGridLines = yAxisGridLines === "true" || yAxisGridLines === true;
//   const effectiveXAxisLabel = xAxisLabel === "true" || xAxisLabel === true;
//   const effectiveYAxisLabel = yAxisLabel === "true" || yAxisLabel === true;

//   const applyInlineSizing = !tailwindClasses;
//   const applyInlinePadding = !tailwindClasses;
//   const applyInlineMargin = !tailwindClasses;
//   const applyInlineBorders = !tailwindClasses; // to prioritize Tailwind for borders/radii/shadows

//   // Compute effective min/max to encompass data and avoid clipping/distortion
//   const dataXValues = data.data.map((d) => d.x);
//   const dataYValues = data.data.map((d) => d.y);
//   const dataXMin = Math.min(...dataXValues);
//   const dataXMax = Math.max(...dataXValues);
//   const dataYMin = Math.min(...dataYValues);
//   const dataYMax = Math.max(...dataYValues);

//   let effectiveXMin = Math.min(xMin, dataXMin);
//   let effectiveXMax = Math.max(xMax, dataXMax);
//   let effectiveYMin = Math.min(yMin, dataYMin);
//   let effectiveYMax = Math.max(yMax, dataYMax);

//   // Ensure range is valid to avoid division by zero
//   if (effectiveXMax === effectiveXMin) effectiveXMax = effectiveXMin + 1;
//   if (effectiveYMax === effectiveYMin) effectiveYMax = effectiveYMin + 1;

//   // Compute effective box shadow (full string or constructed fallback)
//   const effectiveBoxShadow = boxShadow ||
//     (boxShadowColor ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}` : undefined);

//   // Handle bgColor as solid, linear, or radial gradient
//   let chartBgColor = "transparent";
//   let chartBgImage = "";
//   if (bgColor) {
//     if (bgColor.trim().startsWith("linear-gradient(") || bgColor.trim().startsWith("radial-gradient(")) {
//       chartBgImage = bgColor;
//       chartBgColor = "transparent";
//     } else {
//       chartBgColor = bgColor;
//     }
//   }
//   // Fallback to gradient props
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
//   if (!chartBgImage && fallbackBgImage) {
//     chartBgImage = fallbackBgImage;
//   }
//   // Handle background image URL
//   if (bgUrl) {
//     const imgUrl = `url(${bgUrl})`;
//     chartBgImage = chartBgImage ? `${imgUrl}, ${chartBgImage}` : imgUrl;
//   }

//   //foreground
//   const effectiveForegroundColor = foreground || "#374151";
//   const isForegroundGradient = typeof foreground === 'string' && (foreground.startsWith('linear-gradient(') || foreground.startsWith('radial-gradient('));
//   const useGradientForText =
//     useLinearGradientForeground || useRadialGradientForeground || isForegroundGradient;
//   const getForegroundGradientCSS = () => {
//     if (isForegroundGradient) {
//       return foreground;
//     }
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
//     color: useGradientForText ? "#d3d3d3" : effectiveForegroundColor,
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
//       "fitHeight": "auto 100%",
//       "fitWidth": "100% auto",
//     };
//     return map[fit] || "auto";
//   };

//   const getBackgroundRepeat = (rep) => {
//     const map = {
//       none: "no-repeat",
//       "repeatX": "repeat-x",
//       "repeatY": "repeat-y",
//       repeat: "repeat",
//     };
//     return map[rep] || "no-repeat";
//   };

//   if (!data || !data.data || data.data.length === 0)
//     return <div className="text-red-500">No data</div>;

//   // effective borders to be 0 when using Tailwind to avoid miscalculations
//   const effectiveBorderTop = applyInlineBorders ? (borderTop || borderAll || 0) : 0;
//   const effectiveBorderRight = applyInlineBorders ? (borderRight || borderAll || 0) : 0;
//   const effectiveBorderBottom = applyInlineBorders ? (borderBottom || borderAll || 0) : 0;
//   const effectiveBorderLeft = applyInlineBorders ? (borderLeft || borderAll || 0) : 0;

//   const effectivePaddingTop = applyInlinePadding ? (paddingTop || paddingAll || 0) : 0;
//   const effectivePaddingRight = applyInlinePadding ? (paddingRight || paddingAll || 0) : 0;
//   const effectivePaddingBottom = applyInlinePadding ? (paddingBottom || paddingAll || 0) : 0;
//   const effectivePaddingLeft = applyInlinePadding ? (paddingLeft || paddingAll || 0) : 0;

//   const effectiveMarginTop = applyInlineMargin ? (marginTop || marginAll || 0) : 0;
//   const effectiveMarginRight = applyInlineMargin ? (marginRight || marginAll || 0) : 0;
//   const effectiveMarginBottom = applyInlineMargin ? (marginBottom || marginAll || 0) : 0;
//   const effectiveMarginLeft = applyInlineMargin ? (marginLeft || marginAll || 0) : 0;

//   const marginStyle = applyInlineMargin ? {
//     marginTop: `${effectiveMarginTop}px`,
//     marginRight: `${effectiveMarginRight}px`,
//     marginBottom: `${effectiveMarginBottom}px`,
//     marginLeft: `${effectiveMarginLeft}px`,
//   } : {};

//   const getSizedValue = (value) => {
//     if (value === undefined || value === null) return undefined;
//     if (typeof value === "number") return `${value}px`;
//     return value.toString();
//   };

//   const borderedContainerStyle = {
//     ...(applyInlineSizing && {
//       width: getSizedValue(width),
//       height: getSizedValue(height),
//       minWidth: getSizedValue(minWidth),
//       maxWidth: getSizedValue(maxWidth),
//       minHeight: getSizedValue(minHeight),
//       maxHeight: getSizedValue(maxHeight),
//     }),
//     boxSizing: "border-box",
//     ...(applyInlineBorders && {  // Skip if using Tailwind
//       borderTopWidth: `${effectiveBorderTop}px`,
//       borderRightWidth: `${effectiveBorderRight}px`,
//       borderBottomWidth: `${effectiveBorderBottom}px`,
//       borderLeftWidth: `${effectiveBorderLeft}px`,
//       borderTopColor: borderTopColor || borderColor,
//       borderRightColor: borderRightColor || borderColor,
//       borderBottomColor: borderBottomColor || borderColor,
//       borderLeftColor: borderLeftColor || borderColor,
//       borderStyle: borderStyle === "none" ? "none" : borderStyle,
//       borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
//       borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
//       borderBottomRightRadius: `${
//         borderRadiusBottomRight || borderRadiusAll || 0
//       }px`,
//       borderBottomLeftRadius: `${
//         borderRadiusBottomLeft || borderRadiusAll || 0
//       }px`,
//     }),
//     // Use effectiveBoxShadow (supports full string or fallback) - applied unconditionally to match QAreaChart behavior
//     ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     ...(applyInlinePadding && {
//       paddingTop: `${effectivePaddingTop}px`,
//       paddingRight: `${effectivePaddingRight}px`,
//       paddingBottom: `${effectivePaddingBottom}px`,
//       paddingLeft: `${effectivePaddingLeft}px`,
//     }),
//     backgroundColor: chartBgColor,
//     ...(chartBgImage && { backgroundImage: chartBgImage }),
//     ...(bgUrl && {
//       backgroundRepeat: getBackgroundRepeat(backgroundRepeat),
//       backgroundSize: getBackgroundSize(backgroundSize),
//       backgroundPosition: "center center",
//     }),
//   };

//   // Dynamic padding based on size to avoid clipping
//   const basePadding = 60;
//   const dynamicPadding = Math.max(20, Math.min(basePadding, svgDimensions.width * 0.1, svgDimensions.height * 0.1));
//   const padding = dynamicPadding;
//   // Separate left padding to ensure space for Y-axis labels without clipping
//   const leftPadding = Math.max(50, dynamicPadding);

//   const scaleX = (x) =>
//     ((x - effectiveXMin) / (effectiveXMax - effectiveXMin)) *
//       (svgDimensions.width - leftPadding - padding) +
//     leftPadding;
//   const scaleY = (y) =>
//     svgDimensions.height -
//     padding -
//     ((y - effectiveYMin) / (effectiveYMax - effectiveYMin)) *
//       (svgDimensions.height - 2 * padding);

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
//         pathRef.current.style.transition = "stroke-dashoffset 2s ease-in-out";
//         pathRef.current.style.strokeDashoffset = "0";
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

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (svgRef.current) {
//         const rect = svgRef.current.getBoundingClientRect();
//         setSvgDimensions({ width: rect.width, height: rect.height });
//       }
//     };

//     // Initial update
//     if (svgRef.current) {
//       updateDimensions();
//     }

//     // Resize observer
//     const resizeObserver = new ResizeObserver(updateDimensions);
//     if (svgRef.current) {
//       resizeObserver.observe(svgRef.current);
//     }

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, [effectiveShowLegend, tailwindClasses]);

//   const xTicks = useMemo(
//     () =>
//       Array.from(
//         { length: Math.floor(effectiveXMax - effectiveXMin) + 1 },
//         (_, i) => effectiveXMin + i
//       ),
//     [effectiveXMin, effectiveXMax]
//   );

//   const numYTicks = 6;
//   const yStep = (effectiveYMax - effectiveYMin) / (numYTicks - 1);
//   const yTicks = useMemo(
//     () =>
//       Array.from({ length: numYTicks }, (_, i) =>
//         Math.round(effectiveYMin + i * yStep)
//       ),
//     [effectiveYMin, effectiveYMax]
//   );

//   // Add console logs to debug hover state
//   const handleMouseEnter = (p) => {
//     console.log("Mouse Enter:", p);
//     setHoveredPoint(p);
//   };

//   const handleMouseLeave = () => {
//     console.log("Mouse Leave");
//     setHoveredPoint(null);
//   };

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

//   if (svgDimensions.width <= 0 || svgDimensions.height <= 0)
//     return <div className="text-red-500">Insufficient space</div>;

//   return (
//     <div
//       ref={containerRef}
//       className={`relative flex flex-col ${outerItemsClass}`}
//     >
//       <div style={marginStyle}>
//         <div
//           style={borderedContainerStyle}
//           className={tailwindClasses || ''}
//           title={seoTitle}
//           aria-label={seoAlt}
//         >
//           <svg
//             ref={svgRef}
//             width="100%"
//             height={effectiveShowLegend ? "auto" : "100%"}
//             viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
//             preserveAspectRatio="xMidYMid meet"
//             style={{
//               flex: effectiveShowLegend ? 1 : undefined,
//               width: "100%",
//               height: "100%",
//             }}
//             className=""
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
//                   ) : useRadialGradientForeground ? (
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
//             {effectiveXAxisGridLines && 
//               xTicks.map((x) => (
//                 <line
//                   key={`gx-${x}`}
//                   x1={scaleX(x)}
//                   y1={padding}
//                   x2={scaleX(x)}
//                   y2={svgDimensions.height - padding}
//                   stroke={gridLineXColor}
//                   strokeWidth={xAxisLineWidth}
//                 />
//               ))}
//             {effectiveYAxisGridLines && 
//               yTicks.map((y) => (
//                 <line
//                   key={`gy-${y}`}
//                   x1={leftPadding}
//                   y1={scaleY(y)}
//                   x2={svgDimensions.width - padding}
//                   y2={scaleY(y)}
//                   stroke={gridLineYColor}
//                   strokeWidth={yAxisLineWidth}
//                 />
//               ))}

//             {/* Axes */}
//             <line
//               x1={leftPadding}
//               y1={svgDimensions.height - padding}
//               x2={svgDimensions.width - padding}
//               y2={svgDimensions.height - padding}
//               className="stroke-black"
//             />
//             <line
//               x1={leftPadding}
//               y1={padding}
//               x2={leftPadding}
//               y2={svgDimensions.height - padding}
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
//                 {(effectiveShowMarker || effectiveShowTooltip) && ( 
//                   <circle
//                     cx={scaleX(p.x)}
//                     cy={scaleY(p.y)}
//                     r={effectiveShowMarker ? markerSize : 8} 
//                     fill={effectiveShowMarker ? color : "transparent"} 
//                     className={
//                       effectiveShowMarker 
//                         ? "stroke-white cursor-pointer"
//                         : "cursor-pointer"
//                     }
//                     stroke={effectiveShowMarker ? "white" : "none"} 
//                     strokeWidth={effectiveShowMarker ? 1.5 : 0} 
//                     onMouseEnter={() => handleMouseEnter(p)}
//                     onMouseLeave={handleMouseLeave}
//                   />
//                 )}

//                 {effectiveShowTooltip && 
//                   hoveredPoint?.x === p.x &&
//                   hoveredPoint?.y === p.y && (
//                     <g>
//                       {/* Tooltip background */}
//                       <rect
//                         x={scaleX(p.x) - 45}
//                         y={scaleY(p.y) - 50}
//                         width={100}
//                         height={40}
//                         fill="rgba(0,0,0,0.85)"
//                         rx={8}
//                       />

//                       {/* Tooltip text */}
//                       <text
//                         x={scaleX(p.x) + 5}
//                         y={scaleY(p.y) - 35}
//                         fill="white"
//                         textAnchor="middle"
//                         fontSize="12"
//                       >
//                         <tspan
//                           x={scaleX(p.x) + 5}
//                           dy="0"
//                           fontWeight="bold"
//                           fontSize="13"
//                         >
//                           {data.title}
//                         </tspan>
//                         <tspan x={scaleX(p.x) + 5} dy="16" fontSize="12">
//                           {`x: ${p.x}, y: ${p.y}`}
//                         </tspan>
//                       </text>
//                     </g>
//                   )}
//               </g>
//             ))}

//             {/* Axis labels */}
//             {effectiveXAxisLabel && 
//               xTicks.map((x) => (
//                 <text
//                   key={`tx-${x}`}
//                   x={scaleX(x)}
//                   y={svgDimensions.height - padding + 20}
//                   className="text-xs text-center"
//                   textAnchor="middle"
//                   fill={
//                     useGradientForText
//                       ? "url(#fgGrad)"
//                       : effectiveForegroundColor
//                   }
//                 >
//                   {x}
//                 </text>
//               ))}
//             {effectiveYAxisLabel &&
//               yTicks.map((y) => (
//                 <text
//                   key={`ty-${y}`}
//                   x={leftPadding - 10}
//                   y={scaleY(y) + 4}
//                   className="text-xs text-right"
//                   textAnchor="end"
//                   fill={
//                     useGradientForText
//                       ? "url(#fgGrad)"
//                       : effectiveForegroundColor
//                   }
//                 >
//                   {y.toFixed(1)}
//                 </text>
//               ))}
//           </svg>
//           {effectiveShowLegend && (
//             <div className="flex items-center justify-center mt-4 gap-2">
//               <div
//                 className="w-3 h-3 rounded opacity-60"
//                 style={{ backgroundColor: color }}
//               />
//               <span className="text-xs" style={titleTextStyle}>
//                 {data.title}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// QLineChart.propTypes = {
//   data: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         x: PropTypes.number.isRequired,
//         y: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,

//   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   xMin: PropTypes.number,
//   xMax: PropTypes.number,
//   yMin: PropTypes.number,
//   yMax: PropTypes.number,
//   color: PropTypes.string,
//   minWidth: PropTypes.string,
//   maxWidth: PropTypes.string,
//   minHeight: PropTypes.string,
//   maxHeight: PropTypes.string,
//   showLegend: PropTypes.bool,
//   showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   showMarker: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   markerSize: PropTypes.number,
//   xAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   yAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   xAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   yAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   gridLineXColor: PropTypes.string,
//   gridLineYColor: PropTypes.string,
//   xAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
//   yAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
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
//   boxShadowColor: PropTypes.string,
//   boxShadowOffsetX: PropTypes.number,
//   boxShadowOffsetY: PropTypes.number,
//   boxShadowBlurRadius: PropTypes.number,
//   boxShadowSpreadRadius: PropTypes.number,
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
//   useLinearGradient: PropTypes.bool,
//   gradientColors: PropTypes.arrayOf(PropTypes.string),
//   gradientAngle: PropTypes.number,
//   gradientStops: PropTypes.arrayOf(PropTypes.number),
//   useRadialGradient: PropTypes.bool,
//   radialGradientColors: PropTypes.arrayOf(PropTypes.string),
//   radialGradientStops: PropTypes.arrayOf(PropTypes.number),
//   bgUrl: PropTypes.string,
//   backgroundSize: PropTypes.string,
//   seoAlt: PropTypes.string,
//   seoTitle: PropTypes.string,
//   backgroundRepeat: PropTypes.string,
//   useLinearGradientForeground: PropTypes.bool,
//   gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   gradientAngleForeground: PropTypes.number,
//   gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   useRadialGradientForeground: PropTypes.bool,
//   radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
//   radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
//   foreground: PropTypes.string,
//   childAlign: PropTypes.string,
//   tailwindClasses: PropTypes.string,
// };

// export default QLineChart;
// QLineChart.displayName = "QLineChart";










// Latest Version of QLineChart
import PropTypes from "prop-types";
import React, { useMemo, useState, useRef, useEffect } from "react";

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

const parseRadialGradient = (gradientStr) => {
  if (!gradientStr || !gradientStr.startsWith('radial-gradient')) return null;
  const match = gradientStr.match(/^radial-gradient\s*\(\s*([^,]+)\s*,\s*(.+)\s*\)$/);
  if (!match) return null;
  const shapeStr = match[1].trim(); //"circle at center"
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
  return { shape: shapeStr, colorStops };
};

const QLineChart = ({
  data = {
    title: "Product A",
    data: [
      { x: 1, y: 80 },
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
  width,
  height,
  xMin = 1,
  xMax = 10,
  yMin = 0,
  yMax = 100,
  color = "#4A90E2", //graph line color

  //in px, vw/vh, %
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,

  showLegend, // toggle the title
  showTooltip,
  showMarker, // toggle marker points
  markerSize, // marker point size in px

  xAxisGridLines, // show/hide grid in X axis
  yAxisGridLines, // show/hide grid in Y axis

  xAxisLineWidth,
  yAxisLineWidth,
  gridLineXColor = "#808080",
  gridLineYColor = "#808080",

  //show and hide X and Y label
  xAxisLabel,
  yAxisLabel,

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

  //==Box Shadow props for overall chart container
  boxShadow,
  boxShadowColor,
  boxShadowOffsetX,
  boxShadowOffsetY,
  boxShadowBlurRadius,
  boxShadowSpreadRadius,

  // Text shadow for title and labels (added for parity)
  textShadow,

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
  //============Linear Gradient Background props
  useLinearGradient,
  gradientColors,
  gradientAngle,
  gradientStops,
  //=====Radial Gradient Background props
  useRadialGradient,
  radialGradientColors,
  radialGradientStops,

  //======Background Image props
  bgUrl,
  backgroundSize, //none, cover, contain, fill, fit-height, fit-width
  seoAlt,
  seoTitle,
  backgroundRepeat, //repeat X, repeat Y, repeat, none

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
  tailwindClasses,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState({ width: 560, height: 400 - (showLegend === "true" || showLegend === true ? 40 : 0) }); // Subtract titleSpace initially
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' }); // New: Tooltip state
  const pathRef = useRef(null);
  const containerRef = useRef(null); // For positioning
  const svgRef = useRef(null);

  // Coerce string values to booleans for all toggle props
  const effectiveShowLegend = showLegend === "true" || showLegend === true;
  const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
  const effectiveShowMarker = showMarker === "true" || showMarker === true;
  const effectiveXAxisGridLines = xAxisGridLines === "true" || xAxisGridLines === true;
  const effectiveYAxisGridLines = yAxisGridLines === "true" || yAxisGridLines === true;
  const effectiveXAxisLabel = xAxisLabel === "true" || xAxisLabel === true;
  const effectiveYAxisLabel = yAxisLabel === "true" || yAxisLabel === true;

  const applyInlineSizing = !tailwindClasses;
  const applyInlinePadding = !tailwindClasses;
  const applyInlineMargin = !tailwindClasses;
  const applyInlineBorders = !tailwindClasses; // to prioritize Tailwind for borders/radii/shadows

  // Compute effective min/max to encompass data and avoid clipping/distortion
  const dataXValues = data.data.map((d) => d.x);
  const dataYValues = data.data.map((d) => d.y);
  const dataXMin = Math.min(...dataXValues);
  const dataXMax = Math.max(...dataXValues);
  const dataYMin = Math.min(...dataYValues);
  const dataYMax = Math.max(...dataYValues);

  let effectiveXMin = Math.min(xMin, dataXMin);
  let effectiveXMax = Math.max(xMax, dataXMax);
  let effectiveYMin = Math.min(yMin, dataYMin);
  let effectiveYMax = Math.max(yMax, dataYMax);

  // Ensure range is valid to avoid division by zero
  if (effectiveXMax === effectiveXMin) effectiveXMax = effectiveXMin + 1;
  if (effectiveYMax === effectiveYMin) effectiveYMax = effectiveYMin + 1;

  // Compute effective box shadow (full string or constructed fallback)
  const effectiveBoxShadow = boxShadow ||
    (boxShadowColor ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}` : undefined);

  // Handle bgColor as solid, linear, or radial gradient
  let chartBgColor = "transparent";
  let chartBgImage = "";
  if (bgColor) {
    if (bgColor.trim().startsWith("linear-gradient(") || bgColor.trim().startsWith("radial-gradient(")) {
      chartBgImage = bgColor;
      chartBgColor = "transparent";
    } else {
      chartBgColor = bgColor;
    }
  }
  // Fallback to gradient props
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
  if (!chartBgImage && fallbackBgImage) {
    chartBgImage = fallbackBgImage;
  }
  // Handle background image URL
  if (bgUrl) {
    const imgUrl = `url(${bgUrl})`;
    chartBgImage = chartBgImage ? `${imgUrl}, ${chartBgImage}` : imgUrl;
  }

  //foreground
  const effectiveForegroundColor = foreground || "#374151";
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
  const titleTextStyle = {
    color: useGradientForText ? "transparent" : effectiveForegroundColor, // Fixed: Use "transparent" for gradient clip
    textShadow: textShadow, // Added support
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
      "fitHeight": "auto 100%",
      "fitWidth": "100% auto",
    };
    return map[fit] || "auto";
  };

  const getBackgroundRepeat = (rep) => {
    const map = {
      none: "no-repeat",
      "repeatX": "repeat-x",
      "repeatY": "repeat-y",
      repeat: "repeat",
    };
    return map[rep] || "no-repeat";
  };

  if (!data || !data.data || data.data.length === 0)
    return <div className="text-red-500">No data</div>;

  // effective borders to be 0 when using Tailwind to avoid miscalculations
  const effectiveBorderTop = applyInlineBorders ? (borderTop || borderAll || 0) : 0;
  const effectiveBorderRight = applyInlineBorders ? (borderRight || borderAll || 0) : 0;
  const effectiveBorderBottom = applyInlineBorders ? (borderBottom || borderAll || 0) : 0;
  const effectiveBorderLeft = applyInlineBorders ? (borderLeft || borderAll || 0) : 0;

  const effectivePaddingTop = applyInlinePadding ? (paddingTop || paddingAll || 0) : 0;
  const effectivePaddingRight = applyInlinePadding ? (paddingRight || paddingAll || 0) : 0;
  const effectivePaddingBottom = applyInlinePadding ? (paddingBottom || paddingAll || 0) : 0;
  const effectivePaddingLeft = applyInlinePadding ? (paddingLeft || paddingAll || 0) : 0;

  const effectiveMarginTop = applyInlineMargin ? (marginTop || marginAll || 0) : 0;
  const effectiveMarginRight = applyInlineMargin ? (marginRight || marginAll || 0) : 0;
  const effectiveMarginBottom = applyInlineMargin ? (marginBottom || marginAll || 0) : 0;
  const effectiveMarginLeft = applyInlineMargin ? (marginLeft || marginAll || 0) : 0;

  const marginStyle = applyInlineMargin ? {
    marginTop: `${effectiveMarginTop}px`,
    marginRight: `${effectiveMarginRight}px`,
    marginBottom: `${effectiveMarginBottom}px`,
    marginLeft: `${effectiveMarginLeft}px`,
  } : {};

  const getSizedValue = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === "number") return `${value}px`;
    return value.toString();
  };

  const borderedContainerStyle = {
    ...(applyInlineSizing && {
      width: getSizedValue(width),
      height: getSizedValue(height),
      minWidth: getSizedValue(minWidth),
      maxWidth: getSizedValue(maxWidth),
      minHeight: getSizedValue(minHeight),
      maxHeight: getSizedValue(maxHeight),
    }),
    boxSizing: "border-box",
    ...(applyInlineBorders && {  // Skip if using Tailwind
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
      borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
      borderBottomRightRadius: `${
        borderRadiusBottomRight || borderRadiusAll || 0
      }px`,
      borderBottomLeftRadius: `${
        borderRadiusBottomLeft || borderRadiusAll || 0
      }px`,
    }),
    // Use effectiveBoxShadow (supports full string or fallback) - applied unconditionally to match QAreaChart behavior
    ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative", // New: For absolute tooltip positioning
    ...(applyInlinePadding && {
      paddingTop: `${effectivePaddingTop}px`,
      paddingRight: `${effectivePaddingRight}px`,
      paddingBottom: `${effectivePaddingBottom}px`,
      paddingLeft: `${effectivePaddingLeft}px`,
    }),
    backgroundColor: chartBgColor,
    ...(chartBgImage && { backgroundImage: chartBgImage }),
    ...(bgUrl && {
      backgroundRepeat: getBackgroundRepeat(backgroundRepeat),
      backgroundSize: getBackgroundSize(backgroundSize),
      backgroundPosition: "center center",
    }),
  };

  // Dynamic padding based on size to avoid clipping
  const basePadding = 60;
  const dynamicPadding = Math.max(20, Math.min(basePadding, svgDimensions.width * 0.1, svgDimensions.height * 0.1));
  const padding = dynamicPadding;
  // Separate left padding to ensure space for Y-axis labels without clipping
  const leftPadding = Math.max(50, dynamicPadding);

  const scaleX = (x) =>
    ((x - effectiveXMin) / (effectiveXMax - effectiveXMin)) *
      (svgDimensions.width - leftPadding - padding) +
    leftPadding;
  const scaleY = (y) =>
    svgDimensions.height -
    padding -
    ((y - effectiveYMin) / (effectiveYMax - effectiveYMin)) *
      (svgDimensions.height - 2 * padding);

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
        pathRef.current.style.transition = "stroke-dashoffset 2s ease-in-out";
        pathRef.current.style.strokeDashoffset = "0";
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

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setSvgDimensions({ width: rect.width, height: rect.height });
      }
    };

    // Initial update
    if (svgRef.current) {
      updateDimensions();
    }

    // Resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [effectiveShowLegend, tailwindClasses]);

  const xTicks = useMemo(
    () =>
      Array.from(
        { length: Math.floor(effectiveXMax - effectiveXMin) + 1 },
        (_, i) => effectiveXMin + i
      ),
    [effectiveXMin, effectiveXMax]
  );

  const numYTicks = 6;
  const yStep = (effectiveYMax - effectiveYMin) / (numYTicks - 1);
  const yTicks = useMemo(
    () =>
      Array.from({ length: numYTicks }, (_, i) =>
        Math.round(effectiveYMin + i * yStep)
      ),
    [effectiveYMin, effectiveYMax]
  );

  // Updated: Handle mouse enter with event for positioning
  const handleMouseEnter = (p, e) => {
    if (!effectiveShowTooltip) return;
    const rect = containerRef.current.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    // Dynamic adjustment: Flip if near edges
    const tooltipWidth = 120; // Est. width
    const tooltipHeight = 50; // Est. height
    if (mouseX + tooltipWidth > svgDimensions.width) mouseX -= tooltipWidth;
    if (mouseY + tooltipHeight > svgDimensions.height) mouseY -= tooltipHeight;
    if (mouseX < 0) mouseX = 10;
    if (mouseY < 0) mouseY = 10;
    setTooltip({
      visible: true,
      x: mouseX,
      y: mouseY,
      content: (
        <div>
          <div className="font-bold mb-1">{data.title}</div>
          <div>x: {p.x}, y: {p.y}</div>
        </div>
      )
    });
    setHoveredPoint(p);
  };

  const handleMouseMove = (e) => {
    if (!tooltip.visible) return;
    const rect = containerRef.current.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    // Same dynamic adjustment
    const tooltipWidth = 120;
    const tooltipHeight = 50;
    if (mouseX + tooltipWidth > svgDimensions.width) mouseX -= tooltipWidth;
    if (mouseY + tooltipHeight > svgDimensions.height) mouseY -= tooltipHeight;
    if (mouseX < 0) mouseX = 10;
    if (mouseY < 0) mouseY = 10;
    setTooltip(prev => ({ ...prev, x: mouseX, y: mouseY }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' });
    setHoveredPoint(null);
  };

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

  if (svgDimensions.width <= 0 || svgDimensions.height <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${outerItemsClass}`}
    >
      <div style={marginStyle}>
        <div
          style={borderedContainerStyle}
          className={tailwindClasses || ''}
          title={seoTitle}
          aria-label={seoAlt}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"  // Fixed: Always "100%" to avoid invalid "auto"
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              flex: effectiveShowLegend ? 1 : undefined,
              width: "100%",
              height: "100%",
            }}
            className=""
            onMouseLeave={handleMouseLeave} // Global leave for tooltip
          >
            <defs>
              {useGradientForText && (
                <>
                  {isForegroundGradient ? (
                    (() => {
                      const parsed = foreground.startsWith('linear-gradient')
                        ? parseLinearGradient(foreground)
                        : parseRadialGradient(foreground);
                      if (!parsed) return null;
                      if (parsed.angle !== undefined) { // Linear
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
                      } else { // Radial
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

            {/* Grid lines */}
            {effectiveXAxisGridLines && 
              xTicks.map((x) => (
                <line
                  key={`gx-${x}`}
                  x1={scaleX(x)}
                  y1={padding}
                  x2={scaleX(x)}
                  y2={svgDimensions.height - padding}
                  stroke={gridLineXColor}
                  strokeWidth={xAxisLineWidth}
                />
              ))}
            {effectiveYAxisGridLines && 
              yTicks.map((y) => (
                <line
                  key={`gy-${y}`}
                  x1={leftPadding}
                  y1={scaleY(y)}
                  x2={svgDimensions.width - padding}
                  y2={scaleY(y)}
                  stroke={gridLineYColor}
                  strokeWidth={yAxisLineWidth}
                />
              ))}

            {/* Axes */}
            <line
              x1={leftPadding}
              y1={svgDimensions.height - padding}
              x2={svgDimensions.width - padding}
              y2={svgDimensions.height - padding}
              className="stroke-black"
            />
            <line
              x1={leftPadding}
              y1={padding}
              x2={leftPadding}
              y2={svgDimensions.height - padding}
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
                {(effectiveShowMarker || effectiveShowTooltip) && ( 
                  <circle
                    cx={scaleX(p.x)}
                    cy={scaleY(p.y)}
                    r={effectiveShowMarker ? markerSize : 8} 
                    fill={effectiveShowMarker ? color : "transparent"} 
                    className={
                      effectiveShowMarker 
                        ? "stroke-white cursor-pointer"
                        : "cursor-pointer"
                    }
                    stroke={effectiveShowMarker ? "white" : "none"} 
                    strokeWidth={effectiveShowMarker ? 1.5 : 0} 
                    onMouseEnter={(e) => handleMouseEnter(p, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                )}

                {/* Removed: Inline SVG tooltip - now external */}
              </g>
            ))}

            {/* Axis labels */}
            {effectiveXAxisLabel && 
              xTicks.map((x) => (
                <text
                  key={`tx-${x}`}
                  x={scaleX(x)}
                  y={svgDimensions.height - padding + 20}
                  className="text-xs text-center"
                  textAnchor="middle"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                  style={{ textShadow }}  // Added support
                >
                  {x}
                </text>
              ))}
            {effectiveYAxisLabel &&
              yTicks.map((y) => (
                <text
                  key={`ty-${y}`}
                  x={leftPadding - 10}
                  y={scaleY(y) + 4}
                  className="text-xs text-right"
                  textAnchor="end"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                  style={{ textShadow }}  // Added support
                >
                  {y.toFixed(1)}
                </text>
              ))}
          </svg>
          {/* New: External tooltip div - overlays everything */}
          {effectiveShowTooltip && tooltip.visible && (
            <div
              className="absolute z-50 pointer-events-none whitespace-nowrap rounded-lg p-2 shadow-lg"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                backgroundColor: 'rgba(0,0,0,0.85)',
                color: 'white',
                fontSize: '12px',
                borderRadius: '8px',
                transform: 'translateY(-100%)', // Position above mouse
              }}
            >
              {tooltip.content}
            </div>
          )}
          {effectiveShowLegend && (
            <div className="flex items-center justify-center mt-4 gap-2">
              <div
                className="w-3 h-3 rounded opacity-60"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs" style={titleTextStyle}>
                {data.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

QLineChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,

  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  color: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  showLegend: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]), // Added string support
  showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  showMarker: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  markerSize: PropTypes.number,
  xAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  yAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  xAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  yAxisLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gridLineXColor: PropTypes.string,
  gridLineYColor: PropTypes.string,
  xAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  yAxisLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
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
  boxShadowColor: PropTypes.string,
  boxShadowOffsetX: PropTypes.number,
  boxShadowOffsetY: PropTypes.number,
  boxShadowBlurRadius: PropTypes.number,
  boxShadowSpreadRadius: PropTypes.number,
  textShadow: PropTypes.string, // Added
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
  useLinearGradient: PropTypes.bool,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  gradientAngle: PropTypes.number,
  gradientStops: PropTypes.arrayOf(PropTypes.number),
  useRadialGradient: PropTypes.bool,
  radialGradientColors: PropTypes.arrayOf(PropTypes.string),
  radialGradientStops: PropTypes.arrayOf(PropTypes.number),
  bgUrl: PropTypes.string,
  backgroundSize: PropTypes.string,
  seoAlt: PropTypes.string,
  seoTitle: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  useLinearGradientForeground: PropTypes.bool,
  gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  gradientAngleForeground: PropTypes.number,
  gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  useRadialGradientForeground: PropTypes.bool,
  radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  foreground: PropTypes.string,
  childAlign: PropTypes.string,
  tailwindClasses: PropTypes.string,
};

export default QLineChart;
QLineChart.displayName = "QLineChart";