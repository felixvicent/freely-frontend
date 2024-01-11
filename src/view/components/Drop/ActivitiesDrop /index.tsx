import { Card, List } from 'antd';
import { CSSProperties } from 'react';

import { Activity } from '../../../../app/entities/Activity';
import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { Draggable } from '../../Draggable';

import { useActivitiesDrop } from './useActivitiesDrop';

const style: CSSProperties = {
  opacity: 0.5,
};

interface ActivitiesDropProps {
  activities?: Activity[];
  isLoading: boolean;
  status: ActivityStatus;
  title: string;
}

export function ActivitiesDrop({
  activities,
  isLoading,
  status,
  title,
}: ActivitiesDropProps) {
  const { drop, isActive } = useActivitiesDrop(status);

  return (
    <Card ref={drop} title={title} size="small" style={isActive ? style : {}}>
      <List
        dataSource={activities}
        loading={isLoading}
        renderItem={(activity) => (
          <div className="my-2">
            <Draggable.Activities activity={activity} />
          </div>
        )}
      />
    </Card>
  );
}
