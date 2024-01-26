import { EditorContent } from '@tiptap/react';
import { Button } from 'antd';

import { useEditor } from './useEditor';

interface EditorProps {
  initialContent?: string;
  placeholder?: string;
  showActions?: boolean;
  onFinish: (newValue?: string) => Promise<void>;
  isLoading?: boolean;
}

export function Editor({
  initialContent = '',
  showActions = true,
  onFinish,
  placeholder,
  isLoading = false,
}: EditorProps) {
  const { editor, isEditing, handleStartEditing, handleStopEditing } =
    useEditor({ initialContent, placeholder });

  return (
    <div>
      <EditorContent
        editor={editor}
        className="outline-0 [&>div]:outline-none"
        onFocus={handleStartEditing}
      />
      {(showActions || isEditing) && (
        <div className="mt-4 flex gap-3 items-center justify-end">
          <Button
            onClick={() => {
              onFinish(editor?.getHTML());
              editor?.commands.clearContent();
              handleStopEditing();
            }}
            size="small"
            type="primary"
          >
            Salvar
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              handleStopEditing();
              editor?.commands.clearContent();
            }}
            size="small"
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}
