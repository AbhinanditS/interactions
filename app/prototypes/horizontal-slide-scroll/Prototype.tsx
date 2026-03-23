"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useMemo, useState } from "react";

interface FeatureCard {
  eyebrow: string;
  title: string;
  copy: string;
}

interface Panel {
  id: string;
  kicker: string;
  title: string;
  body: string;
  accent: string;
  secondary: string;
  stats: string[];
  features: FeatureCard[];
}

const panels: Panel[] = [
  {
    id: "intro",
    kicker: "001 / Editorial pacing",
    title: "Horizontal slide scroll",
    body:
      "A quiet homepage study built around scroll-mapped movement, generous spacing, and a strong sense of sequence. Each panel advances like a chapter instead of a stacked landing page.",
    accent: "#f2eee6",
    secondary: "#dfd4c3",
    stats: ["04 panels", "scroll-driven", "full viewport"],
    features: [
      {
        eyebrow: "Motion",
        title: "Progress feels anchored",
        copy:
          "Vertical wheel input is remapped into a calm horizontal journey, with each section staying readable while the canvas moves.",
      },
      {
        eyebrow: "Type",
        title: "Large rhythm, light density",
        copy:
          "Text is intentionally sparse so the scroll behavior and spacing carry most of the experience.",
      },
    ],
  },
  {
    id: "signals",
    kicker: "002 / Content framing",
    title: "Minimal blocks, intentional emphasis",
    body:
      "The composition relies on oversized headlines, restrained labels, and a thin progress system that signals where you are without shouting.",
    accent: "#e8ece8",
    secondary: "#cbd5cb",
    stats: ["sticky scene", "snap feel", "balanced contrast"],
    features: [
      {
        eyebrow: "Navigation",
        title: "A visible chapter rail",
        copy:
          "A compact marker row updates continuously while the panels glide across the screen.",
      },
      {
        eyebrow: "Surface",
        title: "Depth without clutter",
        copy:
          "Soft gradients, borders, and restrained shadows keep the prototype polished while staying minimal.",
      },
    ],
  },
  {
    id: "details",
    kicker: "003 / Interaction design",
    title: "Built for scroll, not slideshows",
    body:
      "Instead of clicking between cards, the reader uses one uninterrupted gesture. The viewport becomes the stage and the scroll distance becomes the timeline.",
    accent: "#ece7f3",
    secondary: "#d5cae6",
    stats: ["kinetic hero", "responsive track", "section index"],
    features: [
      {
        eyebrow: "Responsiveness",
        title: "Works in the framed prototype",
        copy:
          "The preview page keeps the same scroll logic while giving context and notes around the interactive area.",
      },
      {
        eyebrow: "Expansion",
        title: "Opens as a dedicated page",
        copy:
          "A separate full-page route lets the concept breathe at full browser scale in a new tab.",
      },
    ],
  },
  {
    id: "outro",
    kicker: "004 / Closing frame",
    title: "Designed as an explorable surface",
    body:
      "The goal is not just to imitate a mood, but to prototype the relationship between long-form narrative, precise motion, and editorial restraint.",
    accent: "#efe9e2",
    secondary: "#dfd3c7",
    stats: ["tasteful copy", "immersive pacing", "prototype ready"],
    features: [
      {
        eyebrow: "Outcome",
        title: "A complete interaction study",
        copy:
          "This prototype focuses on gesture, pacing, and visual tone so the scroll itself becomes the centerpiece.",
      },
      {
        eyebrow: "Next step",
        title: "Adjust copy, speed, or density",
        copy:
          "Because the movement is tied to measured progress, it is straightforward to retune for future explorations.",
      },
    ],
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function useViewportProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setProgress(window.scrollY / maxScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
}

function formatIndex(index: number) {
  return `${String(index + 1).padStart(2, "0")}`;
}

export function HorizontalSlideScrollExperience({
  showChrome = true,
}: {
  showChrome?: boolean;
}) {
  const progress = useViewportProgress();
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const panelCount = panels.length;
  const totalTravel = Math.max(0, viewportWidth * (panelCount - 1));
  const translateX = -progress * totalTravel;
  const activeIndex = clamp(Math.round(progress * (panelCount - 1)), 0, panelCount - 1);

  const chapterLabel = useMemo(
    () => `${formatIndex(activeIndex)} / ${formatIndex(panelCount - 1)}`,
    [activeIndex, panelCount]
  );

  return (
    <div
      style={{
        background: "#f7f3ee",
        color: "#171717",
        borderRadius: showChrome ? 28 : 0,
        overflow: "hidden",
        border: showChrome ? "1px solid rgba(23, 23, 23, 0.08)" : "none",
        boxShadow: showChrome
          ? "0 24px 80px rgba(18, 18, 18, 0.08)"
          : "none",
      }}
    >
      <div style={{ position: "relative", height: `${panelCount * 100}vh` }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.9) 0%, rgba(247,243,238,1) 42%, rgba(240,234,225,1) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: showChrome ? "28px 32px 12px" : "28px 36px 12px",
              position: "relative",
              zIndex: 3,
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(23,23,23,0.5)",
                  marginBottom: 8,
                }}
              >
                Interactive prototype
              </div>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: "-0.04em",
                  fontWeight: 600,
                }}
              >
                Horizontal slide scroll
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {panels.map((panel, index) => (
                  <div
                    key={panel.id}
                    style={{
                      width: index === activeIndex ? 42 : 14,
                      height: 8,
                      borderRadius: 999,
                      background:
                        index === activeIndex
                          ? "#171717"
                          : "rgba(23,23,23,0.16)",
                      transition: "all 180ms ease",
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(23,23,23,0.48)",
                  minWidth: 66,
                  textAlign: "right",
                }}
              >
                {chapterLabel}
              </div>

              {showChrome ? (
                <Link
                  href="/prototypes/horizontal-slide-scroll/full-page"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid rgba(23,23,23,0.12)",
                    borderRadius: 999,
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.72)",
                    fontSize: 13,
                    fontWeight: 500,
                    backdropFilter: "blur(18px)",
                  }}
                >
                  View full page ↗
                </Link>
              ) : null}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: `${panelCount * 100}vw`,
              height: "calc(100vh - 104px)",
              transform: `translate3d(${translateX}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {panels.map((panel, index) => {
              const panelProgress = clamp(progress * (panelCount - 1) - index, -1, 1);
              const offsetY = panelProgress * -24;
              const opacity = 1 - Math.abs(panelProgress) * 0.35;
              const scale = 1 - Math.abs(panelProgress) * 0.04;

              return (
                <section
                  key={panel.id}
                  style={{
                    width: "100vw",
                    minWidth: "100vw",
                    height: "100%",
                    padding: showChrome ? "24px 32px 40px" : "24px 36px 48px",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
                    gap: 28,
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      ...panelShell(panel.accent, panel.secondary),
                      transform: `translateY(${offsetY}px) scale(${scale})`,
                      opacity,
                    }}
                  >
                    <div>
                      <div style={eyebrowStyle}>{panel.kicker}</div>
                      <h2
                        style={{
                          fontSize: "clamp(3rem, 7vw, 7rem)",
                          lineHeight: 0.92,
                          letterSpacing: "-0.08em",
                          maxWidth: 760,
                          marginBottom: 24,
                          fontWeight: 600,
                        }}
                      >
                        {panel.title}
                      </h2>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 320px)",
                        gap: 24,
                        alignItems: "end",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                          lineHeight: 1.55,
                          color: "rgba(23,23,23,0.76)",
                          maxWidth: 640,
                          marginBottom: 0,
                        }}
                      >
                        {panel.body}
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gap: 10,
                          justifySelf: "end",
                          width: "100%",
                          maxWidth: 280,
                        }}
                      >
                        {panel.stats.map((stat) => (
                          <div
                            key={stat}
                            style={{
                              borderTop: "1px solid rgba(23,23,23,0.12)",
                              paddingTop: 10,
                              fontSize: 12,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(23,23,23,0.55)",
                            }}
                          >
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 20,
                      alignContent: "end",
                    }}
                  >
                    {panel.features.map((feature) => (
                      <article
                        key={feature.title}
                        style={{
                          padding: "24px",
                          borderRadius: 28,
                          border: "1px solid rgba(23,23,23,0.08)",
                          background: "rgba(255,255,255,0.6)",
                          backdropFilter: "blur(16px)",
                          minHeight: 210,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          boxShadow: "0 12px 42px rgba(24, 24, 24, 0.05)",
                        }}
                      >
                        <div style={eyebrowStyle}>{feature.eyebrow}</div>
                        <div>
                          <h3
                            style={{
                              fontSize: "clamp(1.5rem, 2vw, 2rem)",
                              letterSpacing: "-0.05em",
                              marginBottom: 12,
                              fontWeight: 600,
                            }}
                          >
                            {feature.title}
                          </h3>
                          <p
                            style={{
                              color: "rgba(23,23,23,0.7)",
                              marginBottom: 0,
                            }}
                          >
                            {feature.copy}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const eyebrowStyle: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(23,23,23,0.48)",
  marginBottom: 18,
};

function panelShell(accent: string, secondary: string): CSSProperties {
  return {
    borderRadius: 36,
    padding: "clamp(28px, 4vw, 44px)",
    border: "1px solid rgba(23,23,23,0.08)",
    background: `linear-gradient(145deg, rgba(255,255,255,0.78) 0%, ${accent} 64%, ${secondary} 100%)`,
    boxShadow: "0 18px 60px rgba(23, 23, 23, 0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 28,
    minHeight: "100%",
    transition: "transform 180ms ease, opacity 180ms ease",
  };
}
