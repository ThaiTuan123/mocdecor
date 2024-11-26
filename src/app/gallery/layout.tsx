import React from "react";
import FooterDiscover from "@/components/footer/FooterDiscover";

export default function Layout({
                                   children,

                               }: {
    children: React.ReactNode

}) {
    return (
        <>
            {children}
            {FooterDiscover()}
        </>
    )
}