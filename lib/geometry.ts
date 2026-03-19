export function angle(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1)
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}

export function rotatePoint(
  x: number,
  y: number,
  cx: number,
  cy: number,
  angle: number
): { x: number; y: number } {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const dx = x - cx
  const dy = y - cy
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function polarToCartesian(
  radius: number,
  angle: number,
  cx: number = 0,
  cy: number = 0
): { x: number; y: number } {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

export function cartesianToPolar(
  x: number,
  y: number,
  cx: number = 0,
  cy: number = 0
): { radius: number; angle: number } {
  return {
    radius: distance(cx, cy, x, y),
    angle: angle(cx, cy, x, y),
  }
}
