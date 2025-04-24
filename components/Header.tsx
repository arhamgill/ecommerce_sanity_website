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
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { useBasketStore } from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemsCount = useBasketStore((state) => state.getItemsCount());

  const createClerkPasskey = async () => {
    try {
      await user?.createPasskey();
    } catch (error) {
      console.error("Error creating passkey:", error);
    }
  };
  return (
    <header className="px-1 py-2 sm:px-5 flex flex-col gap-y-3 justify-between items-center lg:flex-row">
      <Link
        href={"/"}
        className="text-3xl text-blue-500 font-semibold hover:text-blue-700 transition-all duration-200"
      >
        Amazon
      </Link>
      <Form action={"/search"}>
        <input
          type="text"
          name="query"
          id="search"
          placeholder="Search products..."
          className="px-3 py-2 border-2 min-w-[300px]"
        />
      </Form>
      <div className="flex items-center gap-3">
        <Link
          href={"/my-cart"}
          className="relative flex items-center hover:text-blue-500 transition-all duration-200"
        >
          <TrolleyIcon className="w-6 h-6" />
          Cart
          <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemsCount}
          </span>
        </Link>
        <ClerkLoaded>
          <SignedIn>
            <Link
              href={"/orders"}
              className="flex items-center hover:text-blue-500 transition-all duration-200"
            >
              <PackageIcon className="w-6 h-6" />
              Orders
            </Link>
          </SignedIn>
          {user ? (
            <div className="flex gap-2 items-center">
              <UserButton />
              <div className="hidden sm:flex flex-col">
                <p>Welcome Back!</p>
                <p>{user.fullName}</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="cursor-pointer hover:text-blue-500 transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          )}
          {user?.passkeys.length == 0 && (
            <button
              onClick={createClerkPasskey}
              className="cursor-pointer border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 px-2 py-1"
            >
              Create Passkey Now!
            </button>
          )}
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;
