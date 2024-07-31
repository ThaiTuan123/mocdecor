import type {Metadata} from "next";
import "./app.css";


export const metadata: Metadata = {
    title: "MocDecor",
    description: "Đến với Mộc, đến với những món quà độc đáo",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
        <body>{children}</body>
        </html>
    );
}
