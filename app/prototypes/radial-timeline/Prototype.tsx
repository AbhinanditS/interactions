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

const eventAngleAt = (index: number) =>
  (index / events.length) * Math.PI * 2 - Math.PI / 2;

export function Prototype() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [handAngle, setHandAngle] = useState(0);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [dimensions] = useState({ width: 600, height: 600 });
  const { pointer, getRelativePosition } = usePointer();

  useEffect(() => {
    if (isKeyboardMode) {
      return;
    }

    const updateHandAngle = () => {
      if (!svgRef.current) return;

      const pos = getRelativePosition(svgRef.current);
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      const newAngle = angle(centerX, centerY, pos.x, pos.y);
      setHandAngle(newAngle);
    };

    updateHandAngle();
  }, [pointer, dimensions, getRelativePosition, isKeyboardMode]);

  useEffect(() => {
    if (!isKeyboardMode) {
      return;
    }

    setHandAngle(eventAngleAt(selectedEventIndex));
  }, [selectedEventIndex, isKeyboardMode]);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const radius = 120;
  const labelRadius = 160;
  const selectedEvent = events[selectedEventIndex];

  const stepEvent = (delta: number) => {
    setIsKeyboardMode(true);
    setSelectedEventIndex((prev) => {
      const next = (prev + delta + events.length) % events.length;
      return next;
    });
  };

  const selectEvent = (index: number) => {
    setIsKeyboardMode(true);
    setSelectedEventIndex(index);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            stepEvent(1);
            return;
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepEvent(-1);
            return;
          }

          if (event.key === "Escape") {
            setIsKeyboardMode(false);
          }
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            type="button"
            onClick={() => stepEvent(-1)}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 6,
              background: "#fff",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Previous event
          </button>
          <button
            type="button"
            onClick={() => stepEvent(1)}
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 6,
              background: "#fff",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Next event
          </button>
          <span aria-live="polite" style={{ fontSize: 12, color: "#555" }}>
            {selectedEvent.label} ({selectedEvent.time})
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Timeline events"
          style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
        >
          {events.map((event, index) => (
            <button
              key={event.time}
              type="button"
              role="radio"
              aria-checked={selectedEventIndex === index}
              onClick={() => selectEvent(index)}
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: 999,
                background: selectedEventIndex === index ? "#111" : "#fff",
                color: selectedEventIndex === index ? "#fff" : "#222",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {event.label}
            </button>
          ))}
        </div>

        <p
          id="radial-timeline-description"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Radial timeline with six events arranged in a circle. Use the previous and next
          controls or left and right arrow keys to move between events.
        </p>

        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          role="img"
          aria-label="Radial timeline"
          aria-describedby="radial-timeline-description"
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            background: "#fafafa",
            cursor: isKeyboardMode ? "default" : "crosshair",
          }}
          onPointerMove={() => {
            if (isKeyboardMode) {
              setIsKeyboardMode(false);
            }
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
            const eventAngle = eventAngleAt(index);
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
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={selectedEventIndex === index ? "7" : "4"}
                  fill={selectedEventIndex === index ? "#000" : "#999"}
                />

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
                    fontWeight: selectedEventIndex === index ? 600 : 400,
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
    </div>
  );
}
