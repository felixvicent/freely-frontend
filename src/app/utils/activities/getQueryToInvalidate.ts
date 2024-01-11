import { ActivityStatus } from '../../entities/ActivityStatus';

export function getQueryToInvalidate(status: ActivityStatus) {
  switch (status) {
    case ActivityStatus.PENDING:
      return 'pending-activities';
    case ActivityStatus.DONE:
      return 'done-activities';
    case ActivityStatus.PROGRESS:
      return 'progress-activities';
    case ActivityStatus.WAITING:
      return 'waiting-activities';
    default:
      return '';
  }
}
