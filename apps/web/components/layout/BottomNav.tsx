"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  // If in admin area, don't show the bottom nav
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: "Home", icon: <Home size={22} />, href: "/" },
    { label: "Categories", icon: <LayoutGrid size={22} />, href: "/categories" },
    { label: "Search", icon: <Search size={22} />, href: "/search" },
    { label: "Cart", icon: <ShoppingCart size={22} />, href: "/cart" },
    { label: "Account", icon: <User size={22} />, href: "/account" }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black text-gray-400 pb-safe pt-2 border-t border-gray-900 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between px-2 pb-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
                isActive ? "text-[#D42B2B]" : "hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* iOS Safe Area Padding Hack */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
      `}} />
    </div>
  );
}
