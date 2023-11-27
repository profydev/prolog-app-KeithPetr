import styles from "./footer.module.scss";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.version}>Version: {process.env.appVersion}</div>
      <ul className={styles.links}>
        <li>
          <Link href="#" className={styles.anchor}>
            Docs
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.anchor}>
            API
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.anchor}>
            Help
          </Link>
        </li>
        <li>
          <Link href="#" className={styles.anchor}>
            Community
          </Link>
        </li>
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={styles.logo}>
        <img src="/icons/logo-small.svg" alt="logo" />
      </div>
    </footer>
  );
}
