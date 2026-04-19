"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const streamChunks = [
  "Streaming starts ",
  "with a short delay, ",
  "then tokens arrive ",
  "in small visible bursts. ",
  "Each update extends the answer ",
  "before the model has finished thinking ",
  "through the entire completion. ",
  "That partial progress is what makes ",
  "LLM interfaces feel immediate ",
  "instead of blocked on one final render.",
];

const buildShadow = (intensity: number) => {
  const glow = 0.16 + intensity * 0.34;
  const edge = 0.1 + intensity * 0.18;
  return `0 0 ${8 + intensity * 18}px rgba(255,255,255,${glow}), 0 0 ${
    16 + intensity * 24
  }px rgba(255,255,255,${edge})`;
};

export function Prototype() {
  const [speed, setSpeed] = useState(110);
  const [shimmer, setShimmer] = useState(0.65);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const [cycle, setCycle] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setIsStreaming(true);
  }, [cycle]);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    if (visibleCount >= streamChunks.length) {
      setIsStreaming(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [visibleCount, isStreaming, speed]);

  useEffect(() => {
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount]);

  const speedAnnouncement = `${speed} milliseconds per chunk`;
  const shimmerAnnouncement = `${Math.round(shimmer * 100)} percent highlight`;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 18px",
          borderBottom: "1px solid #ececec",
          background: "#f3f3f3",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Streaming Preview</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            Simulated token updates with a moving visual frontier
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCycle((value) => value + 1)}
          style={{
            border: "1px solid #d4d4d4",
            background: "#fff",
            borderRadius: 999,
            padding: "8px 14px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Replay stream
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <div
          ref={viewportRef}
          style={{
            minHeight: 320,
            padding: 24,
            background:
              "radial-gradient(circle at top left, #2d3436 0%, #171a1b 52%, #101213 100%)",
            color: "#f5f7f7",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 18,
              fontSize: 12,
              color: "rgba(255,255,255,0.64)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isStreaming ? "#9EF8C9" : "#7d8a85",
                boxShadow: isStreaming
                  ? "0 0 14px rgba(158, 248, 201, 0.8)"
                  : "none",
              }}
            />
            Model stream
          </div>

          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              letterSpacing: "-0.03em",
              maxWidth: 560,
            }}
          >
            {streamChunks.slice(0, visibleCount).map((chunk, index) => {
              const isLatest = index === visibleCount - 1;

              return (
                <motion.span
                  key={`${cycle}-${index}`}
                  initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    textShadow: isLatest ? buildShadow(shimmer) : "none",
                    color: isLatest
                      ? `rgba(255,255,255,${0.88 + shimmer * 0.12})`
                      : "rgba(255,255,255,0.88)",
                  }}
                  transition={{
                    duration: 0.28,
                    ease: "easeOut",
                  }}
                >
                  {chunk}
                </motion.span>
              );
            })}

            {isStreaming && (
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 30,
                  marginLeft: 6,
                  borderRadius: 4,
                  background: "#9EF8C9",
                  verticalAlign: "middle",
                  boxShadow: buildShadow(shimmer),
                }}
              />
            )}
          </div>
        </div>

        <div
          style={{
            padding: 24,
            borderLeft: "1px solid #ececec",
            background: "#ffffff",
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <label
              htmlFor="streaming-speed"
              style={{ display: "block", fontSize: 12, color: "#777", marginBottom: 8 }}
            >
              Streaming speed
            </label>
            <input
              id="streaming-speed"
              type="range"
              min="40"
              max="280"
              step="10"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              aria-describedby="streaming-speed-value"
              aria-valuetext={speedAnnouncement}
              style={{ width: "100%" }}
            />
            <div
              id="streaming-speed-value"
              aria-live="polite"
              style={{
                marginTop: 8,
                fontSize: 13,
                fontFamily: '"Courier New", monospace',
                color: "#333",
              }}
            >
              {speed}ms per chunk
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="streaming-shimmer"
              style={{ display: "block", fontSize: 12, color: "#777", marginBottom: 8 }}
            >
              Shimmer intensity
            </label>
            <input
              id="streaming-shimmer"
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={shimmer}
              onChange={(event) => setShimmer(Number(event.target.value))}
              aria-describedby="streaming-shimmer-value"
              aria-valuetext={shimmerAnnouncement}
              style={{ width: "100%" }}
            />
            <div
              id="streaming-shimmer-value"
              aria-live="polite"
              style={{
                marginTop: 8,
                fontSize: 13,
                fontFamily: '"Courier New", monospace',
                color: "#333",
              }}
            >
              {Math.round(shimmer * 100)}% highlight
            </div>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 8,
              background: "#f5f5f5",
              border: "1px solid #ececec",
            }}
          >
            <div style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>
              Stream state
            </div>
            <div style={{ fontSize: 14, marginBottom: 6 }}>
              {visibleCount} / {streamChunks.length} chunks revealed
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              {isStreaming
                ? "New text is still arriving."
                : "The stream is complete. Replay to watch it again."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
