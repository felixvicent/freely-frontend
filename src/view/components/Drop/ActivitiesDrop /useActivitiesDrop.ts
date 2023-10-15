import { useDrop } from 'react-dnd';

import { ActivityStatus } from '../../../../app/entities/AcitivtyStatus';

export function useActivitiesDrop(status: ActivityStatus) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return { drop, isActive };
}
