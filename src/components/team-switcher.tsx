"use client";

import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-center items-center ">
        <Image src="/logo.png" alt="logo" width={120} height={32} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
