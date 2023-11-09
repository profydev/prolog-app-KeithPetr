import { Button, ButtonSize, ButtonColor } from "./newButton";
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  size,
  color,
  children,
  iconPosition,
  showIcon,
  showText,
  disabled,
}) => (
  <div style={{ padding: 50 }}>
    <Button
      size={size}
      color={color}
      iconPosition={iconPosition}
      showIcon={showIcon}
      showText={showText}
      icon={<img src="/icons/button-icon.svg" alt="Icon" />}
      disabled={disabled}
    >
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.xl,
  color: ButtonColor.primary,
  children: "Button CTA",
  showIcon: false,
  showText: true,
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
