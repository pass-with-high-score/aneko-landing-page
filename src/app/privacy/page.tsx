import { Github } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import styles from "./privacy.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className={styles.privacyPage}>
            {/* Navigation */}
            <Navigation activeRoute="/privacy" />

            <header className={styles.header}>
                <h1>ANeko Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: January 17, 2026</p>

                <div className={styles.buttons}>
                    <a
                        href="https://github.com/pass-with-high-score/ANeko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        <Github size={18} />
                        GitHub Project
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=org.nqmgaming.aneko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        <SiGoogleplay size={18} />
                        Google Play
                    </a>
                </div>
            </header>

            <main className={styles.content}>

                <section className={styles.section}>
                    <h2>1. What We Do Not Collect</h2>
                    <p>The application <strong>does not collect, store, or share</strong> any personal data. Specifically:</p>
                    <ul>
                        <li><strong>No personal identifiers</strong> (e.g., name, email, device ID) are collected.</li>
                        <li><strong>No analytics or tracking</strong> of user behavior is implemented.</li>
                        <li><strong>No crash reporting</strong> or profiling SDKs are included.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>2. How the Internet is Used</h2>
                    <p>ANeko requires an internet connection <strong>only for an optional feature</strong>:</p>
                    <ul>
                        <li>
                            To <strong>download community skins</strong> from the official GitHub collection:{" "}
                            <a href="https://github.com/pass-with-high-score/Aneko-skin" target="_blank" rel="noopener noreferrer">
                                github.com/pass-with-high-score/Aneko-skin
                            </a>
                        </li>
                        <li>The app <strong>does not upload</strong> any user data to our servers or to GitHub.</li>
                        <li>If you do not use the online skin catalog, the app works <strong>entirely offline</strong> for core features.</li>
                    </ul>
                    <p className={styles.dim}>
                        When fetching skins, the app makes standard HTTPS requests to GitHub to retrieve publicly available files.
                        No personal information is attached to these requests beyond what your device/network normally sends (e.g., IP address).
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Open Source Nature</h2>
                    <p>The application is <strong>fully open source</strong>:</p>
                    <ul>
                        <li>All code is publicly available for inspection on GitHub.</li>
                        <li>Users can verify that no data collection or tracking code exists.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Third-Party Services</h2>
                    <p>The application does <strong>not</strong> include third-party analytics, ads, or monetization SDKs. The only external service contacted is:</p>
                    <ul>
                        <li><strong>GitHub</strong> — used solely to fetch optional skin files from the ANeko skin collection repository.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>5. Permissions We Request & Why</h2>
                    <p>ANeko may request the following Android permission(s). We only use them to provide the features described below:</p>
                    <ul>
                        <li>
                            <span className={styles.mono}>INTERNET</span> — required <strong>only</strong> to download skins from the GitHub collection when you choose to use that feature.
                        </li>
                        <li>
                            <span className={styles.mono}>POST_NOTIFICATIONS</span> — used to show optional notifications (e.g., status or updates). On Android 13+, you can allow or deny this at runtime; the app remains functional either way.
                        </li>
                        <li>
                            <span className={styles.mono}>SYSTEM_ALERT_WINDOW</span> — allows the character to appear on top of other apps (overlay). We prompt you to enable this explicitly; you can turn it off anytime in system settings.
                        </li>
                        <li>
                            <span className={styles.mono}>FOREGROUND_SERVICE</span> — keeps the character/service running reliably in the foreground with a status notification, so animations persist while you use the device.
                        </li>
                        <li>
                            <span className={styles.mono}>FOREGROUND_SERVICE_SPECIAL_USE</span> — used for specific foreground behaviors related to overlays/visuals so the character can remain responsive without collecting any data.
                        </li>
                    </ul>
                    <p className={styles.dim}>
                        None of these permissions are used to collect personal information. You can revoke granted permissions in your device settings.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Transparency & Security</h2>
                    <ol>
                        <li>No personal data collection or tracking is implemented.</li>
                        <li>Network access is limited to retrieving publicly available skin files from GitHub when requested by you.</li>
                        <li>The codebase is open for community review, increasing transparency and trust.</li>
                    </ol>
                    <div className={styles.highlight}>
                        <p><strong>ANeko does not and cannot collect or transmit your personal information.</strong></p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Contact</h2>
                    <p>For verification or questions:</p>
                    <ul>
                        <li>
                            <strong>GitHub</strong>:{" "}
                            <a href="https://github.com/pass-with-high-score/ANeko" target="_blank" rel="noopener noreferrer">
                                github.com/pass-with-high-score/ANeko
                            </a>
                        </li>
                        <li>
                            <strong>Email</strong>:{" "}
                            <a href="mailto:nguyenquangminh570@gmail.com">nguyenquangminh570@gmail.com</a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
