import Placeholder from '@tiptap/extension-placeholder';
import { useEditor as useEditorTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

interface useEditorProps {
  initialContent: string;
  placeholder?: string;
}

export function useEditor({ initialContent, placeholder }: useEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditorTipTap({
    extensions: [
      StarterKit,
      Placeholder.configure({
        includeChildren: true,
        placeholder: placeholder ?? '',
      }),
    ],
    content: initialContent,
  });

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleStopEditing() {
    setIsEditing(false);
  }

  return { editor, isEditing, handleStartEditing, handleStopEditing };
}
