import { VisitStatus } from "../models/enums/status.enum";

export type Filters = {
  search?: string,
  status?: string,
  awareness?: boolean,
  startDate?: Date,
  endDate?: Date,
}
export const buildQueryParams = (filters?: Filters): string => {
  const params = new URLSearchParams();
  if (filters) {
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.awareness !== undefined) params.append('awareness', String(filters.awareness));
    if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
    if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
  }
  return params.toString();
};