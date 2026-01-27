"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Download, Loader2, Frown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

// Skin type from skin.json
interface Skin {
    name: string;
    package: string;
    version: string;
    author: string;
    image: string;
    url: string;
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.03 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
};

const SKIN_JSON_URL = "https://raw.githubusercontent.com/pass-with-high-score/Aneko-skin/refs/heads/main/skin.json";

export default function ExplorePage() {
    const [skins, setSkins] = useState<Skin[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [initialAnimationDone, setInitialAnimationDone] = useState(false);

    // Fetch skins on mount
    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const response = await fetch(SKIN_JSON_URL);
                if (response.ok) {
                    const data = await response.json();
                    setSkins(data);
                }
            } catch (error) {
                console.error("Failed to fetch skins:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkins();
    }, []);

    // Mark initial animation as done after first render
    useEffect(() => {
        if (!loading && skins.length > 0 && !initialAnimationDone) {
            // Wait for stagger animation to complete
            const timer = setTimeout(() => {
                setInitialAnimationDone(true);
            }, skins.length * 30 + 300); // stagger delay * items + buffer
            return () => clearTimeout(timer);
        }
    }, [loading, skins.length, initialAnimationDone]);

    // Filter skins based on search
    const filteredSkins = useMemo(() => {
        if (!searchQuery.trim()) return skins;
        const query = searchQuery.toLowerCase();
        return skins.filter(
            skin =>
                skin.name.toLowerCase().includes(query) ||
                skin.author.toLowerCase().includes(query)
        );
    }, [skins, searchQuery]);

    return (
        <div className={styles.page}>
            <Navigation activeRoute="/explore" />

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className={styles.heroContent}
                    >
                        <motion.div variants={fadeInUp} className={styles.catContainer}>
                            <Image
                                src="/aneko/mati1.png"
                                alt="ANeko"
                                width={80}
                                height={80}
                                className={styles.catImage}
                            />
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className={styles.title}>
                            Explore Skins
                        </motion.h1>
                        <motion.p variants={fadeInUp} className={styles.subtitle}>
                            Browse {skins.length}+ free community skins
                        </motion.p>

                        <motion.div variants={fadeInUp} className={styles.searchContainer}>
                            <div className={styles.searchWrapper}>
                                <Search size={20} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search by name or author..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Skin Gallery */}
            <section className={styles.skinSection}>
                <div className="container">
                    {loading ? (
                        <div className={styles.loading}>
                            <Loader2 size={32} className={styles.loadingSpinner} />
                            <p>Loading skins...</p>
                        </div>
                    ) : filteredSkins.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Frown size={48} className={styles.emptyIcon} />
                            <h3>No skins found</h3>
                            <p>Try a different search term</p>
                        </div>
                    ) : (
                        <>
                            <p className={styles.skinCount}>
                                Showing {filteredSkins.length} of {skins.length} skins
                            </p>
                            <motion.div
                                className={styles.skinGrid}
                                initial="hidden"
                                animate="visible"
                                variants={initialAnimationDone ? undefined : staggerContainer}
                            >
                                {filteredSkins.map((skin) => (
                                    <motion.div
                                        key={skin.package}
                                        className={styles.skinCard}
                                        variants={initialAnimationDone ? undefined : scaleIn}
                                        initial={initialAnimationDone ? { opacity: 1, scale: 1 } : undefined}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -4 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className={styles.skinImageWrapper}>
                                            <Image
                                                src={skin.image}
                                                alt={skin.name}
                                                width={64}
                                                height={64}
                                                className={styles.skinImage}
                                                unoptimized
                                            />
                                        </div>
                                        <h3 className={styles.skinName}>{skin.name}</h3>
                                        <p className={styles.skinAuthor}>by {skin.author}</p>
                                        <a
                                            href={skin.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.downloadButton}
                                        >
                                            <Download size={16} />
                                            Download
                                        </a>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

