import { Input, InputStatus } from "./input";
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({
  label,
  children,
  status,
  icon,
  error,
  errorMessage,
  hintMessage,
  hint,
  disabled,
  focus,
}) => (
  <div style={{ padding: 50 }}>
    <Input
      status={status}
      icon={icon}
      error={error}
      label={label}
      errorMessage={errorMessage}
      hintMessage={hintMessage}
      hint={hint}
      disabled={disabled}
      focus={focus}
    >
      {children}
    </Input>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "olivia@untitledui.com",
  status: InputStatus.empty,
  icon: false,
  error: false,
  label: "Email",
  errorMessage: "This is an error message.",
  hint: false,
  hintMessage: "This is a hint text to help the user.",
  disabled: false,
  focus: false,
};
Default.parameters = {
  viewMode: "docs",
};
