import { apartment, brokers, visits } from '../data/visits';
import { Visit } from '../models/interfaces/visits.interface';
import { ApartmentInterface } from '../models/interfaces/apartment.interface';
import { visitors, owners } from '../data/visits'
import { UserInterface } from '../models/interfaces/user.interface';
import { Filters } from '../utils/utils';

export const getVisitById = (id: number): Visit | null => {
  const visita = visits.find(visit => visit.id === id);
  if (!visita) return null;

  visita.visitors = visitors;
  visita.broker = getCorretorById(visita?.broker_id || 0);
  visita.location = getApartamentoById(visita?.location_id || 0);

  return visita;
};

export const getMockedOwnerById = (id: number): UserInterface | undefined => {
  return owners.find(visit => visit.id === id);
};

const applyFilters = (visits: Visit[], filters?: Filters): Visit[] => {
  if (!filters) return visits;

  return visits.filter(visit => {
    let matches = true;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const visitorMatch = visit.visitors?.some(visitor =>
        visitor.name.toLowerCase().includes(searchLower)
      ) ?? false;
      const brokerMatch = visit.broker?.name.toLowerCase().includes(searchLower) ?? false;
      matches = matches && (visitorMatch || brokerMatch);
    }

    if (filters.status !== undefined) {
      matches = matches && visit.status === filters.status;
    }

    if (filters.awareness !== undefined) {
      matches = matches && visit.awareness === filters.awareness;
    }

    if (filters.startDate) {
      matches = matches && new Date(visit.date) >= filters.startDate;
    }

    // Filter by endDate
    if (filters.endDate) {
      matches = matches && new Date(visit.date) <= filters.endDate;
    }

    return matches;
  });
};

export const getAllVisitsWithDetails = (filters?: Filters): Visit[] => {
  const detailedVisits = visits.map(visit => ({
    ...visit,
    visitors: visit.visitors?.map(visitor => getVisitanteById(visitor.id)).filter(visitor => visitor !== undefined) as UserInterface[],
    broker: getCorretorById(visit.broker_id),
    location: getApartamentoById(visit.location_id),
  }));

  return applyFilters(detailedVisits, filters);
};

// Função para obter um visitante pelo ID
const getVisitanteById = (id: number): UserInterface | undefined => {
  return visitors.find(visitante => visitante.id === id);
};

// Função para obter um corretor pelo ID
const getCorretorById = (id: number): UserInterface | undefined => {
  return brokers.find(corretor => corretor.id === id);
};

// Função para obter um apartamento pelo ID
const getApartamentoById = (id: number): ApartmentInterface | undefined => {
  return apartment.find(apartamento => apartamento.id === id);
};
