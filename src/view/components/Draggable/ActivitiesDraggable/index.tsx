import { Card } from "antd";
import { Activity } from "../../../../app/entities/Activity";
import { useActivitiesDraggable } from "./useActivitiesDraggable";
import dayjs from "dayjs";

interface ActivitiesDraggableProps {
  activity: Activity;
}

export function ActivitiesDraggable({ activity }: ActivitiesDraggableProps) {
  const { drag } = useActivitiesDraggable(activity);

  return (
    <Card size="small" ref={drag} title={activity.title}>
      <div className="flex flex-col">
        <span>{activity.project.title}</span>
        <span>
          {dayjs(activity.project.estimatedDate).format("DD/MM/YYYY")}
        </span>
      </div>
    </Card>
  );
}
