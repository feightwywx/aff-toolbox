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
    id: "arcAnimate",
    category: "arc",
    path: "/arc-animate",
    endpoint: "/arc/animate",
  },
  {
    id: "timingEasing",
    category: "timing",
    path: "/timing-easing",
    endpoint: "/timing/easing",
  },
  {
    id: "timingGlitch",
    category: "timing",
    path: "/timing-glitch",
    endpoint: "/timing/glitch",
  },
];

export default toolMetas;
