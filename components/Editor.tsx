"use client";
import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}
// check bookmarks
const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={() => onChange(JSON.stringify(editor.document))}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
