import { Col, Modal, Row } from 'antd';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Content } from './Content';
import { Details } from './Details';
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
  const { activity } = useActivityDetailsModal(activityId, open);

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
        <Col span={16}>
          <Content activity={activity} />
        </Col>
        <Col span={8}>
          <Details activityId={activityId} isOpen={open} />
        </Col>
      </Row>
    </Modal>
  );
}
