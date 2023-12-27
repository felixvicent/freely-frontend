import { Col, DatePicker, Row } from 'antd';
import { Dayjs } from 'dayjs';
import { FiDollarSign, FiUsers } from 'react-icons/fi';

import { StatsCard } from './components/StatsCard';
import { useHome } from './useHome';

export function Home() {
  const {
    revenue,
    clients,
    isClientsLoading,
    isRevenueLoading,
    period,
    handleChangePeriod,
  } = useHome();

  return (
    <main>
      <div className="mb-4">
        <DatePicker.RangePicker
          defaultValue={[period[0], period[1]]}
          onChange={(dates: [Dayjs | null, Dayjs | null] | null) => {
            if (dates) {
              handleChangePeriod(dates[0], dates[1]);
            }
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
      </Row>
    </main>
  );
}
