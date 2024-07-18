"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/app/(main)/_components/Toolbar";
import Cover from "@/components/Cover";
interface DocumentPageProps {
  params: { documentId: Id<"documents"> };
}
const DocumentPage = ({ params }: DocumentPageProps) => {
  const document = useQuery(api.documents.getbyId, {
    id: params.documentId,
  });
  if (document === undefined) return <div>Loading...</div>;
  if (document === null) return <div>Not found</div>;
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialdata={document} />
      </div>
    </div>
  );
};

export default DocumentPage;
