import { NewButton, ButtonSize, ButtonColor } from "./newButton";
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Button",
  component: NewButton,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof NewButton>;

const Template: StoryFn<typeof NewButton> = ({
  size,
  color,
  children,
  iconPosition,
  showIcon,
  showText,
  disabled,
}) => (
  <div style={{ padding: 50 }}>
    <NewButton
      size={size}
      color={color}
      iconPosition={iconPosition}
      showIcon={showIcon}
      showText={showText}
      icon={<img src="/icons/check.svg" alt="Icon" />}
      disabled={disabled}
    >
      {children}
    </NewButton>
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
