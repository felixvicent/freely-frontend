import { Card, Select as SelectAntd } from 'antd';
import dayjs from 'dayjs';

import { ActivityStatus } from '../../../../../app/entities/ActivityStatus';
import { getRemainigDate } from '../../../../../app/utils/date/getRemainingDate';
import { getActivityLabelByStatus } from '../../../../../app/utils/labels/getActivityLabelByStatus';
import { Select } from '../../../Select';
import { useActivityDetailsModal } from '../useActivityDetailsModal';

interface DetailsProps {
  activityId: string;
  isOpen: boolean;
}

export function Details({ activityId, isOpen }: DetailsProps) {
  const {
    isUpdateActivityStatusLoading,
    activity,
    handleChangeStatus,
    isUpdateActivityResponsibleLoading,
    handleUpdateActivityResponsible,
  } = useActivityDetailsModal(activityId, isOpen);

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <div>
          <h4>Status</h4>
          <SelectAntd
            loading={isUpdateActivityStatusLoading}
            className="w-full"
            rootClassName="[&>div]:!pl-0"
            value={activity?.status}
            bordered={false}
            options={Object.values(ActivityStatus).map((status) => ({
              label: getActivityLabelByStatus(status),
              value: status,
            }))}
            onChange={(value: ActivityStatus) => handleChangeStatus(value)}
          />
        </div>
        <div>
          <h4>Responsável</h4>
          <Select.Collaborator
            bordered={false}
            value={activity?.responsible ? activity?.responsible.id : undefined}
            loading={isUpdateActivityResponsibleLoading}
            className="w-full"
            rootClassName="[&>div]:!pl-0 [& div]:!inset-0 [&>div>span]:!inset-0"
            onChange={(value?: string) =>
              handleUpdateActivityResponsible(value)
            }
          />
        </div>
        <div>
          <h4>Data estimada de termino</h4>
          <span>
            {dayjs(activity?.estimatedDate).format('DD/MM/YYYY')}{' '}
            <span className="text-xs">
              {activity?.status !== ActivityStatus.DONE &&
                `(${getRemainigDate(activity?.estimatedDate ?? '')})`}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}
