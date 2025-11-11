import PropTypes from "prop-types";
import React, { useMemo, useState, useRef, useEffect } from "react";

const QBarChart = ({
  data = {
    title: "Sales",
    data: [
      { y: "January", x: 50 },
      { y: "February", x: 54 },
      { y: "March", x: 63 },
      { y: "April", x: 71 },
      { y: "May", x: 80 },
      // { y: "June", x: 89 },
    ],
  },
  width = 560,
  height = 400,
  xMin = 40,
  xMax = 95,

  minWidth = undefined,
  maxWidth = undefined,
  minHeight = undefined,
  maxHeight = undefined,

  showTitle = true, // toggle the title
  showTooltip = true,

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
  borderRadiusAll = 20, //set radius for all the corners together
  //change each corner of the container
  borderRadiusTopLeft = 0,
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
  marginAll = 10,
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
  backgroundImageUrl = "https://images.unsplash.com/photo-1665088587830-ca8529af39ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
  backgroundImageFit = "cover", //none, cover, contain, fill, fit-height, fit-width
  backgroundImageAlt = "test img",
  backgroundImageTitle = "background image title",
  backgroundImageRepeat = "repeat X", //repeat X, repeat Y, repeat, none

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

  legendBoxBackgroundColor = "white",
  


}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedWidths, setAnimatedWidths] = useState(Array(data.data.length).fill(0));
  const containerRef = useRef(null);

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
  const fallbackColor = isFallbackGradient ? "transparent" : (backgroundColor || "transparent");

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
  const svgHeight = contentHeight - titleSpace - 60; // Extra space for legend
  

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (value) =>
    ((value - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding) + padding;
  const scaleY = (i) =>
    ((i + 0.5) / data.data.length) * (svgHeight - 2 * padding) + padding;

  const numXTicks = 6;
  const xStep = (xMax - xMin) / (numXTicks - 1);
  const xTicks = useMemo(() => 
    Array.from({ length: numXTicks }, (_, i) => Math.round(xMin + i * xStep)),
    [xMin, xMax]
  );

  const barHeight = (svgHeight - 2 * padding) / data.data.length - 10;

  const fullWidths = useMemo(
    () => data.data.map((d) => scaleX(d.x) - padding),
    [data.data, xMin, xMax, svgWidth, padding]
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
        setAnimatedWidths((prev) => {
          const newWidths = [...prev];
          newWidths[index] = fullWidths[index];
          return newWidths;
        });
      };

      data.data.forEach((_, i) => {
        setTimeout(() => animateBar(i), i * 150);
      });
    }
  }, [isVisible, data.data, fullWidths]);

  const getColor = (value) => {
    const intensity = (value - xMin) / (xMax - xMin);
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

  const outerItemsClass = getAlignItemsClass(alignment);

  const marginStyle = {
    marginTop: `${effectiveMarginTop}px`,
    marginRight: `${effectiveMarginRight}px`,
    marginBottom: `${effectiveMarginBottom}px`,
    marginLeft: `${effectiveMarginLeft}px`,
  };

  const getSizedValue = (value) => {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
  };

  const borderedContainerStyle = {
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
    borderTopColor: borderTopColor || borderColor,
    borderRightColor: borderRightColor || borderColor,
    borderBottomColor: borderBottomColor || borderColor,
    borderLeftColor: borderLeftColor || borderColor,
    borderStyle: borderStyle === "none" ? "none" : borderStyle,
    boxShadow: `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}`,

    borderTopLeftRadius: `${borderRadiusTopLeft || borderRadiusAll || 0}px`,
    borderTopRightRadius: `${borderRadiusTopRight || borderRadiusAll || 0}px`,
    borderBottomRightRadius: `${borderRadiusBottomRight || borderRadiusAll || 0}px`,
    borderBottomLeftRadius: `${borderRadiusBottomLeft || borderRadiusAll || 0}px`,
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
    <div ref={containerRef} className={`relative flex flex-col mt-20 ${outerItemsClass}`}>
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
            
            {/* X grid lines (vertical for values) */}
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

            {/* Y grid lines (horizontal for categories) */}
            {showYGrid && data.data.map((_, i) => (
              <line
                key={`gy-${i}`}
                x1={padding}
                y1={scaleY(i)}
                x2={svgWidth - padding}
                y2={scaleY(i)}
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

            {/* Bars */}
            {data.data.map((p, i) => {
              const yPos = scaleY(i);
              const animatedWidth = animatedWidths[i];
              const endX = padding + animatedWidth;
              const color = getColor(p.x);

              return (
                <g key={i}>
                  <rect
                    x={padding}
                    y={yPos - barHeight / 2}
                    width={animatedWidth}
                    height={barHeight}
                    fill={color}
                    rx={5}
                    style={{
                      transition: 'width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    }}
                    className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                    onMouseEnter={() => handleMouseEnter(p)}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Tooltip */}
                  {showTooltip && hoveredPoint?.y === p.y && (
                    <g>
                      <rect
                        x={endX + 5}
                        y={yPos - 55}
                        width={100}
                        height={40}
                        rx={8}
                        fill="rgba(0,0,0,0.85)"
                      />
                      <text
                        x={endX + 50}
                        y={yPos - 40}
                        fill="white"
                        textAnchor="middle"
                        fontSize="12"
                      >
                        <tspan
                          x={endX + 50}
                          dy="0"
                          fontWeight="bold"
                          fontSize="13"
                        >
                          {p.y}
                        </tspan>
                        <tspan x={endX + 50} dy="16" fontSize="12">
                          {`Value: ${p.x}`}
                        </tspan>
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* X labels */}
            {showXlabel && xTicks.map((x) => (
              <text
                key={`tx-${x}`}
                x={scaleX(x)}
                y={svgHeight - padding + 20}
                textAnchor="middle"
                className="text-xs text-center"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
              >
                {x}
              </text>
            ))}

            {/* Y labels */}
            {showYlabel && data.data.map((p, i) => (
              <text
                key={`ty-${p.y}`}
                x={padding - 10}
                y={scaleY(i) + 4}
                textAnchor="end"
                className="text-xs text-right"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
              >
                {p.y}
              </text>
            ))}
          </svg>

          {showTitle && (
            <div className="flex items-center justify-center mt-2 gap-2">
              <span className="text-xs" style={titleTextStyle}>{data.title}</span>
            </div>
          )}

          {/* Legend */}
          <div className="flex justify-center gap-4 rounded-2xl shadow-2xl shadow-black px-4 py-4 mt-4" style={{ backgroundColor: legendBoxBackgroundColor }}>
            {data.data.map((p) => {
              const color = getColor(p.x);
              return (
                <div key={p.y} className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-sm opacity-70"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[12px] text-gray-700" style={titleTextStyle}>{p.y}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// PropTypes for type-checking
QBarChart.propTypes = {
   
data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        y: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  
  width: PropTypes.number,
  height: PropTypes.number,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  showTitle: PropTypes.bool,
  showTooltip: PropTypes.bool,
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
  legendBoxBackgroundColor: PropTypes.string,
}

export default QBarChart;
QBarChart.displayName = "QBarChart";