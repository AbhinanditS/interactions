"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { createSeededRandom, type RandomSource } from "@/lib/random";
import { usePointer } from "@/lib/usePointer";

type ActivityType = "run" | "ride";

interface Activity {
  date: string;
  distance: number; // km
  pace: string; // min/km for runs, km/h for rides
  type: ActivityType;
}

const DEFAULT_ACTIVITY_SEED = "run-prototype-default-seed-v1";
const SEED_QUERY_PARAM = "seed";
const EXPLORE_QUERY_PARAM = "explore";

// Generate mock activity data for the year
function generateMockData(random: RandomSource): Activity[] {
  const activities: Activity[] = [];
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-12-28");

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // ~60% chance of activity on any given day
    if (random() > 0.4) {
      const isRun = random() > 0.3;
      const distance = isRun
        ? 3 + random() * 15 // 3-18km for runs
        : 10 + random() * 40; // 10-50km for rides

      activities.push({
        date: d.toISOString().split("T")[0],
        distance: Math.round(distance * 100) / 100,
        pace: isRun
          ? `${(4.5 + random() * 2).toFixed(1)}` // 4:30-6:30 min/km
          : `${(20 + random() * 15).toFixed(1)}`, // 20-35 km/h
        type: isRun ? "run" : "ride",
      });
    }
  }

  return activities;
}

const RunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
  </svg>
);

const RideIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
  </svg>
);

export function Prototype() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { pointer, getRelativePosition } = usePointer();
  const prefersReducedMotion = useReducedMotion();

  const [isOverBars, setIsOverBars] = useState(false);
  const [pointerHoveredIndex, setPointerHoveredIndex] = useState<number | null>(null);
  const [keyboardIndex, setKeyboardIndex] = useState(0);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(800);
  const [regenerationCount, setRegenerationCount] = useState(0);

  const configuredSeed = useMemo(
    () => searchParams.get(SEED_QUERY_PARAM)?.trim() || DEFAULT_ACTIVITY_SEED,
    [searchParams]
  );
  const isExplorationMode = useMemo(
    () => searchParams.get(EXPLORE_QUERY_PARAM) === "1",
    [searchParams]
  );
  const activitySeed = `${configuredSeed}:${regenerationCount}`;

  const activities = useMemo(() => {
    const random = createSeededRandom(activitySeed);
    return generateMockData(random);
  }, [activitySeed]);
  const totalDistance = useMemo(
    () => activities.reduce((sum, a) => sum + a.distance, 0),
    [activities]
  );

  const activeIndex = isKeyboardMode ? keyboardIndex : pointerHoveredIndex;

  // Update cursor position
  useEffect(() => {
    if (!containerRef.current || isKeyboardMode) return;
    const pos = getRelativePosition(containerRef.current);
    setCursorPos(pos);
  }, [pointer.clientX, pointer.clientY, getRelativePosition, isKeyboardMode]);

  // Track container width for responsive bars
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate bar dimensions
  const barWidth = Math.max(1, (containerWidth - 80) / activities.length);
  const barGap = barWidth > 3 ? 1 : 0;
  const maxDistance = Math.max(...activities.map((a) => a.distance));
  const maxBarHeight = 200;

  // Find which bar is being hovered
  useEffect(() => {
    if (!barsRef.current || !isOverBars || isKeyboardMode) {
      setPointerHoveredIndex(null);
      return;
    }

    const barsRect = barsRef.current.getBoundingClientRect();
    const relativeX = cursorPos.x - 40; // Account for padding

    if (relativeX < 0 || relativeX > barsRect.width) {
      setPointerHoveredIndex(null);
      return;
    }

    const index = Math.floor(relativeX / (barWidth + barGap));
    if (index >= 0 && index < activities.length) {
      setPointerHoveredIndex(index);
    } else {
      setPointerHoveredIndex(null);
    }
  }, [cursorPos, isOverBars, barWidth, barGap, activities.length, isKeyboardMode]);

  const hoveredActivity = activeIndex !== null ? activities[activeIndex] : null;
  const hoveredBarHeight = hoveredActivity
    ? (hoveredActivity.distance / maxDistance) * maxBarHeight
    : 0;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const hasActiveSelection = activeIndex !== null && (isOverBars || isKeyboardMode);

  // Calculate snapped X position for cursor
  const snappedX =
    activeIndex !== null
      ? 40 + activeIndex * (barWidth + barGap) + barWidth / 2
      : cursorPos.x;

  const showFallbackCursor = Boolean(prefersReducedMotion || isKeyboardMode);

  const moveSelection = (nextIndex: number) => {
    const clampedIndex = Math.min(activities.length - 1, Math.max(0, nextIndex));
    setKeyboardIndex(clampedIndex);
    setIsKeyboardMode(true);
    setIsOverBars(true);
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label="Activity distance bar chart"
      aria-describedby="run-chart-description run-chart-selection"
      style={{
        position: "relative",
        width: "100%",
        minHeight: 400,
        background: "#fafafa",
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        cursor: showFallbackCursor ? "crosshair" : "none",
        outlineOffset: 2,
      }}
      onMouseEnter={() => setIsOverBars(true)}
      onMouseLeave={() => setIsOverBars(false)}
      onMouseMove={() => {
        if (isKeyboardMode) {
          setIsKeyboardMode(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveSelection((activeIndex ?? keyboardIndex) + 1);
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveSelection((activeIndex ?? keyboardIndex) - 1);
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          moveSelection(0);
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          moveSelection(activities.length - 1);
          return;
        }

        if (event.key === "Escape") {
          setIsKeyboardMode(false);
          setPointerHoveredIndex(null);
        }
      }}
    >
      <p
        id="run-chart-description"
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
        Bar chart of run and ride distances across the year. Use left and right arrow keys
        to inspect each day. Press Home or End to jump to the start or end.
      </p>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RunIcon />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>
            There&apos;s no tomorrow like today
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isExplorationMode && (
            <button
              type="button"
              onClick={() => setRegenerationCount((count) => count + 1)}
              style={{
                border: "1px solid #d0d0d0",
                borderRadius: 6,
                background: "#fff",
                color: "#444",
                fontSize: 12,
                fontFamily: "monospace",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Regenerate
            </button>
          )}
          <span
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              color: "#666",
            }}
          >
            {Math.round(totalDistance).toLocaleString()}km
          </span>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredActivity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: 70,
              left: snappedX,
              transform: "translateX(-50%)",
              background: "white",
              padding: "8px 12px",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 10,
              pointerEvents: "none",
              fontFamily: "monospace",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              {hoveredActivity.type === "run" ? <RunIcon /> : <RideIcon />}
              <span style={{ fontWeight: 500 }}>
                {hoveredActivity.distance.toFixed(2)}km
              </span>
              <span style={{ color: "#999" }}>·</span>
              <span style={{ color: "#666" }}>
                {hoveredActivity.pace}
                {hoveredActivity.type === "run" ? " min/km" : " km/h"}
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#999" }}>{formatDate(hoveredActivity.date)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bars container */}
      <div
        ref={barsRef}
        role="listbox"
        aria-label="Daily distance bars"
        aria-activedescendant={
          activeIndex !== null ? `activity-bar-${activeIndex}` : undefined
        }
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          height: maxBarHeight + 60,
          padding: "40px 40px 20px",
          gap: barGap,
        }}
      >
        {activities.map((activity, index) => {
          const height = (activity.distance / maxDistance) * maxBarHeight;
          const isHovered = activeIndex === index;
          const isRide = activity.type === "ride";

          return (
            <motion.div
              key={activity.date}
              id={`activity-bar-${index}`}
              role="option"
              aria-selected={isHovered}
              aria-label={`${formatDate(activity.date)} ${activity.distance.toFixed(2)} kilometers ${
                isRide ? "ride" : "run"
              }`}
              initial={false}
              animate={{
                height,
                opacity: activeIndex === null ? 0.7 : isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.15 }}
              style={{
                width: barWidth,
                background: isRide ? "#F97316" : "#333",
                borderRadius: barWidth > 2 ? 1 : 0,
                flexShrink: 0,
              }}
            />
          );
        })}
      </div>

      {/* Date label for hovered bar */}
      <AnimatePresence>
        {hoveredActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: 20,
              left: snappedX,
              transform: "translateX(-50%)",
              fontSize: 12,
              fontFamily: "monospace",
              color: "#666",
              pointerEvents: "none",
            }}
          >
            {formatDate(hoveredActivity.date)}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        id="run-chart-selection"
        aria-live="polite"
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
        {hoveredActivity
          ? `${formatDate(hoveredActivity.date)} ${hoveredActivity.distance.toFixed(2)} kilometers ${
              hoveredActivity.type
            }`
          : "No bar selected"}
      </div>

      {/* Cursor dot / line */}
      <motion.div
        initial={false}
        animate={{
          x: snappedX,
          y: hasActiveSelection ? 310 - hoveredBarHeight : cursorPos.y,
          width: hasActiveSelection ? 2 : 12,
          height: hasActiveSelection ? hoveredBarHeight + 40 : 12,
          borderRadius: hasActiveSelection ? 1 : 6,
          opacity: showFallbackCursor ? (hasActiveSelection ? 1 : 0.45) : pointer.isActive ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
        style={{
          position: "absolute",
          background: hoveredActivity?.type === "ride" ? "#F97316" : "#000",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      />

      {/* Today indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "#999",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#F97316",
          }}
        />
        <span>Today</span>
      </div>
    </div>
  );
}
