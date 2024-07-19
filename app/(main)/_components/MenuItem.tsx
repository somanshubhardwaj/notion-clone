"use client";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
interface MenuItemProps {
  documentId: Id<"documents">;
}
const MenuItem = ({ documentId }: MenuItemProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const onArchive = async () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Archiving...",
      success: "Archived",
      error: "Failed to archive",
    });
    router.push(`/documents`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-0">
        <Button variant="ghost" size="sm" className="">
          <MoreHorizontal className="w-4 h-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="w-4 h-4 mr-2" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuItem;
