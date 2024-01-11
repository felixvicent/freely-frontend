import { Card, Col, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { getRemainigDate } from '../../../../app/utils/date/getRemainingDate';
import { getActivityLabelByStatus } from '../../../../app/utils/labels/getActivityLabelByStatus';

import { useActivityDetailsModal } from './useActivityDetailsModal';

interface ActivityDetailsModalProps {
  activityId: string;
  onClose: () => void;
  open: boolean;
}

export function ActivityDetailsModal({
  activityId,
  onClose,
  open,
}: ActivityDetailsModalProps) {
  const { activity, handleChangeStatus, isLoading } = useActivityDetailsModal(
    activityId,
    open,
  );

  console.log(activity?.estimatedDate);
  console.log(dayjs());
  console.log(dayjs(activity?.estimatedDate).isBefore(dayjs()));

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={
        <div className="flex items-center justify-start">
          <Link to={`/projects/${activity?.project.id}`}>
            {activity?.project.title}
          </Link>
          <MdOutlineKeyboardArrowRight />
          {activity?.title}
        </div>
      }
      width={900}
    >
      <Row gutter={16}>
        <Col span={16} />
        <Col span={8}>
          <Card>
            <div className="flex flex-col gap-2">
              <div>
                <h4>Status</h4>
                <Select
                  loading={isLoading}
                  className="w-60"
                  rootClassName="[&>div]:!pl-0"
                  value={activity?.status}
                  bordered={false}
                  options={Object.values(ActivityStatus).map((status) => ({
                    label: getActivityLabelByStatus(status),
                    value: status,
                  }))}
                  onChange={(value: ActivityStatus) =>
                    handleChangeStatus(value)
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
        </Col>
      </Row>
    </Modal>
  );
}
