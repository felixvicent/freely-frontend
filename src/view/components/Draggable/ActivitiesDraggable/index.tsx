import { Button, Card } from 'antd';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { Activity } from '../../../../app/entities/Activity';
import { Modal } from '../../Modal';

import { useActivitiesDraggable } from './useActivitiesDraggable';

interface ActivitiesDraggableProps {
  activity: Activity;
  projectId: string;
}

export function ActivitiesDraggable({
  activity,
  projectId,
}: ActivitiesDraggableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { drag, handleDeleteActivity, isLoading } = useActivitiesDraggable(
    activity,
    projectId,
  );

  return (
    <>
      <Card
        size="small"
        ref={drag}
        title={activity.title}
        extra={
          <Button
            className="p-0"
            type="link"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <BsTrash color="#f00" />
          </Button>
        }
      />
      <Modal.Remove
        message={`Deseja realmente remover a atividade ${activity.title}`}
        isLoading={isLoading}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={() => handleDeleteActivity(activity.id)}
        title="Remover atividade"
      />
    </>
  );
}
