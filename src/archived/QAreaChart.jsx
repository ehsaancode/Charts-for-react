
import React, { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const QAreaChart = ({
  data = {
    title: "Product B",
    data: [
      { x: 1, y: 25 },
      { x: 2, y: 50 },
      { x: 3, y: 30 },
      { x: 4, y: 20 },
      { x: 5, y: 40 },
      { x: 6, y: 95 },
      { x: 7, y: 30 },
      { x: 8, y: 60 },
      { x: 9, y: 10 },
      { x: 10, y: 50 },
    ],
  },
  width = 560,
  height = 400,
  xMin = 1,
  xMax = 10,
  yMin = 1,
  yMax = 100,

  //in px, vw/vh, %
  minWidth,
  maxWidth,
  minHeight = "none",
  maxHeight,

  color = "#4A90E2", //graph line color
  fillColor = "#d3e0ed",

  showLegend, //✅ toggle the title
  showTooltip,
  showMarker, // toggle marker points
  markerSize, // marker point size in px

  xAxisGridLines, //✅ show/hide grid in X axis
  yAxisGridLines, //✅ show/hide grid in Y axis

  xAxisLineWidth = "1",
  yAxisLineWidth = "1",
  gridLineXColor = "#808080",
  gridLineYColor = "#808080",

  //show and hide X and Y label
  xAxisLabel = true, //✅
  yAxisLabel = true, //✅

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
  boxShadow, // full CSS string, e.g., "20px 20px 20px 10px rgba(184, 41, 126, 1.00)"
  boxShadowColor,
  boxShadowOffsetX,
  boxShadowOffsetY,
  boxShadowBlurRadius,
  boxShadowSpreadRadius,

  // Text shadow for title and labels
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

  //Background color or gradient (solid, linear-gradient, radial-gradient strings)
  bgColor,
  //============Linear Gradient Background props (fallback if bgColor not gradient)
  useLinearGradient,
  gradientColors = ["pink", "white"],
  gradientAngle,
  gradientStops,
  //=====Radial Gradient Background props
  useRadialGradient,
  radialGradientColors,
  radialGradientStops,

  //======Background Image props
  bgUrl,
  backgroundSize,//none, cover, contain, fill, fit-height, fit-width
  seoAlt = "test img",
  seoTitle = "background image title",
  backgroundRepeat = "repeat", //repeat X, repeat Y, repeat, none

  //===Linear Gradient Foreground props
  useLinearGradientForeground = false,
  gradientColorsForeground = ["red", "white", "green"],
  gradientAngleForeground = 30,
  gradientStopsForeground = [0, 50, 100],

  //Radial Gradient Foreground props
  useRadialGradientForeground = false,
  radialGradientColorsForeground = ["red", "pink", "green"],
  radialGradientStopsForeground = [0, 50, 100],

  //single foreground color
  foregroundColor = "",

  // chart alignment
  alignment = "auto", // left, center, right, stretch, baseline, auto

  // Tailwind classes prop for custom styling
  tailwindClasses = "", // Fixed spelling from 'tailwaindClasses'; apply to container for overrides

  // Additional props from usage
}) => {
  const useTailwind = !!tailwindClasses;

  // Coerce string values to booleans for all toggle props
  const effectiveShowLegend = showLegend === "true" || showLegend === true;
  const effectiveShowTooltip = showTooltip === "true" || showTooltip === true;
  const effectiveShowMarker = showMarker === "true" || showMarker === true;
  const effectiveXAxisGridLines = xAxisGridLines === "true" || xAxisGridLines === true;
  const effectiveYAxisGridLines = yAxisGridLines === "true" || yAxisGridLines === true;
  const effectiveXAxisLabel = xAxisLabel === "true" || xAxisLabel === true;
  const effectiveYAxisLabel = yAxisLabel === "true" || yAxisLabel === true;

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const linePathRef = useRef(null);
  const clipRectRef = useRef(null);
  const containerRef = useRef(null);

  // Background logic: Handle bgColor as solid, linear, or radial gradient
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
  // Fallback to gradient props if no gradient from bgColor
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
  // Handle background image URL (layer on top or alone)
  if (bgUrl) {
    const imgUrl = `url(${bgUrl})`;
    chartBgImage = chartBgImage ? `${imgUrl}, ${chartBgImage}` : imgUrl;
  }

  //foreground
  const effectiveForegroundColor = foregroundColor || "#374151";
  const useGradientForText =
    useLinearGradientForeground || useRadialGradientForeground;
  const getForegroundGradientCSS = () => {
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
    color: useGradientForText ? "transparent" : effectiveForegroundColor,
    textShadow: textShadow,
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

  // Use 0 for borders/paddings when using Tailwind to avoid subtraction in sizing (since inline skipped)
  const effectiveBorderTop = useTailwind ? 0 : (borderTop || borderAll || 0);
  const effectiveBorderRight = useTailwind ? 0 : (borderRight || borderAll || 0);
  const effectiveBorderBottom = useTailwind ? 0 : (borderBottom || borderAll || 0);
  const effectiveBorderLeft = useTailwind ? 0 : (borderLeft || borderAll || 0);

  const effectivePaddingTop = useTailwind ? 0 : (paddingTop || paddingAll || 0);
  const effectivePaddingRight = useTailwind ? 0 : (paddingRight || paddingAll || 0);
  const effectivePaddingBottom = useTailwind ? 0 : (paddingBottom || paddingAll || 0);
  const effectivePaddingLeft = useTailwind ? 0 : (paddingLeft || paddingAll || 0);

  const effectiveMarginTop = useTailwind ? 0 : (marginTop || marginAll || 0);
  const effectiveMarginRight = useTailwind ? 0 : (marginRight || marginAll || 0);
  const effectiveMarginBottom = useTailwind ? 0 : (marginBottom || marginAll || 0);
  const effectiveMarginLeft = useTailwind ? 0 : (marginLeft || marginAll || 0);

  const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
  const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
  const totalPaddingHorizontal = effectivePaddingLeft + effectivePaddingRight;
  const totalPaddingVertical = effectivePaddingTop + effectivePaddingBottom;
  const titleSpace = effectiveShowLegend ? 40 : 0;
  const svgWidth = width - totalBorderHorizontal - totalPaddingHorizontal;
  const contentHeight = height - totalBorderVertical - totalPaddingVertical;
  const svgHeight = contentHeight - titleSpace;

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (x) =>
    ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding) + padding;
  const scaleY = (y) =>
    svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

  const createCurvePath = (points) => {
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

  const createSmoothPath = (points) => {
    let curveD = createCurvePath(points);
    // Close the path following the axes
    curveD += ` L ${scaleX(points[points.length - 1].x)} ${svgHeight - padding}`; // down to x-axis
    curveD += ` L ${padding} ${svgHeight - padding}`; // along x-axis to y-axis
    curveD += ` L ${padding} ${scaleY(points[0].y)}`; // up y-axis to start point
    curveD += " Z"; // close path
    return curveD;
  };

  const areaD = createSmoothPath(data.data);
  const curveD = createCurvePath(data.data);

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
    if (isVisible && linePathRef.current && clipRectRef.current) {
      const linePath = linePathRef.current;
      const clipRect = clipRectRef.current;
      const totalLength = linePath.getTotalLength();
      linePath.style.strokeDasharray = totalLength;
      linePath.style.strokeDashoffset = totalLength;
      clipRect.setAttribute("width", "0");
      let startTime = null;
      const duration = 2000;
      const animate = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentLength = progress * totalLength;
        const point = linePath.getPointAtLength(currentLength);
        const clipWidth = point.x - padding;
        clipRect.setAttribute("width", clipWidth);
        linePath.style.strokeDashoffset = totalLength - currentLength;
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, curveD, padding, svgHeight]);

  const xTicks = useMemo(
    () => Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i),
    [xMin, xMax]
  );
  const yTicks = useMemo(() => [0, 20, 40, 60, 80, 100], []);

  // Add console logs to debug hover state
  const handleMouseEnter = (p) => {
    // console.log("Mouse Enter:", p);
    setHoveredPoint(p);
  };

  const handleMouseLeave = () => {
    // console.log("Mouse Leave");
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

  const outerItemsClass = getAlignItemsClass(alignment);

  const marginStyle = useTailwind ? {} : {
    marginTop: `${effectiveMarginTop}px`,
    marginRight: `${effectiveMarginRight}px`,
    marginBottom: `${effectiveMarginBottom}px`,
    marginLeft: `${effectiveMarginLeft}px`,
  };

  const getSizedValue = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value}px`;
    // Preserve strings like "100%", "50vw", "auto", "none"
    return value.toString();
  };

  // Effective box shadow: prioritize full string, fallback to constructed
  const effectiveBoxShadow = boxShadow ||
    (boxShadowColor ? `${boxShadowOffsetX || 10}px ${boxShadowOffsetY || 10}px ${boxShadowBlurRadius || 50}px ${boxShadowSpreadRadius || 5}px ${boxShadowColor}` : undefined);

  // Conditional border radius styles: skip if tailwindClasses is provided to avoid conflicts with Tailwind arbitrary values
  const radiusStyles = useTailwind 
    ? {} 
    : {
        borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
        borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
        borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
        borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
      };

  // Layout styles (sizing, borders, paddings, radii) - skip entirely when using Tailwind
  const layoutStyles = useTailwind ? {} : {
    width: `${width}px`,
    height: `${height}px`,
    minWidth: getSizedValue(minWidth),
    maxWidth: getSizedValue(maxWidth),
    minHeight: getSizedValue(minHeight),
    maxHeight: getSizedValue(maxHeight),
    boxSizing: "border-box",
    borderTopWidth: `${effectiveBorderTop}px`,
    borderRightWidth: `${effectiveBorderRight}px`,
    borderBottomWidth: `${effectiveBorderBottom}px`,
    borderLeftWidth: `${effectiveBorderLeft}px`,
    borderTopColor: borderTopColor || borderColor || "#000000",
    borderRightColor: borderRightColor || borderColor || "#000000",
    borderBottomColor: borderBottomColor || borderColor || "#000000",
    borderLeftColor: borderLeftColor || borderColor || "#000000",
    borderStyle: borderStyle === "none" ? "none" : (borderStyle || "solid"),
    paddingTop: `${effectivePaddingTop}px`,
    paddingRight: `${effectivePaddingRight}px`,
    paddingBottom: `${effectivePaddingBottom}px`,
    paddingLeft: `${effectivePaddingLeft}px`,
    ...radiusStyles,
  };

  const borderedContainerStyle = {
    ...(effectiveBoxShadow && { boxShadow: effectiveBoxShadow }),
    ...layoutStyles,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: chartBgColor,
    ...(chartBgImage && { backgroundImage: chartBgImage }),
    ...(bgUrl && {
      backgroundRepeat: getBackgroundRepeat(backgroundRepeat),
      backgroundSize: getBackgroundSize(backgroundSize),
      backgroundPosition: "center center",
    }),
  };

  // SVG responsive handling: use viewBox for scaling when Tailwind is used
  const isResponsive = useTailwind;
  const svgAttrs = isResponsive ? {
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${svgWidth} ${svgHeight}`,
  } : {
    width: svgWidth,
    height: svgHeight,
  };

  const outerClassName = `relative flex flex-col ${useTailwind ? "" : "mt-20"} ${outerItemsClass}`;

  return (
    <div ref={containerRef} className={outerClassName}>
      <div style={marginStyle}>
        <div 
          className={tailwindClasses}  // Apply Tailwind classes here for borders, radii, sizing, etc.
          style={borderedContainerStyle} 
          title={seoTitle} 
          aria-label={seoAlt}
        >
          <svg {...svgAttrs} className="">
            <defs>
              {useGradientForText && (
                <>
                  {useRadialGradientForeground ? (
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
              <clipPath id="areaClip">
                <rect
                  ref={clipRectRef}
                  x={padding}
                  y={padding}
                  width={0}
                  height={svgHeight - 2 * padding}
                />
              </clipPath>
            </defs>
            
            {/* Grid lines */}
            {effectiveXAxisGridLines && xTicks.map((x) => (
              <line
                key={`gx-${x}`}
                x1={scaleX(x)}
                y1={padding}
                x2={scaleX(x)}
                y2={svgHeight - padding}
                stroke={gridLineXColor}
                strokeWidth={xAxisLineWidth}
              />
            ))}
            { effectiveYAxisGridLines && yTicks.map((y) => (
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

            {/* Smooth fill with clip animation */}
            <path
              d={areaD}
              fill={fillColor}
              stroke="none"
              className="opacity-60"
              clipPath="url(#areaClip)"
            />

            {/* Smooth line with draw animation */}
            <path
              ref={linePathRef}
              d={curveD}
              fill="none"
              stroke={color}
              strokeWidth={4}
              className="opacity-60"
              clipPath="url(#areaClip)"
            />

            {data.data.map((p, i) => (
              <g key={i}>
                {(effectiveShowMarker || effectiveShowTooltip) && (
                  <circle
                    cx={scaleX(p.x)}
                    cy={scaleY(p.y)}
                    r={effectiveShowMarker ? markerSize : 8}
                    fill={effectiveShowMarker ? color : "transparent"}
                    className={effectiveShowMarker ? "stroke-white cursor-pointer" : "cursor-pointer"}
                    stroke={effectiveShowMarker ? "white" : "none"}
                    strokeWidth={effectiveShowMarker ? 1.5 : 0}
                    onMouseEnter={() => handleMouseEnter(p)}
                    onMouseLeave={handleMouseLeave}
                  />
                )}

                {effectiveShowTooltip && hoveredPoint?.x === p.x && hoveredPoint?.y === p.y && (
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
            {effectiveXAxisLabel && xTicks.map((x) => (
              <text
                key={`tx-${x}`}
                x={scaleX(x)}
                y={svgHeight - padding + 20}
                className="text-xs text-center"
                textAnchor="middle"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
                style={{ textShadow }}
              >
                {x}
              </text>
            ))}
            {effectiveYAxisLabel && yTicks.map((y) => (
              <text
                key={`ty-${y}`}
                x={padding - 10}
                y={scaleY(y) + 4}
                className="text-xs text-right"
                textAnchor="end"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
                style={{ textShadow }}
              >
                {y.toFixed(1)}
              </text>
            ))}
          </svg>
          {effectiveShowLegend && (
            <div className="flex items-center justify-center mt-4 gap-2">
              <div
                className="w-3 h-3 rounded-xs opacity-60"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs" style={titleTextStyle}>{data.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking
QAreaChart.propTypes = {
  data: PropTypes.shape({
     title: PropTypes.string.isRequired,
     data: PropTypes.arrayOf(
     PropTypes.shape({
     x: PropTypes.number.isRequired,
     y: PropTypes.number.isRequired,
   })
 ).isRequired,
}).isRequired,

  width: PropTypes.number,
  height: PropTypes.number,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  showLegend: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  showMarker: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  markerSize: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  xAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  yAxisGridLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  xAxisLineWidth: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
  yAxisLineWidth: PropTypes.oneOfType([PropTypes.number,PropTypes.string,]),
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
  textShadow: PropTypes.string,
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
  useRadialGradient: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  radialGradientColors: PropTypes.arrayOf(PropTypes.string),
  radialGradientStops: PropTypes.arrayOf(PropTypes.number),
  bgUrl: PropTypes.string,
  backgroundSize: PropTypes.string,
  seoAlt: PropTypes.string,
  seoTitle: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  useLinearGradientForeground: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  gradientAngleForeground: PropTypes.number,
  gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  useRadialGradientForeground: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['true', 'false'])]),
  radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  foregroundColor: PropTypes.string,
  alignment: PropTypes.string,
  tailwindClasses: PropTypes.string,  // Added for custom Tailwind class support
};

export default QAreaChart;
QAreaChart.displayName = "QAreaChart";