import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Importar Poppins
const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
    title: "Aso Developers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${poppins.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
