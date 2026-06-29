"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LogoutButton } from "@/components/ui/LogoutButton";

export const Navbar = ({ user }: { user: any }): React.JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only apply the hero observer on the home page
    if (pathname === "/") {
      const heroSection = document.getElementById("hero-section");
      
      if (heroSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            // When Hero leaves viewport completely, Navbar becomes solid
            if (entry) {
              setIsScrolled(!entry.isIntersecting);
            }
          },
          { root: null, threshold: 0 }
        );
        
        observer.observe(heroSection);
        return () => observer.disconnect();
      }
    }

    // Fallback for other pages or if hero isn't found
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const publicLinks = [
    { label: "Equipment", href: "/products" },
    { label: "Industries", href: "/categories" },
    { label: "Service", href: "/contact" },
    { label: "About HID", href: "/about" },
  ];

  const authLinks = [
    { label: "Equipment", href: "/products" },
    { label: "Industries", href: "/categories" },
    { label: "Service", href: "/contact" },
    { label: "About HID", href: "/about" },
  ];

  const navLinks = user ? authLinks : publicLinks;

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;
  
  const textPrimary = isTransparent ? "text-gray-900 lg:text-white" : "text-gray-900";
  const textMuted = isTransparent ? "text-gray-600 lg:text-white/80 hover:text-[#D42B2B] lg:hover:text-white" : "text-gray-600 hover:text-[#D42B2B]";
  const iconColor = isTransparent ? "text-gray-900 lg:text-white hover:text-[#D42B2B] lg:hover:text-gray-200" : "text-gray-900 hover:text-[#D42B2B]";
  const logoRed = isTransparent ? "text-[#D42B2B] lg:text-white" : "text-[#D42B2B]";

  if (pathname.startsWith('/admin') || pathname.startsWith('/account')) {
    return <></>; 
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? "bg-white lg:bg-transparent py-3 lg:py-6 shadow-sm lg:shadow-none"
            : isScrolled || isMobileOpen
            ? "bg-white shadow-lg shadow-black/5 py-3" 
            : "bg-white border-b border-gray-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* =========================================
              MOBILE NAVBAR (lg:hidden)
          ========================================= */}
          <div className="flex items-center justify-between lg:hidden w-full relative">
            
            {/* Left: Hamburger */}
            <div className="flex-1 flex items-center justify-start">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`${iconColor} p-2 -ml-2 transition-colors`}
                aria-label="Menu"
              >
                {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-1 flex items-center justify-center z-50">
              <span className={`font-black text-[22px] tracking-tight ${textPrimary}`}>
                HID<span className={`font-semibold ${logoRed}`}> PowerTools</span>
              </span>
            </Link>

            {/* Right: Icons */}
            <div className="flex-1 flex items-center justify-end gap-3 z-50">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${iconColor} transition-colors p-2`}
                aria-label="Search"
              >
                <Search size={24} />
              </button>
              
              <button 
                className={`relative ${iconColor} transition-colors p-2 -mr-2`}
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#D42B2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-transparent">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
          </div>

          {/* =========================================
              DESKTOP NAVBAR (hidden lg:flex)
          ========================================= */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            <Link href="/" className="flex items-center z-50">
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${textPrimary}`}>
                HID<span className={`font-semibold ${logoRed}`}> PowerTools</span>
              </span>
            </Link>

            <div className="flex gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive ? (isTransparent ? "text-white font-bold" : "text-[#D42B2B]") : textMuted
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-6 z-50">
              <form 
                onSubmit={handleSearchSubmit} 
                className={`flex items-center transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}
              >
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..." 
                  className={`w-full text-sm px-4 py-2 border rounded-full focus:outline-none transition-colors ${
                    isTransparent 
                      ? "bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/20" 
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B]"
                  }`}
                />
              </form>

              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${iconColor} transition-colors p-2 -m-2`} 
                aria-label="Search"
              >
                {isSearchOpen ? <X size={24} /> : <Search size={24} />}
              </button>
              
              <button 
                className={`relative ${iconColor} transition-colors p-2 -m-2`}
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D42B2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${textMuted}`}
                    >
                      <User size={18} />
                      My Account
                    </Link>
                    <div className={`w-[1px] h-4 ${isTransparent ? 'bg-white/30' : 'bg-gray-300'}`}></div>
                    <div className="w-24">
                      <LogoutButton />
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`text-sm font-medium transition-colors ${textMuted}`}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className={`rounded-lg px-4 py-2 text-sm font-bold bg-[#D42B2B] text-white hover:bg-[#b02222] shadow-sm transition-all`}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 bg-white z-50 flex flex-col w-[85vw] max-w-[320px] shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="font-black text-[20px] tracking-tight text-gray-900">
                  HID<span className="text-[#D42B2B]"> PowerTools</span>
                </span>
                <button 
                  onClick={() => setIsMobileOpen(false)} 
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Drawer Links */}
              <div className="flex flex-col flex-1 px-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-bold text-gray-900 py-4 border-b border-gray-50 flex items-center justify-between active:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Drawer Footer (Auth) */}
              <div className="px-6 py-8 bg-gray-50 mt-auto flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className="w-full bg-white border border-gray-200 text-gray-900 text-center rounded-xl py-3.5 text-[15px] font-bold shadow-sm active:scale-95 transition-transform"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      My Account
                    </Link>
                    <div onClick={() => setIsMobileOpen(false)}>
                      <LogoutButton />
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full bg-white border border-gray-200 text-gray-900 text-center rounded-xl py-3.5 text-[15px] font-bold shadow-sm active:scale-95 transition-transform"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full bg-[#D42B2B] text-white text-center rounded-xl py-3.5 text-[15px] font-bold shadow-md shadow-red-500/20 active:scale-95 transition-transform"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
