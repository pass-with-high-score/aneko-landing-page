"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import {
  Paintbrush,
  Sparkles,
  Zap,
  Send,
  Star,
  Github,
  GitFork,
  Download,
  Users,
  ArrowRight,
  Wrench,
  Upload
} from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import Link from "next/link";
import Footer from "@/components/Footer";

// GitHub Stats type
interface GitHubStats {
  aneko: { stars: number; forks: number; language: string };
  skin: { stars: number; forks: number };
  landing: { stars: number; forks: number; language: string };
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
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};
// Animation types based on skin.xml
type CatAnimation = "idle" | "yawning" | "sleeping" | "scratching" | "walking" | "awake";

// Available animations with their sprite sequences
const CAT_ANIMATIONS: Record<string, { frames: string[]; duration: number }> = {
  yawning: { frames: ["akubi1", "akubi_l", "akubi_r", "akubi1", "akubi2", "akubi1"], duration: 300 },
  sleeping: { frames: ["sleep1", "sleep2", "sleep1", "sleep2"], duration: 500 },
  scratching: { frames: ["kaki1", "kaki2", "kaki1", "kaki2", "kaki1", "kaki2"], duration: 200 },
  walkingRight: { frames: ["right1", "right2", "right1", "right2"], duration: 200 },
  walkingLeft: { frames: ["left1", "left2", "left1", "left2"], duration: 200 },
  walkingUp: { frames: ["up1", "up2", "up1", "up2"], duration: 200 },
  walkingDown: { frames: ["down1", "down2", "down1", "down2"], duration: 200 },
  awake: { frames: ["awake", "mati1"], duration: 400 },
};

export default function Home() {
  const [catState, setCatState] = useState<CatAnimation>("idle");
  const [currentSprite, setCurrentSprite] = useState("mati1");
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    aneko: { stars: 0, forks: 0, language: "Kotlin" },
    skin: { stars: 0, forks: 0 },
    landing: { stars: 0, forks: 0, language: "TypeScript" }
  });

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [anekoRes, skinRes, landingRes] = await Promise.all([
          fetch("https://api.github.com/repos/pass-with-high-score/ANeko"),
          fetch("https://api.github.com/repos/pass-with-high-score/Aneko-skin"),
          fetch("https://api.github.com/repos/pass-with-high-score/aneko-landing-page")
        ]);

        if (anekoRes.ok && skinRes.ok) {
          const anekoData = await anekoRes.json();
          const skinData = await skinRes.json();
          const landingData = landingRes.ok ? await landingRes.json() : null;

          setGithubStats({
            aneko: {
              stars: anekoData.stargazers_count,
              forks: anekoData.forks_count,
              language: anekoData.language || "Kotlin"
            },
            skin: {
              stars: skinData.stargazers_count,
              forks: skinData.forks_count
            },
            landing: {
              stars: landingData?.stargazers_count || 0,
              forks: landingData?.forks_count || 0,
              language: landingData?.language || "TypeScript"
            }
          });
        }
      } catch (error) {
        // Keep default values on error
        console.error("Failed to fetch GitHub stats:", error);
      }
    };

    fetchGitHubStats();
  }, []);

  // Random animation when clicked
  const handleCatClick = () => {
    if (catState !== "idle") return;

    // Pick random animation
    const animationKeys = Object.keys(CAT_ANIMATIONS);
    const randomKey = animationKeys[Math.floor(Math.random() * animationKeys.length)];
    const animation = CAT_ANIMATIONS[randomKey];

    setCatState("yawning"); // Use as "animating" flag

    // Play animation frames
    let frameIndex = 0;
    setCurrentSprite(animation.frames[0]);

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex < animation.frames.length) {
        setCurrentSprite(animation.frames[frameIndex]);
      }
    }, animation.duration);

    // Return to idle after animation completes
    const totalDuration = animation.frames.length * animation.duration;
    setTimeout(() => {
      clearInterval(interval);
      setCatState("idle");
      setCurrentSprite("mati1");
    }, totalDuration);
  };

  // Get current cat sprite
  const getCatSprite = () => {
    return `/aneko/${currentSprite}.png`;
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <motion.div
              className={styles.heroContent}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                className={styles.catContainer}
                variants={fadeInUp}
                whileTap={{ scale: 0.95 }}
                onClick={handleCatClick}
                style={{ cursor: "pointer" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={getCatSprite()}
                  alt="ANeko cat - click me!"
                  width={120}
                  height={120}
                  className={styles.catImage}
                  priority
                />
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
                ANeko Reborn
              </motion.h1>

              <motion.p className={styles.heroTagline} variants={fadeInUp}>
                Your cute desktop cat pet on Android
              </motion.p>

              <motion.p className={styles.heroDescription} variants={fadeInUp}>
                A modern remake of the classic Neko — watch the adorable pixel cat
                follow your finger across the screen.
              </motion.p>

              <motion.div className={styles.statsBadges} variants={fadeInUp}>
                <span className={styles.badge}>
                  <Star size={14} /> {githubStats.aneko.stars} stars
                </span>
                <span className={styles.badge}>
                  <Download size={14} /> 10K+ installs
                </span>
                <span className={styles.badge}>
                  <Users size={14} /> Open Source
                </span>
              </motion.div>

              <motion.div className={styles.heroCta} variants={fadeInUp}>
                <a
                  href="https://play.google.com/store/apps/details?id=org.nqmgaming.aneko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <SiGoogleplay size={18} />
                  Download Free
                </a>
                <a
                  href="https://github.com/pass-with-high-score/ANeko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={18} />
                  Source Code
                </a>
                <a
                  href="https://devtool.pwhs.app/aneko-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Wrench size={18} />
                  Skin Builder
                </a>
                <a
                  href="https://unikorn.vn/p/aneko-reborn?ref=unikorn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.unikornBadge}
                >
                  <Image
                    src="https://unikorn.vn/api/widgets/badge/aneko-reborn?theme=light"
                    alt="ANeko Reborn trên Unikorn.vn"
                    width={210}
                    height={54}
                    unoptimized
                  />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.phoneFrame}>
                <Image
                  src="/screenshots/1.png"
                  alt="ANeko app screenshot"
                  width={280}
                  height={560}
                  className={styles.phoneScreen}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={fadeInUp}>
              Simple & Delightful
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Everything you need, nothing you don&apos;t
            </motion.p>

            <motion.div className={styles.featureGrid} variants={staggerContainer}>
              {[
                { icon: null, catSrc: "/aneko/right1.png", title: "Follows Your Touch", desc: "The cat chases your finger wherever you touch" },
                { icon: Paintbrush, title: "Material You", desc: "Beautiful modern UI for Android 14+" },
                { icon: Sparkles, title: "30+ Skins", desc: "Choose from community-made cat skins" },
                { icon: Zap, title: "Battery Friendly", desc: "Smooth 60fps with minimal battery usage" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className={styles.featureCard}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={styles.featureIcon}>
                    {feature.catSrc ? (
                      <Image src={feature.catSrc} alt="" width={48} height={48} className={styles.catImage} />
                    ) : feature.icon ? (
                      <feature.icon size={28} strokeWidth={1.5} />
                    ) : null}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className={styles.screenshots}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={fadeInUp}>
              See it in Action
            </motion.h2>

            <motion.div className={styles.screenshotScroll} variants={fadeInUp}>
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={styles.screenshotItem}
                >
                  <Image
                    src={`/screenshots/${num}.png`}
                    alt={`Screenshot ${num}`}
                    width={220}
                    height={440}
                    className={styles.screenshotImage}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviews}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={fadeInUp}>
              What Users Say
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Real reviews from Google Play
            </motion.p>

            <motion.div className={styles.reviewGrid} variants={staggerContainer}>
              {[
                {
                  name: "Rosie Newton",
                  date: "Sep 21, 2025",
                  text: "Very nostalgic. My husband put this on my phone as a surprise after I was talking about the Neko on my PC in the 90s, now this Neko makes me smile every time I see him run across my phone screen.",
                  helpful: 7
                },
                {
                  name: "Soméo Whitehead",
                  date: "Jan 15, 2026",
                  text: "omg. perfect. open source, material you, intuitive ui, no ads or tracking. and last but not least, so many well-made and adorable skins to choose from"
                },
                {
                  name: "Iek Meng Wu",
                  date: "Oct 8, 2025",
                  text: "fantastic app, my dog passed away recently and the Santino skin looks just like him, it's like he is back with me 😭😭"
                },
                {
                  name: "Luna Salem",
                  date: "Jan 11, 2026",
                  text: "Great recreation of ANeko. I really hope in the future there's a feature to upload custom graphics/zips for artists like me cuz thats what I really wanted LOL :0)"
                },
                {
                  name: "Eduardo Clemens",
                  date: "May 31, 2025",
                  text: "Awesome! I used the old Aneko a long time ago on my PC and I loved it. Now I can have a little pet with me on my phone just like in the old days. It brings back great memories."
                },
                {
                  name: "Chri",
                  date: "Sep 27, 2025",
                  text: "This honestly helps me with doom scrolling because I don't want my little guy to see the horrors..."
                },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  className={styles.reviewCard}
                  variants={scaleIn}
                >
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.reviewName}>{review.name}</div>
                      <div className={styles.reviewDate}>{review.date}</div>
                    </div>
                    <div className={styles.reviewStars}>★★★★★</div>
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className={styles.github}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={fadeInUp}>
              Open Source
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Free forever, built by the community
            </motion.p>

            <motion.div className={styles.repoGrid} variants={staggerContainer}>
              <motion.a
                href="https://github.com/pass-with-high-score/ANeko"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
                variants={scaleIn}
                whileHover={{ y: -4 }}
              >
                <div className={styles.repoHeader}>
                  <Github size={20} />
                  <span>pass-with-high-score/ANeko</span>
                </div>
                <p>The main ANeko Reborn Android app</p>
                <div className={styles.repoStats}>
                  <span><Star size={14} /> {githubStats.aneko.stars}</span>
                  <span><GitFork size={14} /> {githubStats.aneko.forks}</span>
                  <span className={styles.langBadge}>{githubStats.aneko.language}</span>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/pass-with-high-score/Aneko-skin"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
                variants={scaleIn}
                whileHover={{ y: -4 }}
              >
                <div className={styles.repoHeader}>
                  <Github size={20} />
                  <span>pass-with-high-score/Aneko-skin</span>
                </div>
                <p>Community skin collection for ANeko</p>
                <div className={styles.repoStats}>
                  <span><Star size={14} /> {githubStats.skin.stars}</span>
                  <span><GitFork size={14} /> {githubStats.skin.forks}</span>
                  <span className={styles.langBadge}>30+ skins</span>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/pass-with-high-score/aneko-landing-page"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
                variants={scaleIn}
                whileHover={{ y: -4 }}
              >
                <div className={styles.repoHeader}>
                  <Github size={20} />
                  <span>pass-with-high-score/aneko-landing-page</span>
                </div>
                <p>This website - ANeko landing page</p>
                <div className={styles.repoStats}>
                  <span><Star size={14} /> {githubStats.landing.stars}</span>
                  <span><GitFork size={14} /> {githubStats.landing.forks}</span>
                  <span className={styles.langBadge}>{githubStats.landing.language}</span>
                </div>
              </motion.a>
            </motion.div>

            <motion.div className={styles.shareSkinCta} variants={fadeInUp}>
              <p>Created your own skin? Share it with the community!</p>
              <Link href="/share-skin" className="btn btn-primary">
                <Upload size={18} />
                Share Your Skin
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div
            className={styles.ctaContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Join Our Community</h2>
            <p>Get help, share skins, and connect with other ANeko fans</p>
            <div className={styles.ctaButtons}>
              <a
                href="https://t.me/aneko_community"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Send size={18} />
                Join Telegram
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
