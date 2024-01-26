import Placeholder from '@tiptap/extension-placeholder';
import { useEditor as useEditorTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

interface useEditorProps {
  initialContent: string;
}

export function useEditor({ initialContent }: useEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditorTipTap({
    extensions: [
      StarterKit,
      Placeholder.configure({
        includeChildren: true,
        placeholder: 'Nenhuma descrição',
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
