import { ProjectStatus } from '../../entities/ProjectStatus';

export function getProjectLabelByStatus(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.DONE:
      return 'Feito';
    case ProjectStatus.PENDING:
      return 'Pendente';
    case ProjectStatus.PROGRESS:
      return 'Em progresso';
    case ProjectStatus.WAITING_PAYMENT:
      return 'Esperando pagamento';
    default:
      return '';
  }
}
