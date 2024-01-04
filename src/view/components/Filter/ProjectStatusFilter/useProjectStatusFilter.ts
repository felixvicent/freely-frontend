import { useState } from 'react';

import { ProjectStatus } from '../../../../app/entities/ProjectStatus';

export function useProjectStatusFilter(
  onFilter: (status: ProjectStatus[]) => void,
) {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus[]>([]);

  function handleAddStatusToSearch(value: ProjectStatus) {
    if (!selectedStatus.includes(value)) {
      setSelectedStatus((prevState) => [...prevState, value]);
    }
  }

  function handleRemoveStatusToSearch(value: ProjectStatus) {
    setSelectedStatus((prevState) =>
      prevState.filter((status) => status !== value),
    );
  }

  function confirmFilter() {
    onFilter(selectedStatus);
  }

  function resetFilter() {
    setSelectedStatus([]);
    onFilter([]);
  }

  return {
    selectedStatus,
    handleAddStatusToSearch,
    handleRemoveStatusToSearch,
    confirmFilter,
    resetFilter,
  };
}
