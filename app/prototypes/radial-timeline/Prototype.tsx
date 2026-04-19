"use client";

import { useEffect, useRef, useState } from "react";
import { angle, polarToCartesian } from "@/lib/geometry";
import { usePointer } from "@/lib/usePointer";

interface TimelineEvent {
  time: string;
  label: string;
}

const events: TimelineEvent[] = [
  { time: "09:00", label: "Morning" },
  { time: "12:00", label: "Noon" },
  { time: "15:00", label: "Afternoon" },
  { time: "18:00", label: "Evening" },
  { time: "21:00", label: "Night" },
  { time: "00:00", label: "Midnight" },
];

export function Prototype() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [handAngle, setHandAngle] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const { pointer, getRelativePosition } = usePointer();

  useEffect(() => {
    const updateHandAngle = () => {
      if (!svgRef.current) return;

      const pos = getRelativePosition(svgRef.current);
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      const newAngle = angle(centerX, centerY, pos.x, pos.y);
      setHandAngle(newAngle);
    };

    updateHandAngle();
  }, [pointer.clientX, pointer.clientY, dimensions, getRelativePosition]);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const radius = 120;
  const labelRadius = 160;

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          background: "#fafafa",
          cursor: "crosshair",
        }}
      >
        {/* Outer circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#d0d0d0"
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.3}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="1"
        />

        {/* Events on timeline */}
        {events.map((event, index) => {
          const eventAngle =
            (index / events.length) * Math.PI * 2 - Math.PI / 2;
          const pos = polarToCartesian(radius, eventAngle, centerX, centerY);
          const labelPos = polarToCartesian(
            labelRadius,
            eventAngle,
            centerX,
            centerY
          );

          return (
            <g key={event.time}>
              {/* Event marker */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#999" />

              {/* Event label */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "12px",
                  fill: "#666",
                  pointerEvents: "none",
                }}
              >
                {event.label}
              </text>
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r="6" fill="#000" />

        {/* Hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.cos(handAngle) * (radius * 0.7)}
          y2={centerY + Math.sin(handAngle) * (radius * 0.7)}
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Hand tip circle */}
        <circle
          cx={centerX + Math.cos(handAngle) * (radius * 0.7)}
          cy={centerY + Math.sin(handAngle) * (radius * 0.7)}
          r="5"
          fill="#000"
        />
      </svg>
    </div>
  );
}
