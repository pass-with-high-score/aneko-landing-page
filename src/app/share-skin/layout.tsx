import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Share Your Skin | ANeko Reborn",
    description: "Submit your custom ANeko skin to share with the community.",
};

export default function ShareSkinLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
