import axios from 'axios';
import { environment } from '../environment/environment';
import { CurrentUserInterface } from '../models/interfaces/current-user.interface';
import { Visit } from '../models/interfaces/visits.interface';
import { getAllVisitsWithDetails, getVisitById, getMockedOwnerById } from './mockService'; // Importa funções do mockService
import { UserInterface } from '../models/interfaces/user.interface';
import { Filters, buildQueryParams } from '../utils/utils';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchVisits = async (filters?: Filters): Promise<Visit[]> => {
  if (environment.mock) {
    return getAllVisitsWithDetails(filters);
  } else {
    const queryParams = buildQueryParams(filters);
    const url = queryParams ? `/visits?${queryParams}` : '/visits';
    return await api.get(url).then(response => response.data);
  }
};

export const getOwnerById = async (id: number): Promise<UserInterface | undefined> => {
  if (environment.mock) {
    return getMockedOwnerById(id);
  } else {
    return await api.get(`/user/${id}`).then(response => response.data);
  }
};

export const getVisitDetailsById = async (id: number): Promise<Visit | null> => {
  if (environment.mock) {
    return getVisitById(id);
  } else {
    return await api.get(`/visits/${id}`).then(response => response.data);
  }
};

export const getCurrentUser = async (): Promise<CurrentUserInterface> => {
  if (environment.mock) {
    return { name: 'Mauricio Meireles', condoName: 'Condominio das Flores', avatarUrl: '' };
  } else {
    return await api.get('/me').then(response => response.data);
  }
};
