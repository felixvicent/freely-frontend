import { Tooltip } from 'antd';
import { IoMdTime } from 'react-icons/io';
import { MdCheck, MdPendingActions } from 'react-icons/md';
import { TbProgress } from 'react-icons/tb';

import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { getActivityLabelByStatus } from '../../../../app/utils/labels/getActivityLabelByStatus';

interface ActivityItemProps {
  status: ActivityStatus;
  activity: string;
}

export function ActivityItem({ status, activity }: ActivityItemProps) {
  function getIconByStatus(status: ActivityStatus) {
    switch (status) {
      case ActivityStatus.DONE:
        return <MdCheck className="text-green-400" />;
      case ActivityStatus.PENDING:
        return <MdPendingActions className="text-yellow-500" />;
      case ActivityStatus.PROGRESS:
        return <TbProgress className="text-purple-400" />;
      case ActivityStatus.WAITING:
        return <IoMdTime className="text-blue-400" />;
      default:
        return null;
    }
  }

  return (
    <Tooltip title={getActivityLabelByStatus(status)} placement="topLeft">
      <span className="flex items-center gap-1">
        {getIconByStatus(status)}
        {activity}
      </span>
    </Tooltip>
  );
}
