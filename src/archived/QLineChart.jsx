import PropTypes from "prop-types";
import React, { useMemo, useState, useRef, useEffect } from "react";

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
  width = 560,
  height = 400,
  xMin = 1,
  xMax = 10,
  yMin = 0,
  yMax = 100,
  color = "#4A90E2", //graph line color

  //in px, vw/vh, %
  minWidth = "10px",
  maxWidth = "100vw",
  minHeight = "none",
  maxHeight = "100%",

  showTitle = true, // toggle the title
  showTooltip = true,
  showMarkers = true, // toggle marker points
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

  //Border props for overall chart container
  borderAll = 0,
  borderTop = 0,
  borderRight = 0,
  borderBottom = 0,
  borderLeft = 0,
  borderColor = "#000000",
  borderStyle = "solid", //none, solid, dashed, dotted

  //Border colors for each side
  borderTopColor = "red",
  borderRightColor = "",
  borderBottomColor = "",
  borderLeftColor = "",
  borderRadiusAll = 50, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft = 10,
  borderRadiusTopRight = 0,
  borderRadiusBottomRight = 0,
  borderRadiusBottomLeft = 0,

  //==Box Shadow props for overall chart container
  boxShadowColor = "cyan",
  boxShadowOffsetX = 10,
  boxShadowOffsetY = 10,
  boxShadowBlurRadius = 50,
  boxShadowSpreadRadius = 5,

  //Padding props for inside the border
  paddingAll = 20,
  paddingTop = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingLeft = 0,

  //Margin props for outside the border
  marginAll = 20,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 50,
  marginLeft = 0,

  //Background color inside the border
  backgroundColor = "#FFFFFF",
  //============Linear Gradient Background props
  useLinearGradient = true,
  gradientColors = ["pink", "white"],
  gradientAngle = 35,
  gradientStops = [20, 90],
  //=====Radial Gradient Background props
  useRadialGradient = false,
  radialGradientColors = ["pink", "pink", "white"],
  radialGradientStops = [10, 40, 90],

  //======Background Image props
  backgroundImageUrl = "https://plus.unsplash.com/premium_photo-1668708034279-ab8fa3a9e19b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  backgroundImageFit = "cover", //none, cover, contain, fill, fit-height, fit-width
  backgroundImageAlt = "test img",
  backgroundImageTitle = "background image title",
  backgroundImageRepeat = "repeat", //repeat X, repeat Y, repeat, none

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
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = useRef(null);
  const containerRef = useRef(null);

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
    ...(useGradientForText && {
      backgroundImage: foregroundGradientCSS,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    }),
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

  let backgroundImage = "";
  if (backgroundImageUrl) {
    backgroundImage = `url(${backgroundImageUrl})`;
    if (fallbackBgImage) {
      backgroundImage += `, ${fallbackBgImage}`;
    }
  } else if (fallbackBgImage) {
    backgroundImage = fallbackBgImage;
  }

  if (!data || !data.data || data.data.length === 0)
    return <div className="text-red-500">No data</div>;

  const effectiveBorderTop = borderTop || borderAll || 0;
  const effectiveBorderRight = borderRight || borderAll || 0;
  const effectiveBorderBottom = borderBottom || borderAll || 0;
  const effectiveBorderLeft = borderLeft || borderAll || 0;

  const effectivePaddingTop = paddingTop || paddingAll || 0;
  const effectivePaddingRight = paddingRight || paddingAll || 0;
  const effectivePaddingBottom = paddingBottom || paddingAll || 0;
  const effectivePaddingLeft = paddingLeft || paddingAll || 0;

  const effectiveMarginTop = marginTop || marginAll || 0;
  const effectiveMarginRight = marginRight || marginAll || 0;
  const effectiveMarginBottom = marginBottom || marginAll || 0;
  const effectiveMarginLeft = marginLeft || marginAll || 0;

  const totalBorderHorizontal = effectiveBorderLeft + effectiveBorderRight;
  const totalBorderVertical = effectiveBorderTop + effectiveBorderBottom;
  const totalPaddingHorizontal = effectivePaddingLeft + effectivePaddingRight;
  const totalPaddingVertical = effectivePaddingTop + effectivePaddingBottom;
  const titleSpace = showTitle ? 40 : 0;
  const svgWidth = width - totalBorderHorizontal - totalPaddingHorizontal;
  const contentHeight = height - totalBorderVertical - totalPaddingVertical;
  const svgHeight = contentHeight - titleSpace;

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (x) =>
    ((x - effectiveXMin) / (effectiveXMax - effectiveXMin)) *
      (svgWidth - 2 * padding) +
    padding;
  const scaleY = (y) =>
    svgHeight -
    padding -
    ((y - effectiveYMin) / (effectiveYMax - effectiveYMin)) *
      (svgHeight - 2 * padding);

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

  // Add console logs to debug hover state
  const handleMouseEnter = (p) => {
    console.log("Mouse Enter:", p);
    setHoveredPoint(p);
  };

  const handleMouseLeave = () => {
    console.log("Mouse Leave");
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

  const marginStyle = {
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

  const borderedContainerStyle = {
    width: getSizedValue(width),
    height: getSizedValue(height),
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
    boxShadow: `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}`,

    borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
    borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
    borderBottomRightRadius: `${
      borderRadiusBottomRight || borderRadiusAll || 0
    }px`,
    borderBottomLeftRadius: `${
      borderRadiusBottomLeft || borderRadiusAll || 0
    }px`,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: `${effectivePaddingTop}px`,
    paddingRight: `${effectivePaddingRight}px`,
    paddingBottom: `${effectivePaddingBottom}px`,
    paddingLeft: `${effectivePaddingLeft}px`,
    backgroundColor: fallbackColor,
    ...(backgroundImage && { backgroundImage }),
    ...(backgroundImageUrl && {
      backgroundRepeat: getBackgroundRepeat(backgroundImageRepeat),
      backgroundSize: getBackgroundSize(backgroundImageFit),
      backgroundPosition: "center center",
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col mt-20 ${outerItemsClass}`}
    >
      <div style={marginStyle}>
        <div
          style={borderedContainerStyle}
          title={backgroundImageTitle}
          aria-label={backgroundImageAlt}
        >
          <svg width={svgWidth} height={svgHeight} className="">
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
            </defs>

            {/* Grid lines */}
            {showXGrid &&
              xTicks.map((x) => (
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
            {showYGrid &&
              yTicks.map((y) => (
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
                    className={
                      showMarkers
                        ? "stroke-white cursor-pointer"
                        : "cursor-pointer"
                    }
                    stroke={showMarkers ? "white" : "none"}
                    strokeWidth={showMarkers ? 1.5 : 0}
                    onMouseEnter={() => handleMouseEnter(p)}
                    onMouseLeave={handleMouseLeave}
                  />
                )}

                {showTooltip &&
                  hoveredPoint?.x === p.x &&
                  hoveredPoint?.y === p.y && (
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
            {showXlabel &&
              xTicks.map((x) => (
                <text
                  key={`tx-${x}`}
                  x={scaleX(x)}
                  y={svgHeight - padding + 20}
                  className="text-xs text-center"
                  textAnchor="middle"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                >
                  {x}
                </text>
              ))}
            {showYlabel &&
              yTicks.map((y) => (
                <text
                  key={`ty-${y}`}
                  x={padding - 10}
                  y={scaleY(y) + 4}
                  className="text-xs text-right"
                  textAnchor="end"
                  fill={
                    useGradientForText
                      ? "url(#fgGrad)"
                      : effectiveForegroundColor
                  }
                >
                  {y.toFixed(1)}
                </text>
              ))}
          </svg>
          {showTitle && (
            <div className="flex items-center justify-center mt-4 gap-2">
              <div
                className="w-3 h-3 rounded-xs opacity-60"
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

// PropTypes for type-checking
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

  width: PropTypes.string,
  height: PropTypes.number,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  color: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  showTitle: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showMarkers: PropTypes.bool,
  markerSize: PropTypes.number,
  showXGrid: PropTypes.bool,
  showYGrid: PropTypes.bool,
  gridLineXWidth: PropTypes.string,
  gridLineYWidth: PropTypes.string,
  gridLineXColor: PropTypes.string,
  gridLineYColor: PropTypes.string,
  showXlabel: PropTypes.bool,
  showYlabel: PropTypes.bool,
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
  boxShadowColor: PropTypes.string,
  boxShadowOffsetX: PropTypes.number,
  boxShadowOffsetY: PropTypes.number,
  boxShadowBlurRadius: PropTypes.number,
  boxShadowSpreadRadius: PropTypes.number,
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
  backgroundColor: PropTypes.string,
  useLinearGradient: PropTypes.bool,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  gradientAngle: PropTypes.number,
  gradientStops: PropTypes.arrayOf(PropTypes.number),
  useRadialGradient: PropTypes.bool,
  radialGradientColors: PropTypes.arrayOf(PropTypes.string),
  radialGradientStops: PropTypes.arrayOf(PropTypes.number),
  backgroundImageUrl: PropTypes.string,
  backgroundImageFit: PropTypes.string,
  backgroundImageAlt: PropTypes.string,
  backgroundImageTitle: PropTypes.string,
  backgroundImageRepeat: PropTypes.string,
  useLinearGradientForeground: PropTypes.bool,
  gradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  gradientAngleForeground: PropTypes.number,
  gradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  useRadialGradientForeground: PropTypes.bool,
  radialGradientColorsForeground: PropTypes.arrayOf(PropTypes.string),
  radialGradientStopsForeground: PropTypes.arrayOf(PropTypes.number),
  foregroundColor: PropTypes.string,
  alignment: PropTypes.string,
};

export default QLineChart;
QLineChart.displayName = "QLineChart";