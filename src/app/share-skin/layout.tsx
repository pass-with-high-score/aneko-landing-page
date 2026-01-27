import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Share Your Skin",
    description:
        "Submit your custom ANeko skin to share with the community. Create and share unique cat skins for ANeko Reborn!",
    keywords: ["aneko skin", "custom skin", "share skin", "cat skin", "community skins"],
    alternates: {
        canonical: "/share-skin",
    },
    openGraph: {
        title: "Share Your Skin | ANeko Reborn",
        description: "Submit your custom ANeko skin to share with the community.",
        url: "/share-skin",
        type: "website",
    },
};

export default function ShareSkinLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
