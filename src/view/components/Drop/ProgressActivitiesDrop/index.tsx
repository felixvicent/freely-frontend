import { Card, List } from "antd";
import { CSSProperties } from "react";
import { useProgressActivitiesDrop } from "./useProgressActivitiesDrop";
import { Draggable } from "../../Draggable";

const style: CSSProperties = {
  opacity: 0.5,
};

export function ProgressActivitiesDrop() {
  const { drop, isActive, isLoading, progressActivities } =
    useProgressActivitiesDrop();

  return (
    <Card
      ref={drop}
      title="Em andamento"
      size="small"
      style={isActive ? style : {}}
    >
      <List
        dataSource={progressActivities}
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
