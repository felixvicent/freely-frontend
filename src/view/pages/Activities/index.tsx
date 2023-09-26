import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Drop } from "../../components/Drop";
import { Col, Row } from "antd";

export function Activities() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Atividades</h1>
      </div>
      <div>
        <DndProvider backend={HTML5Backend}>
          <Row gutter={16}>
            <Col span={6}>
              <Drop.PendingActivities />
            </Col>
            <Col span={6}>
              <Drop.WaitingActivities />
            </Col>
            <Col span={6}>
              <Drop.ProgressActivities />
            </Col>
            <Col span={6}>
              <Drop.DoneActivities />
            </Col>
          </Row>
        </DndProvider>
      </div>
    </div>
  );
}
