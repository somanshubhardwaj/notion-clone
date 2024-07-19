"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef } from "react";
interface ToolbarProps {
  initialdata: Doc<"documents">;
  preview?: boolean;
}
import TextareaAutosize from "react-textarea-autosize";
import IconPicker from "@/components/iconPicker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCover } from "@/hooks/useCover";
const Toolbar = ({ initialdata, preview }: ToolbarProps) => {
  const inputRef = React.useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(initialdata.title);
  const update = useMutation(api.documents.update);
  const coverimage = useCover();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialdata.title);
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({ id: initialdata._id, title: value || "Untitled" });
  };
  const onkeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };
  const removeIcon = useMutation(api.documents.removeIcon);
  const onIconSelect = (icon: string) => {
    update({ id: initialdata._id, icon });
  };
  const onRemoveIcon = () => {
    removeIcon({ id: initialdata._id });
  };
  return (
    <div className="group">
      {!!initialdata.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialdata.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {!!initialdata.icon && preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <p className="text-6xl">{initialdata.icon}</p>
        </div>
      )}
      <div className="lg:opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialdata.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="w-6 h-6 mr-2" /> Add icon
            </Button>
          </IconPicker>
        )}
        {!initialdata.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={coverimage.onOpen}
          >
            <ImageIcon className="w-6 h-6 mr-2" /> Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={onkeydown}
          onBlur={disableInput}
          className="text-5xl font-bold w-full bg-transparent border-none outline-none break-words text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initialdata.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
