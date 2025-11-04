import React, { useMemo, useState, useEffect, useRef } from "react";

export default function ColumnChart({
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

  //in px, vw/vh, %
  minWidth = "10px",
  maxWidth = "100vw",
  minHeight = "none",
  maxHeight = "100vh",

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
  backgroundImageUrl = "https://images.unsplash.com/photo-1705447551093-7f1f038a313b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1139",
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

  // Column specific
  barSpacing = 16, // spacing between bars
  barRadius = 5, // rx for bars
  animationDelay = 150, // ms between bar animations
  animationDuration = 0.6, // seconds for transition

  legendBoxBackgroundColor = "white"
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animatedHeights, setAnimatedHeights] = useState(Array(data.data.length).fill(0));
  const [isVisible, setIsVisible] = useState(false);
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
  const legendSpace = 70; // Approximate space for legend
  const svgWidth = width - totalBorderHorizontal - totalPaddingHorizontal;
  const contentHeight = height - totalBorderVertical - totalPaddingVertical;
  const svgHeight = contentHeight - titleSpace - legendSpace;

  if (svgWidth <= 0 || svgHeight <= 0)
    return <div className="text-red-500">Insufficient space</div>;

  const padding = 60;

  const scaleX = (i) =>
    ((i + 1) / (data.data.length + 1)) * (svgWidth - 2 * padding) + padding / 2;
  const scaleY = (y) =>
    svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

  const numYTicks = 6;
  const yStep = (yMax - yMin) / (numYTicks - 1);
  const yTicks = useMemo(() => 
    Array.from({ length: numYTicks }, (_, i) => Math.round(yMin + i * yStep)),
    [yMin, yMax]
  );

  const barWidth = (svgWidth - 2 * padding) / data.data.length - barSpacing;

  const fullHeights = useMemo(() => data.data.map((d) => svgHeight - padding - scaleY(d.y)), [data.data, svgHeight, padding, yMin, yMax]);

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

  const outerItemsClass = getAlignItemsClass(alignment);

  const marginStyle = {
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

  const transitionStyle = `y ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55), height ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;

  return (
    <div ref={containerRef} className={`relative flex flex-col mt-20 ${outerItemsClass}`}>
      <div style={marginStyle}>
        <div 
          style={borderedContainerStyle} 
          title={backgroundImageTitle} 
          aria-label={backgroundImageAlt}
        >
          <svg width={svgWidth} height={svgHeight}>
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
            
            {/* Y grid lines */}
            {showYGrid && yTicks.map((y) => (
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

            {/* X grid lines */}
            {showXGrid && data.data.map((_, i) => (
              <line
                key={`gx-${i}`}
                x1={scaleX(i)}
                y1={padding}
                x2={scaleX(i)}
                y2={svgHeight - padding}
                stroke={gridLineXColor}
                strokeWidth={gridLineXWidth}
              />
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={svgWidth - padding}
              y2={svgHeight - padding}
              stroke="#000"
            />
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={svgHeight - padding}
              stroke="#000"
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
                  {showTooltip && hoveredPoint?.x === p.x && (
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
            {showXlabel && data.data.map((p, i) => (
              <text
                key={`tx-${p.x}`}
                x={scaleX(i)}
                y={svgHeight - padding + 20}
                textAnchor="middle"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
                fontSize="11"
              >
                {p.x}
              </text>
            ))}

            {/* Y labels */}
            {showYlabel && yTicks.map((y) => (
              <text
                key={`ty-${y}`}
                x={padding - 10}
                y={scaleY(y) + 4}
                textAnchor="end"
                fill={useGradientForText ? "url(#fgGrad)" : effectiveForegroundColor}
                fontSize="11"
              >
                {y}
              </text>
            ))}
          </svg>

          {/* Legend */}          
          {showTitle && (
            <div className="flex items-center justify-center mt-4 gap-4">
              <span className="text-xs" style={titleTextStyle}>{data.title}</span>
            </div>
          )}

          <div className="flex justify-center gap-4 rounded-2xl shadow-2xl shadow-black px-4 py-4 mt-4" style={{ backgroundColor: legendBoxBackgroundColor }}>
            {data.data.map((p) => {
              const barColor = getColor(p.y);
              return (
                <div key={p.x} className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-sm opacity-70"
                    style={{ backgroundColor: barColor }}
                  />
                  <span style={titleTextStyle} className="text-[12px]">{p.x}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}