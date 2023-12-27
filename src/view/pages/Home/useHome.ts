import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useFetchDashboardAcitivities } from '../../../app/hooks/api/dashboard/useFetchDashboardActivities';
import { useFetchDashboardClients } from '../../../app/hooks/api/dashboard/useFetchDashboardClients';
import { useFetchDashboardProjects } from '../../../app/hooks/api/dashboard/useFetchDashboardProjects';
import { useFetchDashboardRevenue } from '../../../app/hooks/api/dashboard/useFetchDashboardRevenue';

export function useHome() {
  const [period, setPeriod] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const params = {
    periodStart: period[0]?.format('YYYY-MM-DD') ?? undefined,
    periodEnd: period[1]?.format('YYYY-MM-DD') ?? undefined,
  };

  const {
    isFetching: isRevenueLoading,
    revenue,
    refetch: refetchRevenue,
  } = useFetchDashboardRevenue(params);

  const {
    isFetching: isClientsLoading,
    clients,
    refetch: refetchClients,
  } = useFetchDashboardClients(params);

  const {
    isFetching: isProjectLoading,
    projects,
    refetch: refetchProjects,
  } = useFetchDashboardProjects(params);

  const {
    isFetching: isActivitiesLoading,
    activities,
    refetch: refetchActivities,
  } = useFetchDashboardAcitivities(params);

  function handleChangePeriod(startDate: Dayjs | null, endDate: Dayjs | null) {
    setPeriod([startDate, endDate]);
  }

  useEffect(() => {
    refetchClients();
    refetchRevenue();
    refetchProjects();
    refetchActivities();
  }, [
    period,
    refetchClients,
    refetchRevenue,
    refetchProjects,
    refetchActivities,
  ]);

  return {
    revenue,
    clients,
    projects,
    activities,
    isClientsLoading,
    isRevenueLoading,
    isProjectLoading,
    isActivitiesLoading,
    period,
    handleChangePeriod,
  };
}
