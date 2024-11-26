import React from "react";
import FooterDiscover from "@/components/footer/FooterDiscover";

interface LayoutProps {
    children: React.ReactNode;
    Empty?: React.ComponentType;
    FoundGallery?: React.ComponentType;
    Notfound?: React.ComponentType;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            {children}
            {FooterDiscover()}
        </>
    );
}
