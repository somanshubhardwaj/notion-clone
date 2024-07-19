"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";
interface PublishProps {
  initialdata: Doc<"documents">;
}
const Publish = ({ initialdata }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const url = `${origin}/preview/${initialdata._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialdata._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published",
      error: "Failed to publish",
    });
  };
  const onUnpublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialdata._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));
    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Unpublished",
      error: "Failed to unpublish",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button size={"sm"} variant={"ghost"}>
          {initialdata.isPublished ? "Unpublish" : "Publish"}
          {initialdata.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialdata.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse w-6 h-6" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1  h-8 bg-muted truncate text-xs  px-2 rounded-l-md"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="rounded-l-none h-8 "
              >
                {copied ? (
                  <Check className="h-4 w-4 " />
                ) : (
                  <Copy className="h-4 w-4 " />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              size={"sm"}
              onClick={onUnpublish}
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="text-muted-foreground w-12 h-12 mb-2" />
            <p className="text-xs text-muted-foreground  mb-2">
              Publish your document
            </p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with other
            </span>
            <Button
              className="w-full text-xs "
              size={"sm"}
              onClick={onPublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
