"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname } from "next/navigation";

const Header = () => {
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();
  const { formId } = useParams();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 !bg-[#051367] px-4 md:px-6">
      <nav className="hidden flex-col gap-6 h-full text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-[10px]">
        <div className="flex items-center mr-5 pr-8  border-r border-gray-600">
          <Logo url="/dashboard" />
          <span className="sr-only">Formy</span>
        </div>
        <li className="relative h-full">
          <Link
            href="/dashboard"
            className="text-white/90 text-[15.5px]  font-normal z-[999] flex items-center px-3 justify-center 
              h-full transition-colors hover:text-opacity-90"
          >
            Dashboard
          </Link>
          {pathname === "/dashboard" && (
            <div className="absolute top-0 left-0 right-0 h-[52px] bg-primary transition-colors ease-in-out rounded-b-xl -z-[1]" />
          )}
        </li>
        <li className="relative h-full">
          <Link
            href="#"
            className="text-white/90 text-[15.5px] font-normal opacity-80 pointer-events-none px-4 flex items-center h-full transition-colors hover:text-opacity-90"
          >
            Builder
          </Link>
          {pathname === `/dashboard/form/builder/${formId}` && (
            <div className="absolute top-0 left-0 right-0 h-[52px] bg-primary rounded-b-xl -z-[1]" />
          )}
        </li>
        <li className="relative h-full">
          <Link
            href="#"
            className="text-white/90 text-[15.5px] font-normal px-4 opacity-80 pointer-events-none flex items-center h-full transition-colors hover:text-opacity-95"
          >
            Responds
          </Link>
          {pathname === `/dashboard/form/responds/${formId}` && (
            <div className="absolute top-0 left-0 right-0 h-[52px] bg-[#2d31fa] rounded-b-xl -z-[1]" />
          )}
        </li>
        <li className="relative h-full">
          <Link
            href="#"
            className="text-white/90 text-[15.5px] font-normal opacity-90 px-4 flex items-center h-full  transition-colors hover:text-opacity-95"
          >
            Settings
          </Link>
          {pathname === "/dashboard/settings" && (
            <div className="absolute top-0 left-0 right-0 h-[52px] bg-[#2d31fa] transition-colors rounded-b-xl -z-[1]" />
          )}
        </li>
      </nav>

      <div className="flex items-center justify-end w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div role="button" className="flex items-start gap-2">
              <Avatar className="h-8 w-8 bg-gray-200 shrink-0 rounded-full">
                <AvatarImage
                  src={user?.picture || ""}
                  alt={user?.given_name || ""}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.given_name?.charAt(0)}
                  {user?.family_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-[#f2f2f2]">
                    {user?.given_name} {user?.family_name}
                  </span>
                  <p className="truncate block w-full max-w-[150px] text-xs text-white/50">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown className="ml-auto size-4 text-white/80" />
              </div>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
