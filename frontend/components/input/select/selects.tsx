import BaseSelect from "./BaseSelect";
import type React from "react";
import type { SelectProps } from "../interfaces";

export const CreaseModeSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "m", label: "中线模式" },
      { value: "b", label: "边线模式" },
    ]}
    overrideSelectLabel="input.creaseMode"
    {...props}
  />
);

export const ArcEasingModeSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "s", label: "s" },
      { value: "b", label: "b" },
      { value: "si", label: "si" },
      { value: "so", label: "so" },
      { value: "sisi", label: "sisi" },
      { value: "siso", label: "siso" },
      { value: "sosi", label: "sosi" },
      { value: "soso", label: "soso" },
    ]}
    {...props}
  />
);

export const EasingModeSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "", label: "Arcaea", isSubHeader: true },
      { value: "s", label: "s" },
      { value: "b", label: "b" },
      { value: "si", label: "si" },
      { value: "so", label: "so" },
      { value: "", label: "select.extend", isSubHeader: true },
      { value: "ease_in_sine", label: "easeInSine" },
      { value: "ease_out_sine", label: "easeOutSine" },
      { value: "ease_in_out_sine", label: "easeInOutSine" },
      { value: "ease_in_quad", label: "easeInQuad" },
      { value: "ease_out_quad", label: "easeOutQuad" },
      { value: "ease_in_out_quad", label: "easeInOutQuad" },
      { value: "ease_in_cubic", label: "easeInCubic" },
      { value: "ease_out_cubic", label: "easeOutCubic" },
      { value: "ease_in_out_cubic", label: "easeInOutCubic" },
      { value: "ease_in_quart", label: "easeInQuart" },
      { value: "ease_out_quart", label: "easeOutQuart" },
      { value: "ease_in_out_quart", label: "easeInOutQuart" },
      { value: "ease_in_quint", label: "easeInQuint" },
      { value: "ease_out_quint", label: "easeOutQuint" },
      { value: "ease_in_out_quint", label: "easeInOutQuint" },
      { value: "ease_in_expo", label: "easeInExpo" },
      { value: "ease_out_expo", label: "easeOutExpo" },
      { value: "ease_in_out_expo", label: "easeInOutExpo" },
      { value: "ease_in_circ", label: "easeInCirc" },
      { value: "ease_out_circ", label: "easeOutCirc" },
      { value: "ease_in_out_circ", label: "easeInOutCirc" },
      { value: "ease_in_back", label: "easeInBack" },
      { value: "ease_out_back", label: "easeOutBack" },
      { value: "ease_in_out_back", label: "easeInOutBack" },
      { value: "ease_in_elastic", label: "easeInElastic" },
      { value: "ease_out_elastic", label: "easeOutElastic" },
      { value: "ease_in_out_elastic", label: "easeInOutElastic" },
      { value: "ease_in_bounce", label: "easeInBounce" },
      { value: "ease_out_bounce", label: "easeOutBounce" },
      { value: "ease_in_out_bounce", label: "easeInOutBounce" },
    ]}
    {...props}
  />
);

export const ArcColorSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "0", label: "select.blue" },
      { value: "1", label: "select.red" },
      { value: "2", label: "select.green" },
    ]}
    {...props}
  />
);

export const EnvelopeModeSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "c", label: "input.envelopeMode.crease" },
      { value: "p", label: "input.envelopeMode.parallel" },
    ]}
    overrideSelectLabel="input.envelopeMode"
    {...props}
  />
);

export const RainLimitModeSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "s", label: "input.rainLimitMode.standard" },
      { value: "e", label: "input.rainLimitMode.enwiden" },
      { value: "eb", label: "input.rainLimitMode.enwidenbyd" },
    ]}
    overrideSelectLabel="input.rainLimitMode"
    {...props}
  />
);

export const SketchToArcMethodSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "contour", label: "input.method.contour" },
      { value: "thinning", label: "input.method.thinning" },
    ]}
    overrideSelectLabel="input.method"
    {...props}
  />
);

export const SketchToArcPlaneSelect: React.FC<SelectProps> = (props) => (
  <BaseSelect
    item={[
      { value: "vertical", label: "input.plane.vertical" },
      { value: "timeline", label: "input.plane.timeline" },
    ]}
    overrideSelectLabel="input.plane"
    {...props}
  />
);
