"use client";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import Form from "next/form";
import Link from "next/link";
import { useBasketStore } from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemsCount = useBasketStore((state) => state.getItemsCount());
  const [isClient, setIsClient] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isClient) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass shadow-md border-b border-white/60"
          : "bg-white/95 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md group-hover:shadow-brand transition-shadow duration-200">
              <span className="text-white font-black text-sm leading-none">N</span>
            </div>
            <span
              className="text-xl font-black tracking-tight text-gradient hidden sm:block"
              style={{ letterSpacing: "-0.04em" }}
            >
              Nova Shop
            </span>
          </Link>

          {/* ── Search ── */}
          <Form
            action="/search"
            className="flex-1 max-w-xl"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="query"
                id="search"
                placeholder="Search products..."
                className="input-field pr-4"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </Form>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Cart */}
            <Link
              href="/my-cart"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors hidden sm:block">
                Cart
              </span>
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-scale-in">
                  {itemsCount > 99 ? "99+" : itemsCount}
                </span>
              )}
            </Link>

            {/* Orders (only when signed in) */}
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors hidden sm:block">
                    Orders
                  </span>
                </Link>
              </SignedIn>

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 ring-2 ring-indigo-200",
                      },
                    }}
                  />
                  <div className="hidden md:flex flex-col leading-tight">
                    <span className="text-xs text-slate-400 font-medium">Welcome back</span>
                    <span className="text-sm font-semibold text-slate-700 truncate max-w-[100px]">
                      {user.firstName ?? user.fullName}
                    </span>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="btn btn-primary text-sm px-4 py-2">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
