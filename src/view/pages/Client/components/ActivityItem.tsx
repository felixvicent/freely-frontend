import { MdCheck, MdPendingActions } from "react-icons/md";
import { ActivityStatus } from "../../../../app/entities/AcitivtyStatus";
import { TbProgress } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { Tooltip } from "antd";
import { getLabelByStatus } from "../../../../app/utils/labels/getLabelByStatus";

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
    }
  }

  return (
    <Tooltip title={getLabelByStatus(status)} placement="topLeft">
      <span className="flex items-center gap-1">
        {getIconByStatus(status)}
        {activity}
      </span>
    </Tooltip>
  );
}
