import { Card, Spin, Typography } from 'antd';
import { ReactNode } from 'react';

import { formatCurrency } from '../../../../app/utils/format/formatCurrency';

interface StatsCardProps {
  icon: ReactNode;
  isLoading: boolean;
  value?: number;
  title: string;
  currency?: boolean;
}

export function StatsCard({
  icon,
  isLoading,
  value,
  title,
  currency = false,
}: StatsCardProps) {
  return (
    <Card
      size="small"
      title={title}
      extra={icon}
      bodyStyle={{ padding: '0 12px', height: '100%' }}
    >
      <div className="h-20 flex items-center justify-center">
        {isLoading ? (
          <Spin />
        ) : (
          <Typography className="font-bold text-2xl">
            {currency ? `R$ ${formatCurrency(value)}` : value}
          </Typography>
        )}
      </div>
    </Card>
  );
}
