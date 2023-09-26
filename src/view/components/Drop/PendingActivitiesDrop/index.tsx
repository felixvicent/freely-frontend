import { Card, List } from "antd";
import { Draggable } from "../../Draggable";
import { CSSProperties } from "react";
import { usePendingActivitiesDrop } from "./usePedingActivitiesDrop";

const style: CSSProperties = {
  opacity: 0.5,
};

export function PendingActivitiesDrop() {
  const { isLoading, pendingActivities, drop, isActive } =
    usePendingActivitiesDrop();

  return (
    <Card
      ref={drop}
      title="Pendentes"
      size="small"
      style={isActive ? style : {}}
    >
      <List
        dataSource={pendingActivities}
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
