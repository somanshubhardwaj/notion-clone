"use client";
import React from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./Title";
import Banner from "./Banner";
import MenuItem from "./MenuItem";
import Publish from "./Publish";
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getbyId, {
    id: params.documentId as Id<"documents">,
  });
  if (document === undefined)
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 flex items-center gap-x-4 w-full">
        <Title.Skeleton />
      </nav>
    );
  if (document === null) return <p>not found</p>;
  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 flex items-center gap-x-4 w-full">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialdata={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialdata={document} />
            <MenuItem documentId={document._id} />
          </div>
        </div>
      </nav>
      {document?.isArchived && <Banner documentId={document?._id} />}
    </>
  );
};

export default Navbar;
