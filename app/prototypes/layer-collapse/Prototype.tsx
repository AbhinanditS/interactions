"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type LayerSpec = {
  id: string;
  label: string;
  duration: string;
  width: number;
  height: number;
  top: number;
  left: number;
  background: string;
  shadow: string;
  zIndex: number;
};

const layers: LayerSpec[] = [
  {
    id: "blocked",
    label: "Blocked Layer",
    duration: "1:30 hr.",
    width: 26 * 16,
    height: 16.2 * 16,
    top: 6.75 * 16,
    left: 2.6 * 16,
    background:
      "linear-gradient(135deg, rgba(205,205,205,0.95) 0%, rgba(231,189,0,0.98) 72%, rgba(240,237,200,0.92) 100%)",
    shadow: "0 18px 30px rgba(68, 68, 68, 0.26)",
    zIndex: 1,
  },
  {
    id: "meeting",
    label: "Meeting Layer",
    duration: "1 hr.",
    width: 26 * 16,
    height: 13.9 * 16,
    top: 3.9 * 16,
    left: 5.75 * 16,
    background:
      "linear-gradient(135deg, rgba(202,173,255,0.98) 0%, rgba(245,246,255,0.98) 46%, rgba(255,219,246,0.95) 100%)",
    shadow: "0 16px 28px rgba(111, 79, 191, 0.24)",
    zIndex: 2,
  },
  {
    id: "task",
    label: "Task Outcomes",
    duration: "30 mins",
    width: 26 * 16,
    height: 9.4 * 16,
    top: 1.9 * 16,
    left: 8.9 * 16,
    background:
      "linear-gradient(135deg, rgba(248,160,195,0.96) 0%, rgba(255,166,120,0.98) 52%, rgba(235,142,0,1) 100%)",
    shadow: "0 14px 26px rgba(238, 135, 31, 0.28)",
    zIndex: 3,
  },
];

const collapsedTop = 19.35 * 16;
const collapsedLeft = 8.2 * 16;
const collapsedWidth = 24.2 * 16;
const collapsedHeight = 4.3 * 16;

export function Prototype() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ece7df",
        borderRadius: 24,
        background:
          "radial-gradient(circle at top left, #ffffff 0%, #fbfaf7 45%, #f1eee8 100%)",
        padding: "2rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#7c756d",
              marginBottom: 8,
            }}
          >
            Click Interaction
          </p>
          <h2 style={{ margin: 0, fontSize: "1.75rem", lineHeight: 1.1 }}>
            Skewed layer collapse
          </h2>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setCollapsed((value) => !value);
          }}
          style={{
            border: "1px solid rgba(66, 60, 53, 0.16)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.88)",
            color: "#39352f",
            padding: "0.75rem 1rem",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {collapsed ? "Expand stack" : "Collapse to base"}
        </button>
      </div>

      <div
        onClick={() => setCollapsed((value) => !value)}
        style={{
          position: "relative",
          height: 33 * 16,
          borderRadius: 28,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(249,247,241,0.96) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(130,130,130,0.12), rgba(130,130,130,0.12)), linear-gradient(120deg, transparent 0%, transparent 48%, rgba(80,80,80,0.12) 48.2%, transparent 48.7%), linear-gradient(120deg, transparent 0%, transparent 67%, rgba(80,80,80,0.12) 67.2%, transparent 67.7%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 12%, rgba(0,0,0,0.95) 88%, transparent 100%)",
            borderRadius: 28,
            pointerEvents: "none",
          }}
        />

        {layers.map((layer, index) => {
          const isBase = index === 0;
          const shouldFlatten = collapsed && !isBase;

          return (
            <motion.div
              key={layer.id}
              initial={false}
              animate={{
                top: shouldFlatten ? collapsedTop : layer.top,
                left: shouldFlatten ? collapsedLeft : layer.left,
                width: shouldFlatten ? collapsedWidth : layer.width,
                height: shouldFlatten ? collapsedHeight : layer.height,
                rotate: collapsed ? 0 : -15,
                opacity: shouldFlatten ? 0.18 + index * 0.08 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 22,
                mass: 0.8,
                delay: collapsed ? index * 0.03 : (layers.length - index) * 0.03,
              }}
              style={{
                position: "absolute",
                borderRadius: 20,
                background: layer.background,
                boxShadow: layer.shadow,
                border: "1px solid rgba(61,61,61,0.1)",
                transformOrigin: "bottom center",
                overflow: "hidden",
                zIndex: collapsed && !isBase ? 4 + index : layer.zIndex,
                skew: collapsed ? "0deg" : "15deg",
                scaleY: collapsed ? 1 : 0.97,
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: collapsed && !isBase ? 0 : 1,
                  y: collapsed && !isBase ? 12 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "1rem 1.1rem",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#56524d",
                  letterSpacing: "-0.02em",
                }}
              >
                <span>{layer.label}</span>
                <span>{layer.duration}</span>
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          initial={false}
          animate={{
            opacity: collapsed ? 1 : 0,
            y: collapsed ? 0 : 8,
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            left: "50%",
            bottom: "2rem",
            transform: "translateX(-50%)",
            fontSize: 13,
            color: "#6b655d",
            letterSpacing: "-0.01em",
            pointerEvents: "none",
          }}
        >
          The upper layers compress into the base footprint.
        </motion.div>
      </div>
    </div>
  );
}
