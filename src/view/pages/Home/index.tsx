import { Card, Col, List, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container";
import { useHome } from "./useHome";

export function Home() {
  const { dashboard, isFetching } = useHome();

  return (
    <Container.Loading isLoading={isFetching}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            size="small"
            title="Clientes"
            extra={<Typography>{dashboard?.quantityOfClients}</Typography>}
            bodyStyle={{ padding: "0 12px" }}
          >
            <List
              dataSource={dashboard?.latestClients}
              renderItem={(client) => (
                <List.Item>
                  <Link
                    to={`/clients/${client.id}`}
                  >{`${client.firstName} ${client.lastName}`}</Link>
                </List.Item>
              )}
              footer={
                <div className="flex justify-end">
                  <Link to="/clients">Ver todos</Link>
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            size="small"
            title="Projetos"
            extra={<Typography>{dashboard?.quantityOfProjects}</Typography>}
            bodyStyle={{ padding: "0 12px" }}
          >
            <List
              dataSource={dashboard?.latestProjects}
              renderItem={(project) => (
                <List.Item>
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </List.Item>
              )}
              footer={
                <div className="flex justify-end">
                  <Link to="/projects">Ver todos</Link>
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            size="small"
            title="Atividades"
            extra={<Typography>{dashboard?.quantityOfActivities}</Typography>}
            bodyStyle={{ padding: "0 12px" }}
          >
            <List
              dataSource={dashboard?.latestActivities}
              renderItem={(activity) => <List.Item>{activity.title}</List.Item>}
              footer={
                <div className="flex justify-end">
                  <Link to="/">Ver todos</Link>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
    </Container.Loading>
  );
}
