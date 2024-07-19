"use client";
import exp from "constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCover } from "@/hooks/useCover";
import { SingleImageDropzone } from "../ImageDropzone";
import React, { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { set } from "zod";
export const CoverImageModal = () => {
  const update = useMutation(api.documents.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCover();
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-semibold text-center">Cover Image</h2>
        </DialogHeader>
        <DialogTitle>
          <span className="text-sm font-medium">
            Upload a cover image for your document.
          </span>
        </DialogTitle>
        <SingleImageDropzone
          onChange={onChange}
          className="w-full outline-none "
          disabled={isSubmitting}
          value={file}
        />
      </DialogContent>
    </Dialog>
  );
};
