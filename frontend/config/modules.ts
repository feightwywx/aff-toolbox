import { ArcToolMetadata } from "@/utils/interfaces";

export const toolMetas: ArcToolMetadata[] = [
  {
    id: "chartOffset",
    category: "chart",
    path: "/chart-offset",
    endpoint: "/chart/offset",
  },
  {
    id: "chartMirror",
    category: "chart",
    path: "/chart-mirror",
    endpoint: "/chart/mirror",
  },
  {
    id: "chartAlign",
    category: "chart",
    path: "/chart-align",
    endpoint: "/chart/align",
  },
  {
    id: "arcSplit",
    category: "arc",
    path: "/arc-split",
    endpoint: "/arc/split",
  },
  {
    id: "arcSplitByTiming",
    category: "arc",
    path: "/arc-split-by-timing",
    endpoint: "/arc/split-by-timing",
  },
  {
    id: "arcRain",
    category: "arc",
    path: "/arc-rain",
    endpoint: "/arc/rain",
  },
  {
    id: "arcCreaseLine",
    category: "arc",
    path: "/arc-crease-line",
    endpoint: "/arc/crease-line",
  },
  {
    id: "arcEnvelope",
    category: "arc",
    path: "/arc-envelope",
    endpoint: "/arc/envelope",
  },
  {
    id: "arcBreak",
    category: "arc",
    path: "/arc-break",
    endpoint: "/arc/break",
  },
  {
    id: "timingEasing",
    category: "timing",
    path: "/timing-easing",
    endpoint: "/timing/easing",
  },
  {
    id: "timingEasingDisp",
    category: "timing",
    path: "/timing-easing-disp",
    endpoint: "/timing/easing-disp",
  },
  {
    id: "timingGlitch",
    category: "timing",
    path: "/timing-glitch",
    endpoint: "/timing/glitch",
  },
  {
    id: "arcAnimate",
    category: "other",
    path: "/arc-animate",
    endpoint: "/arc/animate",
  },
  {
    id: "scBlink",
    category: "other",
    path: "/sc-blink",
    endpoint: "/etc/sc-blink",
  },
  {
    id: "chartScale",
    category: "chart",
    path: "/chart-scale",
    endpoint: "/chart/scale",
  },
  {
    id: "sketchImgToArc",
    category: "arc",
    path:"/arc-sketch-to-arc",
    endpoint: "/arc/sketch-to-arc",
  },
  {
    id: "arcShift",
    category: "arc",
    path: "/arc-shift",
    endpoint: "/arc/shift",
  },
];

export default toolMetas;
