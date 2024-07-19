"use client";
import React from "react";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={process.env.homeurl}
              signUpFallbackRedirectUrl={process.env.homeurl}
              signUpForceRedirectUrl={process.env.homeurl}
              forceRedirectUrl={process.env.homeurl}
            >
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={process.env.homeurl}
              signUpFallbackRedirectUrl={process.env.homeurl}
              signUpForceRedirectUrl={process.env.homeurl}
              forceRedirectUrl={process.env.homeurl}
            >
              <Button size="sm">Get Sotion for free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Sotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
