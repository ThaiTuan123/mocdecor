import React from "react";
import FooterDiscover from "@/components/footer/FooterDiscover";

interface LayoutProps {
    children: React.ReactNode;
    Empty?: React.ReactNode; // Changed to ReactNode
    FoundGallery?: React.ReactNode; // Changed to ReactNode
    Notfound?: React.ReactNode; // Changed to ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <>
            {children}
            <FooterDiscover/>
        </>
    );
}
