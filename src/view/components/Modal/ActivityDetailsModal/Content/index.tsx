import { Typography } from 'antd';

import { Activity } from '../../../../../app/entities/Activity';
import { Editor } from '../../../Editor';

import { useContent } from './useContent';

interface ContentProps {
  activity?: Activity;
}

export function Content({ activity }: ContentProps) {
  const { handleUpdateDescription } = useContent(activity?.id);

  return (
    <div className="py-4">
      <Typography.Text className="font-bold">Descrição</Typography.Text>
      <Editor
        initialContent={activity?.description}
        showActions={false}
        onFinish={handleUpdateDescription}
      />
    </div>
  );
}
