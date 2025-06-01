// components/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { Toolbar } from "./Toolbar";

interface RichTextEditorProps {
  onChange: (value: string) => void;
  defaultContent?: string;
}

export const RichTextEditor = ({ onChange, defaultContent }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: defaultContent || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html); // Set content in parent form
    },
  });

  useEffect(() => {
    if (editor && defaultContent) {
      editor.commands.setContent(defaultContent);
    }
  }, [editor, defaultContent]);

  return (
    <div className="border rounded">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[150px] p-3" />
    </div>
  );
};
