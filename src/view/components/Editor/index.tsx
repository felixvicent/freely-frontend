import { EditorContent } from '@tiptap/react';
import { Button } from 'antd';

import { useEditor } from './useEditor';

interface EditorProps {
  initialContent?: string;
  showActions?: boolean;
  onFinish: (newValue?: string) => Promise<void>;
}

export function Editor({
  initialContent = '',
  showActions = true,
  onFinish,
}: EditorProps) {
  const { editor, isEditing, handleStartEditing, handleStopEditing } =
    useEditor({ initialContent });

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
              handleStopEditing();
            }}
            size="small"
            type="primary"
          >
            Salvar
          </Button>
          <Button onClick={handleStopEditing} size="small">
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}
