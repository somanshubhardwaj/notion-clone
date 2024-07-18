"use client";

import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
const Trashbox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.gettrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = async (id: string) => {
    router.push(`/documents/${id}`);
  };
  const onRestore = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: docId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Document restored",
      error: "Failed to restore document",
    });
  };
  const onRemove = async (docId: Id<"documents">) => {
    const promise = remove({ id: docId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Document removed",
      error: "Failed to remove document",
    });
    if (params.documentId === docId) {
      router.push("/documents");
    }
  };
  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          placeholder="filter by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 p-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No Document Found
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            onClick={() => onClick(doc._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600  "
                role="button"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trashbox;
