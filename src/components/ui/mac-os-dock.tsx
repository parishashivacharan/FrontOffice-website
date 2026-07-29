import React, { useState, useRef, useCallback, useEffect } from "react";

export interface DockApp {
  id: string;
  name: string;
  icon: React.ElementType | string;
  to?: string;
}

interface MacOSDockProps {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  activeAppId?: string;
  className?: string;
}

export const MacOSDock: React.FC<MacOSDockProps> = ({
  apps,
  onAppClick,
  openApps = [],
  activeAppId,
  className = "",
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(0);

  // Responsive size calculations based on viewport
  const getResponsiveConfig = useCallback(() => {
    if (typeof window === "undefined") {
      return { baseIconSize: 44, maxScale: 1.3, effectWidth: 200 };
    }

    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);

    if (smallerDimension < 480) {
      // Mobile phones
      return {
        baseIconSize: Math.max(38, Math.min(44, smallerDimension * 0.09)),
        maxScale: 1.25,
        effectWidth: smallerDimension * 0.4,
      };
    } else if (smallerDimension < 768) {
      // Tablets
      return {
        baseIconSize: Math.max(44, smallerDimension * 0.07),
        maxScale: 1.35,
        effectWidth: smallerDimension * 0.35,
      };
    } else {
      // Desktop / Laptop
      return {
        baseIconSize: Math.max(50, Math.min(60, smallerDimension * 0.05)),
        maxScale: 1.5,
        effectWidth: 260,
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(4, baseIconSize * 0.1);

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback(
    (mousePosition: number | null) => {
      if (mousePosition === null) {
        return apps.map(() => minScale);
      }

      return apps.map((_, index) => {
        const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2;
        const minX = mousePosition - effectWidth / 2;
        const maxX = mousePosition + effectWidth / 2;

        if (normalIconCenter < minX || normalIconCenter > maxX) {
          return minScale;
        }

        const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
        const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
        const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;

        return minScale + scaleFactor * (maxScale - minScale);
      });
    },
    [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale],
  );

  const calculatePositions = useCallback(
    (scales: number[]) => {
      let currentX = 0;

      return scales.map((scale) => {
        const scaledWidth = baseIconSize * scale;
        const centerX = currentX + scaledWidth / 2;
        currentX += scaledWidth + baseSpacing;
        return centerX;
      });
    },
    [baseIconSize, baseSpacing],
  );

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    const initialPositions = calculatePositions(initialScales);
    setCurrentScales(initialScales);
    setCurrentPositions(initialPositions);
  }, [apps, calculatePositions, minScale, config]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.2 : 0.12;

    setCurrentScales((prevScales) => {
      return prevScales.map((currentScale, index) => {
        const diff = targetScales[index] - currentScale;
        return currentScale + diff * lerpFactor;
      });
    });

    setCurrentPositions((prevPositions) => {
      return prevPositions.map((currentPos, index) => {
        const diff = targetPositions[index] - currentPos;
        return currentPos + diff * lerpFactor;
      });
    });

    const scalesNeedUpdate = currentScales.some(
      (scale, index) => Math.abs(scale - targetScales[index]) > 0.002,
    );
    const positionsNeedUpdate = currentPositions.some(
      (pos, index) => Math.abs(pos - targetPositions[index]) > 0.1,
    );

    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      if (now - lastMouseMoveTime.current < 16) {
        return;
      }

      lastMouseMoveTime.current = now;

      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        const padding = Math.max(6, baseIconSize * 0.1);
        setMouseX(e.clientX - rect.left - padding);
      }
    },
    [baseIconSize],
  );

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const createBounceAnimation = (element: HTMLElement) => {
    const bounceHeight = Math.max(-6, -baseIconSize * 0.12);
    element.style.transition = "transform 0.2s ease-out";
    element.style.transform = `translateY(${bounceHeight}px)`;

    setTimeout(() => {
      element.style.transform = "translateY(0px)";
    }, 200);
  };

  const handleAppClick = (appId: string, index: number) => {
    if (iconRefs.current[index]) {
      createBounceAnimation(iconRefs.current[index]!);
    }
    onAppClick(appId);
  };

  const contentWidth =
    currentPositions.length > 0
      ? Math.max(
          ...currentPositions.map(
            (pos, index) => pos + (baseIconSize * currentScales[index]) / 2,
          ),
        )
      : apps.length * (baseIconSize + baseSpacing) - baseSpacing;

  const padding = Math.max(6, baseIconSize * 0.1);

  return (
    <div
      ref={dockRef}
      className={`backdrop-blur-xl ${className}`}
      style={{
        width: `${contentWidth + padding * 2}px`,
        background: "rgba(10, 10, 10, 0.85)",
        borderRadius: `${Math.max(16, baseIconSize * 0.4)}px`,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: `
          0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.35),
          0 10px 30px rgba(0,0,0,0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        padding: `${padding}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative"
        style={{
          height: `${baseIconSize}px`,
          width: "100%",
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = baseIconSize * scale;
          const isActive = activeAppId === app.id || openApps.includes(app.id);
          const IconComponent = app.icon;

          return (
            <div
              key={app.id}
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className="absolute cursor-pointer flex flex-col items-center justify-center transition-colors"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: "0px",
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: "bottom center",
                zIndex: Math.round(scale * 10),
              }}
            >
              <div
                className={`w-full h-full rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-[#e8b94a] text-[#0a0a0a] shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {typeof IconComponent === "string" ? (
                  <img
                    src={IconComponent}
                    alt={app.name}
                    width={scaledSize * 0.6}
                    height={scaledSize * 0.6}
                    className="object-contain"
                  />
                ) : (
                  <IconComponent
                    style={{
                      width: `${scaledSize * 0.52}px`,
                      height: `${scaledSize * 0.52}px`,
                    }}
                  />
                )}
              </div>

              {/* Active Dot */}
              {isActive && (
                <div
                  className="absolute"
                  style={{
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "#e8b94a",
                    boxShadow: "0 0 6px #e8b94a",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
