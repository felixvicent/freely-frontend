import { Card, Col, Row, Spin, Tooltip, Typography } from "antd";
import { ActivityItem } from "./components/ActivityItem";
import { ActivityStatus } from "../../../app/entities/AcitivtyStatus";
import { formatCurrency } from "../../../app/utils/format/formatCurrency";
import { useClient } from "./useClient";
import { useMemo } from "react";
import { Chart } from "../../components/Chart";

export function Client() {
  const { client, isLoading } = useClient();

  const activitiesStatusChartData = useMemo(() => {
    const data: { status: string; total: number }[] = [];

    client?.projects.forEach((project) => {
      project.activities.forEach((activity) => {
        console.log(activity);
        const previousValue =
          data.find((ac) => ac.status === activity.status)?.total ?? 0;

        const index = data.findIndex((ac) => ac.status === activity.status);

        console.log(data[index]);

        data[index >= 0 ? index : data.length] = {
          status: activity.status,
          total: previousValue + 1,
        };
      });
    });

    console.log(data);
    return data;
  }, [client]);

  if (isLoading) return <Spin />;

  return (
    <div>
      <h3 className="mb-2">Cliente</h3>
      <Row gutter={16} align="stretch">
        <Col span={8}>
          <Card size="small" title="Indentificação" className="h-full">
            <div className="flex flex-col">
              <span>
                <strong>Nome:</strong>{" "}
                {`${client?.firstName} ${client?.lastName ?? ""}`}
              </span>
              <span>
                <strong>CPF/CNPJ:</strong> {client?.document}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="Contato" className="h-full">
            <div className="flex flex-col">
              <span>
                <strong>Email:</strong> {client?.email}
              </span>
              <span>
                <strong>Telefone:</strong> {client?.telephone}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="Endereço" className="-hull">
            <div className="flex flex-col text-xs">
              <span>
                <strong>Endereço:</strong> {client?.address.street},{" "}
                {client?.address.number}
              </span>
              <span>
                {client?.address.city} - {client?.address.state},{" "}
                {client?.address.zipCode}
              </span>
              <span>
                {client?.address.complement}, {client?.address.reference}
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <h3 className="mb-2">Status</h3>
        <Row>
          <Col span={8}>
            <Card title="Atividades" size="small">
              <Chart.ActivityStatus activities={activitiesStatusChartData} />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-6">
        <h3 className="mb-2">Projetos</h3>

        <Row gutter={16}>
          {client?.projects.map((project) => (
            <Col span={6} key={project.id}>
              <Card
                size="small"
                title={<Tooltip title={project.title}>{project.title}</Tooltip>}
                extra={
                  <Typography>R$ {formatCurrency(project.value)}</Typography>
                }
              >
                <div className="flex flex-col">
                  {project.activities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity.title}
                      status={
                        ActivityStatus[
                          activity.status as keyof typeof ActivityStatus
                        ]
                      }
                    />
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
