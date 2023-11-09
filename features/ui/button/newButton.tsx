import classNames from "classnames";
import styles from "./newButton.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: React.ReactNode;
  showIcon?: boolean;
  showText?: boolean;
  iconPosition?: "left" | "right";
  disabled: boolean;
};

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon,
  iconPosition = "left",
  showIcon,
  showText,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[size], styles[color], {
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {showIcon && iconPosition === "left" && icon}
      {showText && children}
      {showIcon && iconPosition === "right" && icon}
    </button>
  );
}
