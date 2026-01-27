import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skin Contest Event",
    description:
        "ANeko Skin Contest - Create and share your own ANeko skins! Win amazing prizes and show off your creativity.",
    keywords: ["aneko contest", "skin contest", "cat skin", "design contest", "prizes"],
    alternates: {
        canonical: "/event",
    },
    openGraph: {
        title: "ANeko Skin Contest | ANeko Reborn",
        description:
            "Design your unique ANeko skin and share it with the community. Win amazing prizes!",
        url: "/event",
        type: "website",
    },
};

export default function EventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
