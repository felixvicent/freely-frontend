import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { ActivityStatus } from '../../../../app/entities/AcitivtyStatus';
import { getActivityLabelByStatus } from '../../../../app/utils/labels/getActivityLabelByStatus';

Chart.register(ArcElement, Tooltip, Legend);

interface ActivityStatusData {
  status: string;
  total: number;
}

interface ActivityStatusChartProps {
  activities: ActivityStatusData[];
}

export function ActivityStatusChart({ activities }: ActivityStatusChartProps) {
  const data = {
    labels: activities.map((activity) =>
      getActivityLabelByStatus(
        ActivityStatus[activity.status as keyof typeof ActivityStatus],
      ),
    ),
    datasets: [
      {
        label: 'Total',
        data: activities.map((activity) => activity.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  return <Pie data={data} />;
}
