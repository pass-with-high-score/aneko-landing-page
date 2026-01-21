"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Send, Trophy, Calendar, Sparkles, ArrowLeft, Clock } from "lucide-react";
import styles from "./page.module.css";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

export default function EventPage() {
    return (
        <div className={styles.eventPage}>
            {/* Floating background cats */}
            <Image
                src="/aneko/right1.png"
                alt=""
                width={48}
                height={48}
                className={styles.floatingCat}
            />
            <Image
                src="/aneko/left1.png"
                alt=""
                width={48}
                height={48}
                className={styles.floatingCat}
            />
            <Image
                src="/aneko/mati1.png"
                alt=""
                width={48}
                height={48}
                className={styles.floatingCat}
            />

            {/* Hero Section */}
            <section className={styles.eventHero}>
                <motion.div
                    className={styles.eventContainer}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Coming Soon Badge */}
                    <motion.div className={styles.comingSoonBadge} variants={fadeInUp}>
                        <Clock size={16} />
                        Coming Soon
                    </motion.div>

                    {/* Cat Gallery */}
                    <motion.div className={styles.catGallery} variants={fadeInUp}>
                        <Image
                            src="/aneko/mati1.png"
                            alt="ANeko"
                            width={64}
                            height={64}
                            className={styles.catSprite}
                        />
                        <Image
                            src="/aneko/right1.png"
                            alt="ANeko"
                            width={64}
                            height={64}
                            className={styles.catSprite}
                        />
                        <Image
                            src="/aneko/kaki1.png"
                            alt="ANeko"
                            width={64}
                            height={64}
                            className={styles.catSprite}
                        />
                    </motion.div>

                    {/* Event Title */}
                    <motion.h1 className={styles.eventTitle} variants={fadeInUp}>
                        ANeko <span>Skin Contest</span>
                    </motion.h1>

                    <motion.p className={styles.eventSubtitle} variants={fadeInUp}>
                        Create & Share Your Own ANeko Skins!
                    </motion.p>

                    {/* Prize Card */}
                    <motion.div className={styles.prizeCard} variants={scaleIn}>
                        <div className={styles.prizeLabel}>
                            <Trophy size={18} />
                            Total Prize Pool
                        </div>
                        <div className={styles.prizeAmount}>$100+</div>
                        <div className={styles.prizeNote}>
                            May increase with more participants!
                        </div>
                    </motion.div>

                    {/* Event Info */}
                    <motion.p className={styles.eventInfo} variants={fadeInUp}>
                        Design your unique ANeko skin and share it with the community.
                        Show off your creativity and win amazing prizes!
                    </motion.p>

                    {/* Timeline */}
                    <motion.div className={styles.timeline} variants={fadeInUp}>
                        <Calendar size={20} />
                        <span>Starting Next Month</span>
                        <Sparkles size={16} />
                    </motion.div>

                    {/* CTA */}
                    <motion.div className={styles.eventCta} variants={fadeInUp}>
                        <a
                            href="https://t.me/aneko_community"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <Send size={18} />
                            Join Telegram for Updates
                        </a>
                        <p className={styles.stayTuned}>
                            More details coming soon. Stay tuned!
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
