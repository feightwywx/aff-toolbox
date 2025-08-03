export type TestingFormFieldMeta = {
  id: string;
  type: string;
  name: string;
};

export const arcPostProcessFields: TestingFormFieldMeta[] = [
  {
    id: "mirror",
    type: "checkbox",
    name: "input.post.mirror",
  },
  {
    id: "straighten_x",
    type: "checkbox",
    name: "input.post.straighten_x",
  },
  {
    id: "straighten_y",
    type: "checkbox",
    name: "input.post.straighten_y",
  },
  {
    id: "connector",
    type: "checkbox",
    name: "input.post.connector",
  },
  {
    id: "position_filter_none",
    type: "radio",
    name: "input.post.position_filter.none",
  },
  {
    id: "position_filter_even",
    type: "radio",
    name: "input.post.position_filter.even",
  },
  {
    id: "position_filter_odd",
    type: "radio",
    name: "input.post.position_filter.odd",
  },
];
