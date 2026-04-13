'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback } from 'react';

interface KudoEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  placeholder: string;
  mentionHint: string;
  communityStandardsLabel: string;
  communityStandardsHref: string;
  error?: string;
}

interface ToolbarButtonConfig {
  key: string;
  label: string;
  ariaLabel: string;
  action: () => void;
  isActive: boolean;
}

function ToolbarButton({
  label,
  ariaLabel,
  action,
  isActive,
}: Omit<ToolbarButtonConfig, 'key'>): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={action}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className="flex h-10 w-10 items-center justify-center text-sm transition-colors duration-100"
      style={{
        borderRight: '1px solid var(--color-toolbar-border)',
        backgroundColor: isActive ? 'var(--color-toolbar-active)' : 'transparent',
        color: isActive ? 'var(--color-text-dark)' : 'var(--color-chip-text)',
        fontWeight: isActive ? 700 : 400,
      }}
    >
      {label}
    </button>
  );
}

export default function KudoEditor({
  content,
  onUpdate,
  placeholder,
  mentionHint,
  communityStandardsLabel,
  communityStandardsHref,
  error,
}: KudoEditorProps): React.JSX.Element {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: false,
        codeBlock: false,
        code: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onUpdate(e.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'w-full min-h-[120px] px-4 py-3 text-sm outline-none prose prose-sm max-w-none',
        style: `color: var(--color-text-dark); font-family: var(--font-montserrat);`,
        'aria-required': 'true',
      },
    },
  });

  const toggleBold = useCallback(() => editor?.chain().focus().toggleBold().run(), [editor]);
  const toggleItalic = useCallback(() => editor?.chain().focus().toggleItalic().run(), [editor]);
  const toggleStrike = useCallback(() => editor?.chain().focus().toggleStrike().run(), [editor]);
  const toggleOrderedList = useCallback(() => editor?.chain().focus().toggleOrderedList().run(), [editor]);
  const toggleBlockquote = useCallback(() => editor?.chain().focus().toggleBlockquote().run(), [editor]);

  const insertLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const buttons: ToolbarButtonConfig[] = [
    { key: 'bold', label: 'B', ariaLabel: 'Bold (Ctrl+B)', action: toggleBold, isActive: editor?.isActive('bold') ?? false },
    { key: 'italic', label: 'I', ariaLabel: 'Italic (Ctrl+I)', action: toggleItalic, isActive: editor?.isActive('italic') ?? false },
    { key: 'strike', label: 'S', ariaLabel: 'Strikethrough', action: toggleStrike, isActive: editor?.isActive('strike') ?? false },
    { key: 'orderedList', label: '≡', ariaLabel: 'Ordered list', action: toggleOrderedList, isActive: editor?.isActive('orderedList') ?? false },
    { key: 'link', label: '🔗', ariaLabel: 'Insert link (Ctrl+K)', action: insertLink, isActive: editor?.isActive('link') ?? false },
    { key: 'blockquote', label: '❝', ariaLabel: 'Blockquote', action: toggleBlockquote, isActive: editor?.isActive('blockquote') ?? false },
  ];

  return (
    <div className="flex flex-col">
      <div
        className="overflow-hidden rounded-lg"
        style={{
          border: error ? 'var(--border-input-error)' : 'var(--border-input)',
        }}
      >
        {/* C — Formatting Toolbar */}
        <div
          className="flex h-10 items-center"
          style={{ borderBottom: '1px solid var(--color-toolbar-border)' }}
        >
          {buttons.map(({ key, ...props }) => (
            <ToolbarButton key={key} {...props} />
          ))}
          {/* TODO(Q7): confirm community standards URL */}
          <a
            href={communityStandardsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-3 text-sm font-medium hover:underline"
            style={{ color: 'var(--color-community-link)' }}
          >
            {communityStandardsLabel}
          </a>
        </div>

        {/* D — Editor Content */}
        <EditorContent editor={editor} />
      </div>

      {/* D.1 — Mention Hint */}
      <p
        className="mt-2 text-center text-xs"
        style={{ color: 'var(--color-text-hint)' }}
      >
        {mentionHint}
      </p>

      {error && (
        <p
          className="mt-1 text-xs"
          role="alert"
          style={{ color: 'var(--color-text-required)' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
