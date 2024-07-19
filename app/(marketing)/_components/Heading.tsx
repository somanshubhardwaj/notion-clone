"use client";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas and Documents in One Place Welcome to sotion
      </h1>
      <h3 className="text-base sm:text-xl font-medium md:text-2xl">
        Sotion is a platform that allows you to store <br /> your ideas and
        documents in one place.
      </h3>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          {" "}
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Sotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton
          mode="modal"
          fallbackRedirectUrl={process.env.homeurl}
          signUpFallbackRedirectUrl={process.env.homeurl}
          signUpForceRedirectUrl={process.env.homeurl}
          forceRedirectUrl={process.env.homeurl}
        >
          <Button>
            Get Sotion for free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
