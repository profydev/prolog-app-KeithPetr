import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxStatus {
  unchecked = "unchecked",
  checked = "checked",
  partlyChecked = "partlyChecked",
}

type CheckboxProps = {
  size: CheckboxSize;
  checked: CheckboxStatus;
  children?: React.ReactNode;
  disabled?: boolean;
};

export function Checkbox({ size, checked, children, disabled }: CheckboxProps) {
  return (
    <div
      className={classNames(styles.flex, styles[size], {
        [styles.disabled]: disabled,
      })}
    >
      <div
        className={classNames(styles.container, styles[size], styles[checked], {
          [styles.disabled]: disabled,
        })}
        tabIndex={disabled ? -1 : 0}
      ></div>
      {children}
    </div>
  );
}
