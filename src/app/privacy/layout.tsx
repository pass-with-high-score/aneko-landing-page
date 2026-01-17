import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - ANeko Reborn",
    description: "Privacy Policy for ANeko Reborn Android application",
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
