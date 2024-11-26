import React from "react";
import FooterDiscover from "@/components/footer/FooterDiscover";

interface LayoutProps {
  children: React.ReactNode;
  Empty: React.ReactNode;
  FoundGallery: React.ReactNode;
  Notfound: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <FooterDiscover />
    </>
  );
}
