"use client";
import { ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";
import { Search } from "lucide-react";
import { SearchCommands } from "@/components/searchcommans";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommands />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
