import Link from "next/link";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link href="/" className={styles.navItem}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/categories" className={styles.navItem}>
            Categories
          </Link>
        </li>
        <li>
          <Link href="/contact" className={styles.navItem}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
