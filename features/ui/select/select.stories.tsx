import { Select, SelectStatus } from "./select";
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  name,
  label,
  children,
  status,
  icon,
  error,
  errorMessage,
  hintMessage,
  hint,
}) => (
  <div style={{ padding: 50 }}>
    <Select
      status={status}
      name={name}
      icon={icon}
      error={error}
      label={label}
      errorMessage={errorMessage}
      hintMessage={hintMessage}
      hint={hint}
    >
      {children}
    </Select>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Select team member",
  status: SelectStatus.empty,
  icon: false,
  error: false,
  name: ["Olivia Rhye", "Phoenix Baker", "Lana Steiner"],
  label: "Team member",
  errorMessage: "This is an error message.",
  hint: false,
  hintMessage: "This is a hint text to help the user.",
};
Default.parameters = {
  viewMode: "docs",
};
