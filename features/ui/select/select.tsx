/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import styles from "./select.module.scss";

export enum SelectStatus {
  empty = "empty",
  filled = "filled",
  focused = "focused",
  disabled = "disabled",
  open = "open",
}

export type SelectProps = {
  name: string[];
  children: string;
  status: SelectStatus;
  error?: boolean;
  errorMessage?: string;
  icon?: boolean;
  label?: string;
  hint?: boolean;
  hintMessage?: string;
  isOpen?: boolean;
  onClick?: () => void;
  onSelectOption?: (option: string) => void;
};

export function Select({
  name,
  children,
  status,
  icon,
  label,
  error,
  errorMessage,
  hint,
  hintMessage,
  isOpen,
  onClick,
  onSelectOption,
}: SelectProps) {
  return (
    <>
      <p className={styles.label}>{label}</p>
      <div className={styles.width}>
        <div
          className={classNames(
            styles[status],
            styles.container,
            isOpen && styles.focused,
            error && status !== "disabled" && styles.error,
            status === "focused" && error && styles.errorFocused,
          )}
          onClick={onClick}
        >
          <div className={styles.displayName}>
            {icon && <img src="/icons/user.svg" alt="user icon" />}
            {children}
          </div>
          <img
            src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
            alt="chevron"
          />
        </div>
        <div
          className={classNames(
            isOpen ? styles.open : styles.none,
            styles.flex,
          )}
        >
          {name.map((name, index) => (
            <div
              className={styles.option}
              key={index}
              onClick={() => onSelectOption && onSelectOption(name)}
            >
              <div className={styles.displayName}>
                {icon && <img src="/icons/user.svg" alt="user icon" />}
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p
        className={classNames(
          hint && !error && status !== "disabled"
            ? styles.hintMessage
            : error && status !== "disabled"
            ? styles.errorMessage
            : styles.none,
        )}
      >
        {error ? errorMessage : hint && !error ? hintMessage : ""}
      </p>
    </>
  );
}
