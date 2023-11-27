import styles from "./footer.module.scss";
import { version } from "../../../package.json";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.version}>{`Version: ${version}`}</p>
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
