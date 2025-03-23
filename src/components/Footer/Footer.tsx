import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© {new Date().getFullYear()} Twój Blog. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
