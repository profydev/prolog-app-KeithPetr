import { Checkbox, CheckboxSize, CheckboxStatus } from "./checkbox";
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({
  size,
  checked,
  children,
  disabled,
}) => (
  <div style={{ padding: 50 }}>
    <Checkbox size={size} checked={checked} disabled={disabled}>
      {children}
    </Checkbox>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.sm,
  checked: CheckboxStatus.unchecked,
  children: "Label",
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
