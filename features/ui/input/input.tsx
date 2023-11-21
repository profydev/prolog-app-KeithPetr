import classNames from "classnames";
import styles from "./input.module.scss";

export enum InputStatus {
  empty = "empty",
  filled = "filled",
}

export type InputProps = {
  children: string;
  status: InputStatus;
  error?: boolean;
  errorMessage?: string;
  icon?: boolean;
  label?: string;
  hint?: boolean;
  hintMessage?: string;
  disabled?: boolean;
  focus: boolean;
};

export function Input({
  status,
  error,
  errorMessage,
  icon,
  label,
  hint,
  hintMessage,
  disabled,
  focus,
}: InputProps) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <input
        type="text"
        className={classNames(
          styles.input,
          styles[status],
          icon && styles.icon,
          error && !focus && styles.error,
          focus && !error && styles.focus,
          error && focus && styles.errorFocus,
        )}
        placeholder={status === "empty" ? "olivia@untitledui.com" : ""}
        value={status !== "empty" ? "olivia@untitledui.com" : ""}
        disabled={disabled}
      ></input>
      <p
        className={classNames(
          hint && !error && !disabled
            ? styles.hint
            : error
            ? styles.errorMessage
            : styles.none,
        )}
      >
        {error ? errorMessage : hint && !error ? hintMessage : ""}
      </p>
    </>
  );
}
