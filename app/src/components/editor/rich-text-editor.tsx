"use client";

import { useEffect, useId } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { UndoRedo, Placeholder } from "@tiptap/extensions";
import { requiredMarkStyle } from "@/lib/field-styles";
import { toDisplayHtml, sanitizeRichText } from "@/lib/rich-text";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const toolbarButtonClass =
  "flex h-[22px] w-[22px] items-center justify-center rounded border border-[var(--om-input-border,#D8D8D4)] bg-[var(--om-surface,#fff)] text-editor-label text-[var(--om-text,#1A1A1A)] hover:bg-[var(--om-input-bg,#F4F4F2)] data-[active=true]:border-[var(--om-accent-bg,#1A1A1A)] data-[active=true]:bg-[var(--om-accent-bg,#1A1A1A)] data-[active=true]:text-[var(--om-accent-fg,#fff)]";

export function RichTextEditor({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  minHeight = 56,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  const id = useId();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      BulletList,
      ListItem,
      UndoRedo,
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    content: toDisplayHtml(value),
    editorProps: {
      attributes: { id, class: "om-rich-content focus:outline-none" },
    },
    onUpdate: ({ editor }) => onChange(sanitizeRichText(editor.getHTML())),
  });

  // Keep the editor in sync when `value` changes from outside (project switch, Reset button)
  // without fighting the user's own typing — only resync when the incoming value actually
  // differs from what the editor would currently render.
  useEffect(() => {
    if (!editor) return;
    const next = toDisplayHtml(value);
    if (editor.getHTML() !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="font-sans text-editor-label font-bold text-[var(--om-text,#1A1A1A)]">
          {label} {required && <span style={requiredMarkStyle}>*</span>}
        </Label>
        <div className="flex flex-shrink-0 gap-1">
          <button
            type="button"
            title="Bold"
            data-active={editor?.isActive("bold") ?? false}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn(toolbarButtonClass, "font-extrabold")}
          >
            B
          </button>
          <button
            type="button"
            title="Italic"
            data-active={editor?.isActive("italic") ?? false}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={cn(toolbarButtonClass, "italic")}
          >
            I
          </button>
          <button
            type="button"
            title="Bullet list"
            data-active={editor?.isActive("bulletList") ?? false}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={toolbarButtonClass}
          >
            •
          </button>
        </div>
      </div>
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className="rich-text-editor w-full rounded-lg border border-[var(--om-input-border,#D8D8D4)] bg-[var(--om-input-bg,#F4F4F2)] px-3.5 py-2.5 font-sans text-editor-body font-normal leading-relaxed text-[var(--om-text,#1A1A1A)] focus-within:border-[var(--om-text,#1A1A1A)] focus-within:ring-2 focus-within:ring-[var(--om-text,#1A1A1A)]/15"
      />
    </div>
  );
}
