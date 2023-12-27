import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useFetchDashboardClients } from '../../../app/hooks/api/dashboard/useFetchDashboardClients';
import { useFetchDashboardRevenue } from '../../../app/hooks/api/dashboard/useFetchDashboardRevenue';

export function useHome() {
  const [period, setPeriod] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ]);

  const {
    isFetching: isRevenueLoading,
    revenue,
    refetch: refetchRevenue,
  } = useFetchDashboardRevenue({
    periodStart:
      period[0]?.format('YYYY-MM-DD') ??
      dayjs().startOf('month').format('YYYY-MM-DD'),
    periodEnd:
      period[1]?.format('YYYY-MM-DD') ??
      dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  const {
    isFetching: isClientsLoading,
    clients,
    refetch: refetchClients,
  } = useFetchDashboardClients({
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
    refetchClients();
    refetchRevenue();
  }, [period, refetchClients, refetchRevenue]);

  return {
    revenue,
    clients,
    isClientsLoading,
    isRevenueLoading,
    period,
    handleChangePeriod,
  };
}
