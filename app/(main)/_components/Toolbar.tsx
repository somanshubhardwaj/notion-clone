"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
interface ToolbarProps {
  initialdata: Doc<"documents">;
  preview?: boolean;
}
import IconPicker from "@/components/iconPicker";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const Toolbar = ({ initialdata, preview }: ToolbarProps) => {
  return (
    <div>
      {!!initialdata.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialdata.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
