import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";


const varela = Varela_Round({
  variable: "--font-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multiply Quiz",
  description: "A dynamis quiz platform for engaging learning experiences",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${varela.variable}`}>
            <main>
              <NextTopLoader color="#FF7900" height={3} showSpinner={true} />
              {children}
            </main>
      </body>
    </html>
  );
};
