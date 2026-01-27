import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>
                        <Image
                            src="/aneko/icon.png"
                            alt="ANeko"
                            width={32}
                            height={32}
                            className={styles.catImage}
                        />
                        <span>ANeko Reborn</span>
                    </div>
                    <nav className={styles.footerNav}>
                        <a href="https://github.com/pass-with-high-score/ANeko" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://t.me/aneko_community" target="_blank" rel="noopener noreferrer">Telegram</a>
                        <a href="/privacy">Privacy</a>
                    </nav>
                    <p className={styles.footerCopy}>
                        © 2026 NQM Innovation Lab · LGPL-2.1 License
                    </p>
                </div>
            </div>
        </footer>
    );
}
