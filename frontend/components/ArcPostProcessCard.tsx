import React from "react";
import * as Yup from "yup";
import { CardWithGrid, SubtitleTypography } from "./CardWithGrid";
import { CheckBoxField, Radio, SingleLineField } from "./input";
import { RadioGroup } from "@mui/material";

export const ArcPostProcessCard: React.FC = () => {
  return (
    <CardWithGrid title="title.post">
      <SubtitleTypography>title.post.mirror</SubtitleTypography>
      <CheckBoxField name="post.mirror"></CheckBoxField>
      <SubtitleTypography>title.post.straighten</SubtitleTypography>
      <CheckBoxField name="post.straighten_x"></CheckBoxField>
      <CheckBoxField name="post.straighten_y"></CheckBoxField>
      <CheckBoxField name="post.connector"></CheckBoxField>
      <SubtitleTypography>title.post.filter</SubtitleTypography>
      <SingleLineField>
        <RadioGroup row>
          <Radio name="post.position_filter" id="post.position_filter.none" value=""></Radio>
          <Radio name="post.position_filter" id="post.position_filter.even" value="even"></Radio>
          <Radio name="post.position_filter" id="post.position_filter.odd" value="odd"></Radio>
        </RadioGroup>
      </SingleLineField>
    </CardWithGrid>
  );
};

export const ArcPostProcessInitValues = {
  post: {
    mirror: false,
    straighten_x: false,
    straighten_y: false,
    connector: false,
    position_filter: "",
  },
};

export const ArcPostProcessValidations = {
  post: Yup.object().shape({
    mirror: Yup.boolean(),
    straighten_x: Yup.boolean(),
    straighten_y: Yup.boolean(),
    connector: Yup.boolean(),
    position_filter: Yup.string(),
  }),
};
