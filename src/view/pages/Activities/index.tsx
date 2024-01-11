import { Col, Row } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ActivityStatus } from '../../../app/entities/ActivityStatus';
import { Drop } from '../../components/Drop';

import { useActivities } from './useActivities';

export function Activities() {
  const {
    isLoading,
    pendingActivities,
    waitingActivities,
    progressActivities,
    doneActivities,
  } = useActivities();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Atividades</h1>
      </div>

      <DndProvider backend={HTML5Backend}>
        <Row gutter={16}>
          <Col span={6}>
            <Drop.Activities
              activities={pendingActivities}
              isLoading={isLoading}
              status={ActivityStatus.PENDING}
              title="Pendentes"
            />
          </Col>
          <Col span={6}>
            <Drop.Activities
              activities={waitingActivities}
              isLoading={isLoading}
              status={ActivityStatus.WAITING}
              title="Esperando"
            />
          </Col>
          <Col span={6}>
            <Drop.Activities
              activities={progressActivities}
              isLoading={isLoading}
              status={ActivityStatus.PROGRESS}
              title="Em andamento"
            />
          </Col>
          <Col span={6}>
            <Drop.Activities
              activities={doneActivities}
              isLoading={isLoading}
              status={ActivityStatus.DONE}
              title="Finalizadas"
            />
          </Col>
        </Row>
      </DndProvider>
    </div>
  );
}
