"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import styles from "./Navigation.module.css";

interface NavigationProps {
    activeRoute?: string;
}

export default function Navigation({ activeRoute }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className="container">
                <div className={styles.navContent}>
                    <Link href="/" className={styles.navLogo} onClick={closeMenu}>
                        <Image
                            src="/aneko/icon.png"
                            alt="ANeko"
                            width={32}
                            height={32}
                            className={styles.catImage}
                        />
                        <span>ANeko Reborn</span>
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className={styles.menuButton}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation links */}
                    <div className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}>
                        <Link
                            href="/"
                            className={`${styles.navLink} ${activeRoute === "/" ? styles.active : ""}`}
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="/explore"
                            className={`${styles.navLink} ${activeRoute === "/explore" ? styles.active : ""}`}
                            onClick={closeMenu}
                        >
                            Explore
                        </Link>
                        <Link
                            href="/share-skin"
                            className={`${styles.navLink} ${activeRoute === "/share-skin" ? styles.active : ""}`}
                            onClick={closeMenu}
                        >
                            Share Skin
                        </Link>
                        <Link
                            href="/privacy"
                            className={`${styles.navLink} ${activeRoute === "/privacy" ? styles.active : ""}`}
                            onClick={closeMenu}
                        >
                            Privacy
                        </Link>
                        <a
                            href="https://github.com/pass-with-high-score/ANeko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.navLink}
                            onClick={closeMenu}
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                    </div>

                    {/* Overlay for mobile */}
                    {isMenuOpen && (
                        <div className={styles.overlay} onClick={closeMenu} />
                    )}
                </div>
            </div>
        </nav>
    );
}
