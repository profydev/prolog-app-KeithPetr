import styles from "./footer.module.scss";
import { version } from "../../../package.json";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <p className={styles.version}>{`Version: ${version}`}</p>
        <div className={styles.links}>
          <a href="#" className={styles.anchor}>
            Docs
          </a>
          <a href="#" className={styles.anchor}>
            API
          </a>
          <a href="#" className={styles.anchor}>
            Help
          </a>
          <a href="#" className={styles.anchor}>
            Community
          </a>
        </div>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logo} src="/icons/logo-small.svg" alt="logo" />
        </div>
      </div>
    </footer>
  );
}
