import { Card, List } from "antd";
import { CSSProperties } from "react";
import { useDoneActivitiesDrop } from "./useDoneActivitiesDrop";
import { Draggable } from "../../Draggable";

const style: CSSProperties = {
  opacity: 0.5,
};

export function DoneActivitiesDrop() {
  const { doneActivities, drop, isActive, isLoading } = useDoneActivitiesDrop();

  return (
    <Card ref={drop} title="Feito" size="small" style={isActive ? style : {}}>
      <List
        dataSource={doneActivities}
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
