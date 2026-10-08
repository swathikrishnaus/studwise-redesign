"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CloudButton from "@/components/ui/CloudButton";

export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full transition-colors">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Studwise Home">
          <div className="relative w-36 h-10 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Studwise Logo"
              width={130}
              height={40}
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-normal text-slate-700">
          <Link
            href="/study-destinations"
            className="hover:text-[#009cd9] transition-colors py-2 flex items-center gap-1 group"
          >
            Study Destinations
            <svg
              className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#009cd9] transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>

          <Link
            href="/courses"
            className="hover:text-[#009cd9] transition-colors py-2"
          >
            Courses & Degrees
          </Link>

          <Link
            href="/universities"
            className="hover:text-[#009cd9] transition-colors py-2"
          >
            Universities
          </Link>

          <Link
            href="/services"
            className="hover:text-[#009cd9] transition-colors py-2"
          >
            Services & Visas
          </Link>

          <Link
            href="/about"
            className="hover:text-[#009cd9] transition-colors py-2"
          >
            About Us
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick WhatsApp connect */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-slate-600 hover:text-[#009cd9] px-3.5 py-2.5 rounded-full hover:bg-slate-50 transition-all border border-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Talk to Counselor
          </a>

          {/* Primary Action Button */}
          <CloudButton href="#consultation-panel" size="sm" className="mt-0">
            Book Free Advisory
          </CloudButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <CloudButton href="#consultation-panel" size="sm" icon={false} className="mt-0">
            Free Advisory
          </CloudButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-black focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-5 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-normal text-slate-800">
            <Link href="/study-destinations" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#009cd9]">Study Destinations</Link>
            <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#009cd9]">Courses & Degrees</Link>
            <Link href="/universities" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#009cd9]">Universities</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#009cd9]">Services</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#009cd9]">About Studwise</Link>
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <CloudButton
              href="#consultation-panel"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Book Free Advisory Session
            </CloudButton>
          </div>
        </div>
      )}
    </header>
  );
}
