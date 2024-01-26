import { Typography } from 'antd';
import dayjs from 'dayjs';

import { Activity } from '../../../../../app/entities/Activity';
import { Avatar } from '../../../Avatar';
import { Editor } from '../../../Editor';

import { useContent } from './useContent';

interface ContentProps {
  activity?: Activity;
}

export function Content({ activity }: ContentProps) {
  const {
    handleUpdateDescription,
    handleCreateComment,
    isCreateCommentLoading,
    comments,
  } = useContent(activity?.id);

  return (
    <div className="py-4">
      <div className="h-[300px]">
        <Typography.Text className="font-bold">Descrição</Typography.Text>
        <Editor
          initialContent={activity?.description}
          showActions={false}
          onFinish={handleUpdateDescription}
          placeholder="Nenhuma descrição"
        />
      </div>
      <div>
        <Typography.Text className="font-bold">Comentarios</Typography.Text>

        <div className="mt-4 flex flex-col gap-4 h-[200px] overflow-y-auto">
          {comments?.map((comment) => (
            <div>
              <div className="flex items-center gap-2">
                <Avatar.Collaborator size="small" label={comment.user.name} />
                <span>{comment.user.name}</span>
                <span className="text-gray-500 text-xs">
                  {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                </span>
              </div>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: comment.comment }}
              />
            </div>
          ))}
        </div>

        <div className="border border-1 border-zinc-300 border-solid mt-4 p-2 rounded-md">
          <Editor
            placeholder="Adicionar comentário"
            showActions={false}
            isLoading={isCreateCommentLoading}
            onFinish={handleCreateComment}
          />
        </div>
      </div>
    </div>
  );
}
