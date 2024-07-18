"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";
interface BannerProps {
  documentId: Id<"documents">;
}
const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored",
      error: "Failed to restore",
    });
  };
  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Removed",
      error: "Failed to remove",
    });
    router.push("/documents");
  };
  return (
    <div className="w-full text-center text-sm bg-rose-500 p-2 flex items-center gap-x-2 justify-center text-white">
      <p>This page is in thrash</p>
      <Button
        onClick={onRestore}
        variant="outline"
        size="sm"
        className="bg-transparent border-white border hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal "
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-white border hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal "
        >
          Remove
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
