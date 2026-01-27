"use client";

import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import styles from "./Navigation.module.css";

interface NavigationProps {
    activeRoute?: string;
}

export default function Navigation({ activeRoute }: NavigationProps) {
    return (
        <nav className={styles.navbar}>
            <div className="container">
                <div className={styles.navContent}>
                    <Link href="/" className={styles.navLogo}>
                        <Image
                            src="/aneko/icon.png"
                            alt="ANeko"
                            width={32}
                            height={32}
                            className={styles.catImage}
                        />
                        <span>ANeko Reborn</span>
                    </Link>
                    <div className={styles.navLinks}>
                        <Link
                            href="/"
                            className={`${styles.navLink} ${activeRoute === "/" ? styles.active : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/share-skin"
                            className={`${styles.navLink} ${activeRoute === "/share-skin" ? styles.active : ""}`}
                        >
                            Share Skin
                        </Link>
                        <Link
                            href="/privacy"
                            className={`${styles.navLink} ${activeRoute === "/privacy" ? styles.active : ""}`}
                        >
                            Privacy
                        </Link>
                        <a
                            href="https://github.com/pass-with-high-score/ANeko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.navLink}
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
