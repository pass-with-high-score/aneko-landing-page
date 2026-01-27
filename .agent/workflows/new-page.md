---
description: How to create a new page for the ANeko landing page project
---

# Creating a New Page

This workflow documents how to create new pages for the ANeko landing page project following existing conventions.

// turbo-all

## Step 1: Create Page Directory

Create a new directory under `src/app/` with your page name (kebab-case).

```
src/app/[page-name]/
├── page.tsx          # Main page component
├── page.module.css   # Page-specific styles
└── layout.tsx        # SEO metadata (optional but recommended)
```

## Step 2: Create layout.tsx (SEO)

Create layout with metadata following this pattern:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Title",
    description: "Page description for SEO (150-160 chars recommended)",
    alternates: {
        canonical: "https://aneko.pwhs.app/[page-name]",
    },
    openGraph: {
        title: "Page Title | ANeko Reborn",
        description: "Page description",
        url: "https://aneko.pwhs.app/[page-name]",
        images: ["/screenshots/1.png"],
    },
};

export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
```

## Step 3: Create page.tsx

Use this structure:

```tsx
"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

// Standard animation variants (copy from existing pages)
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

export default function PageName() {
    return (
        <div className={styles.page}>
            {/* Navigation - pass activeRoute for highlighting */}
            <Navigation activeRoute="/[page-name]" />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className={styles.heroContent}
                    >
                        <motion.h1 variants={fadeInUp} className={styles.title}>
                            Page Title
                        </motion.h1>
                        <motion.p variants={fadeInUp} className={styles.subtitle}>
                            Page subtitle/tagline
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Sections */}
            <section className={styles.content}>
                <div className="container">
                    {/* Your content here */}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
```

## Step 4: Create page.module.css

Use CSS variables from `globals.css` for consistency:

```css
.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--background);
}

.hero {
    padding: var(--space-2xl) 0;
    background: var(--surface);
    text-align: center;
}

.heroContent {
    max-width: 600px;
    margin: 0 auto;
}

.title {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: var(--space-sm);
}

.subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
}

.content {
    padding: var(--space-2xl) 0 var(--space-3xl);
}

/* Responsive */
@media (max-width: 768px) {
    .title {
        font-size: 2rem;
    }
}
```

## Step 5: Update Navigation

Add link to `src/components/Navigation.tsx`:

```tsx
<Link
    href="/[page-name]"
    className={`${styles.navLink} ${activeRoute === "/[page-name]" ? styles.active : ""}`}
>
    Page Name
</Link>
```

## Step 6: Update Sitemap

Add entry to `src/app/sitemap.ts`:

```ts
{
    url: `${baseUrl}/[page-name]`,
    lastModified: currentDate,
    changeFrequency: "weekly",  // or "monthly", "yearly"
    priority: 0.8,              // 0.0-1.0 based on importance
},
```

## Step 7: Update Footer (Optional)

Add link to `src/components/Footer.tsx` nav if it's a major page.

## Design System Reference

**Colors** (from globals.css):
- `--primary`: #FE6F61 (coral)
- `--background`: #FAFAFA
- `--surface`: #FFFFFF
- `--text`: #1A1A1A
- `--text-muted`: #888888
- `--border`: #EEEEEE

**Typography**:
- `--font-heading`: Fredoka
- `--font-body`: Nunito

**Spacing**:
- `--space-sm`: 0.5rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 2rem
- `--space-2xl`: 3rem
- `--space-3xl`: 5rem

**Border Radius**:
- `--radius-md`: 12px
- `--radius-lg`: 16px
- `--radius-xl`: 24px
- `--radius-full`: 9999px

## Verification Checklist

- [ ] Page renders at http://localhost:3000/[page-name]
- [ ] Navigation link shows and highlights correctly
- [ ] Page is responsive on mobile
- [ ] SEO metadata appears in page source
- [ ] Sitemap includes the new page
- [ ] No console errors
