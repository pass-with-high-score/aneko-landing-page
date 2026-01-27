import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore Skins",
    description: "Browse and download 35+ free community skins for ANeko Reborn. Cute cats, aliens, robots, and more - all created by the community!",
    alternates: {
        canonical: "https://aneko.pwhs.app/explore",
    },
    openGraph: {
        title: "Explore Skins | ANeko Reborn",
        description: "Browse and download 35+ free community skins for ANeko Reborn. Cute cats, aliens, robots, and more!",
        url: "https://aneko.pwhs.app/explore",
        images: ["/screenshots/1.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Explore Skins | ANeko Reborn",
        description: "Browse and download 35+ free community skins for ANeko Reborn.",
        images: ["/screenshots/1.png"],
    },
};

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
