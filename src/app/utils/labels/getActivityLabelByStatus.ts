import { ActivityStatus } from '../../entities/AcitivtyStatus';

export function getActivityLabelByStatus(status: ActivityStatus) {
  switch (status) {
    case ActivityStatus.DONE:
      return 'Feito';
    case ActivityStatus.PENDING:
      return 'Pendente';
    case ActivityStatus.PROGRESS:
      return 'Em progresso';
    case ActivityStatus.WAITING:
      return 'Em espera';
    default:
      return '';
  }
}
