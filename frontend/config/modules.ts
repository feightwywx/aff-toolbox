import { ArcToolMetadata } from "@/utils/interfaces";

export const toolMetas: ArcToolMetadata[] = [
  {
    id: "chartOffset",
    category: "chart",
    path: "/chart-offset",
    endpoint: "/chart/offset",
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
