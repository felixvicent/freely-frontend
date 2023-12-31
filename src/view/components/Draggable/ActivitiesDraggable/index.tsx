import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { ActivityStatus } from '../../../../app/entities/AcitivtyStatus';
import { Activity } from '../../../../app/entities/Activity';
import { getRemainigDate } from '../../../../app/utils/date/getRemainingDate';
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
      >
        <span
          className={`flex items-center justify-between text-xs ${
            activity.status !== ActivityStatus.DONE &&
            dayjs(activity.estimatedDate)
              .subtract(3, 'days')
              .isBefore(dayjs()) &&
            'text-yellow-500'
          } ${
            activity.status !== ActivityStatus.DONE &&
            dayjs(activity.estimatedDate).isBefore(dayjs()) &&
            'text-red-500'
          }`}
        >
          {activity.status !== ActivityStatus.DONE &&
            dayjs(activity.estimatedDate).format('DD/MM/YYYY')}
          <span>
            {activity.status !== ActivityStatus.DONE ? (
              <>{getRemainigDate(activity.estimatedDate)}</>
            ) : (
              <>
                Finalizado em {dayjs(activity.finishedAt).format('DD/MM/YYYY')}
              </>
            )}
          </span>
        </span>
      </Card>
      <Modal.Confirm
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
