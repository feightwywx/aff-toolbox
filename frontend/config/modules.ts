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
    id: "test",
    // @ts-expect-error Type '""' is not assignable to type 'Category'.
    category: "",
    path: "/test",
    endpoint: "",
  },
];

export default toolMetas;
