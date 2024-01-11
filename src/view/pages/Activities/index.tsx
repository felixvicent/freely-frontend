import { Col, Row, Avatar as AvatarAntd } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ActivityStatus } from '../../../app/entities/ActivityStatus';
import { User } from '../../../app/entities/User';
import { useAuth } from '../../../app/hooks/useAuth';
import { Avatar } from '../../components/Avatar';
import { Drop } from '../../components/Drop';

import { useActivities } from './useActivities';

export function Activities() {
  const {
    isLoading,
    pendingActivities,
    waitingActivities,
    progressActivities,
    doneActivities,
    collaborators,
    handleChangeCollaboratorsFilter,
    selectedCollaborators,
  } = useActivities();

  const { user } = useAuth();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Atividades</h1>
      </div>

      <div>
        <AvatarAntd.Group className="p-2 flex gap-2 justify-end" maxCount={5}>
          {collaborators
            ?.sort((a: User) => {
              if (a.id === user.id) return -1;
              return 0;
            })
            .map((collaborator) => (
              <Avatar.Collaborator
                role={collaborator.role}
                key={collaborator.id}
                onClick={() => handleChangeCollaboratorsFilter(collaborator.id)}
                className={`cursor-pointer ${
                  selectedCollaborators.includes(collaborator.id)
                    ? '!border-purple-700 border'
                    : ''
                }`}
                size="large"
                label={collaborator.name}
              />
            ))}
        </AvatarAntd.Group>
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
