import { Card, List } from "antd";
import { CSSProperties } from "react";
import { useWaitingActivitiesDrop } from "./useWaitingActivitiesDrop";
import { Draggable } from "../../Draggable";

const style: CSSProperties = {
  opacity: 0.5,
};

export function WaitingActivitiesDrop() {
  const { drop, isActive, isLoading, waitingActivities } =
    useWaitingActivitiesDrop();

  return (
    <Card
      ref={drop}
      title="Em espera"
      size="small"
      style={isActive ? style : {}}
    >
      <List
        dataSource={waitingActivities}
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
