"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCover } from "@/hooks/useCover";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
  url?: string;
  preview?: boolean;
}
const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const coverImage = useCover();
  const removeCover = useMutation(api.documents.removeCover);
  const { edgestore } = useEdgeStore();
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url: url });
    }
    await removeCover({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group ",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill className="object-cover" alt="Cover" />}
      {url && !preview && (
        <div className="lg:opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
