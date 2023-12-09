/* eslint-disable @next/next/no-img-element */
import styles from "./loading-indicator.module.scss";

export function LoadingIndicator() {
  return (
    <div className={styles.container}>
      <img
        className={styles.loadingindicator}
        src="/icons/loading-circle.png"
        alt="laoding circle"
      />
    </div>
  );
}
