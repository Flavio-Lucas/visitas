import { VisitStatus } from '../../models/enums/status.enum';

type ThemeColorsType = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
type VisitStatusType = { color: ThemeColorsType, text: string }

export const visitStatusObj: Record<string, VisitStatusType> = {
  [VisitStatus.SCHEDULED]: { color: 'info', text: 'Agendada' },
  [VisitStatus.DONE]: { color: 'default', text: 'Visitado' },
  [VisitStatus.GOING]: { color: 'success', text: 'Em andamento' },
  [VisitStatus.CANCELED]: { color: 'error', text: 'Cancelado' },
  [VisitStatus.REFUSED]: { color: 'primary', text: 'Recusado' },
};
