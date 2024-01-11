import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { BsTrash } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

import { Activity } from '../../../../app/entities/Activity';
import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { getRemainigDate } from '../../../../app/utils/date/getRemainingDate';
import { isInAlert } from '../../../../app/utils/date/isInAlert';
import { isInDanger } from '../../../../app/utils/date/isInDanger';
import { Modal } from '../../Modal';

import { useActivitiesDraggable } from './useActivitiesDraggable';

interface ActivitiesDraggableProps {
  activity: Activity;
}

export function ActivitiesDraggable({ activity }: ActivitiesDraggableProps) {
  const location = useLocation();

  const {
    drag,
    handleDeleteActivity,
    isLoading,
    handleCloseDeleteModal,
    handleCloseModal,
    handleOpenDeleteModal,
    handleOpenModal,
    isDeleteModalOpen,
    isModalActivityOpen,
  } = useActivitiesDraggable(activity);

  const title =
    location.pathname.split('/')[1] === 'activities'
      ? `${activity.project.title} > ${activity.title}`
      : activity.title;

  return (
    <>
      <Card
        size="small"
        ref={drag}
        title={title}
        onClick={handleOpenModal}
        extra={
          <Button className="p-0" type="link" onClick={handleOpenDeleteModal}>
            <BsTrash color="#f00" />
          </Button>
        }
      >
        <span
          className={`flex items-center justify-between text-xs ${
            activity.status !== ActivityStatus.DONE &&
            isInDanger(activity.estimatedDate)
              ? 'text-red-500'
              : activity.status !== ActivityStatus.DONE &&
                isInAlert(activity.estimatedDate) &&
                'text-yellow-500'
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
        onClose={handleCloseDeleteModal}
        onSubmit={() => handleDeleteActivity(activity.id)}
        title="Remover atividade"
      />
      <Modal.ActivityDetails
        activityId={activity.id}
        onClose={handleCloseModal}
        open={isModalActivityOpen}
      />
    </>
  );
}
