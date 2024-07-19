"use client";
import React, { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/app/(main)/_components/Toolbar";
import Cover from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
interface DocumentPageProps {
  params: { documentId: Id<"documents"> };
}
const DocumentPage = ({ params }: DocumentPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );
  const document = useQuery(api.documents.getbyId, {
    id: params.documentId,
  });
  const update = useMutation(api.documents.update);
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content: content,
    });
  };
  if (document === undefined)
    return (
      <div>
        <div className="pl-8 pt-4 space-y-4">
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );

  if (document === null) return <div>Not found</div>;
  return (
    <div className="pb-40 p-2">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialdata={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentPage;
