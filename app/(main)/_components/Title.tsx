"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
interface TitleProps {
  initialdata: Doc<"documents">;
}
const Title = ({ initialdata }: TitleProps) => {
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [title, setTitle] = React.useState(initialdata.title || "Untitled");
  const enableInput = () => {
    setTitle(initialdata.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };
  const disableInput = () => {
    setIsEditing(false);
  };
  const onChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialdata._id,
      title: e.target.value || "Untitled",
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialdata.icon && <p>{initialdata.icon}</p>}
      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onBlur={disableInput}
          onChange={onChanges}
          value={title}
          onKeyDown={onKeyDown}
          onClick={enableInput}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialdata?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;
Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-4 w-20 rounded-md" />;
};
