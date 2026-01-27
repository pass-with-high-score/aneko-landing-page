import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for ANeko Reborn Android application. Learn how we protect your data and respect your privacy.",
    alternates: {
        canonical: "/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Privacy Policy | ANeko Reborn",
        description: "Privacy Policy for ANeko Reborn Android application.",
        url: "/privacy",
        type: "website",
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
