import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavHeader from "@/components/nav-header";
// import { use } from "react";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const token = (await cookies()).get("authNextToken")?.value ?? null;
  const user = token
    ? await serverFetch("/get-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => (res.ok ? res.json() : null))
    : null;

  return (
    <html lang="en">
      <body className={`${varela.variable}`}>
        <SidebarProvider>
          <AppSidebar user={user} />
          <SidebarInset>
            <main>
              <NextTopLoader color="#FF7900" height={3} showSpinner={true} />
              <NavHeader />
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
};
