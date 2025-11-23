import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavHeader from "@/components/nav-header";
// import { use } from "react";
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";

export default async function DashboardLayout({
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
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <NavHeader />
        <main className="w-full max-w-6xl mx-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
