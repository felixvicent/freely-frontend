import { Card, Col, DatePicker, Row, Spin, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { FiDollarSign } from 'react-icons/fi';

import { formatCurrency } from '../../../app/utils/format/formatCurrency';

import { useHome } from './useHome';

export function Home() {
  const { revenue, isFetching, period, handleChangePeriod } = useHome();

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
        />
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card
            size="small"
            title="Receita"
            extra={<FiDollarSign />}
            bodyStyle={{ padding: '0 12px', height: '100%' }}
          >
            <div className="h-20 flex items-center justify-center">
              {isFetching ? (
                <Spin />
              ) : (
                <Typography className="font-bold text-2xl">
                  R$ {formatCurrency(revenue)}
                </Typography>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
}
