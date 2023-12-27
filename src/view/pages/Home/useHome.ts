import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useFetchDashboardRevenue } from '../../../app/hooks/api/dashboard/useFetchDashboard';

export function useHome() {
  const [period, setPeriod] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ]);

  const { isFetching, revenue, refetch } = useFetchDashboardRevenue({
    periodStart:
      period[0]?.format('YYYY-MM-DD') ??
      dayjs().startOf('month').format('YYYY-MM-DD'),
    periodEnd:
      period[1]?.format('YYYY-MM-DD') ??
      dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  function handleChangePeriod(startDate: Dayjs | null, endDate: Dayjs | null) {
    setPeriod([startDate, endDate]);
  }

  useEffect(() => {
    refetch();
  }, [period, refetch]);

  return { revenue, isFetching, period, handleChangePeriod };
}
