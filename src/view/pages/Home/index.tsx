import { Col, DatePicker, Row } from 'antd';
import { Dayjs } from 'dayjs';
import { AiOutlineProject } from 'react-icons/ai';
import { FiDollarSign, FiUsers } from 'react-icons/fi';

import { StatsCard } from './components/StatsCard';
import { useHome } from './useHome';

export function Home() {
  const {
    revenue,
    clients,
    projects,
    isClientsLoading,
    isRevenueLoading,
    isProjectLoading,
    period,
    handleChangePeriod,
  } = useHome();

  return (
    <main>
      <div className="mb-4">
        <DatePicker.RangePicker
          defaultValue={[period[0], period[1]]}
          onChange={(dates: [Dayjs | null, Dayjs | null] | null) => {
            handleChangePeriod(
              dates ? dates[0] : null,
              dates ? dates[1] : null,
            );
          }}
          format="DD/MM/YYYY"
          allowClear={false}
        />
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <StatsCard
            icon={<FiDollarSign />}
            isLoading={isRevenueLoading}
            value={revenue}
            title="Receita"
            currency
          />
        </Col>
        <Col span={6}>
          <StatsCard
            icon={<FiUsers />}
            isLoading={isClientsLoading}
            value={clients}
            title="Clientes"
          />
        </Col>
        <Col span={6}>
          <StatsCard
            icon={<AiOutlineProject />}
            isLoading={isProjectLoading}
            value={projects}
            title="Projects"
          />
        </Col>
      </Row>
    </main>
  );
}
