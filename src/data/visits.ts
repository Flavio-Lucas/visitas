// visits.ts

// Dados mockados para visitas
import { VisitStatus } from '../models/enums/status.enum';
import { ApartmentInterface } from '../models/interfaces/apartment.interface';
import { UserInterface } from '../models/interfaces/user.interface';
import { Visit } from '../models/interfaces/visits.interface';

export const visitors: UserInterface[] = [
  { id: 1, name: 'Carla Maria', email: 'email@email.com', cpf: '222.222.222-00' },
  { id: 2, name: 'João Carlos', email: 'email@email.com', cpf: '222.222.222-01' },
  { id: 3, name: 'Maria Silva', email: 'email@email.com', cpf: '222.222.222-02' },
];

export const brokers: UserInterface[] = [
  { id: 4, name: 'John Doe', email: 'john.doe@example.com', cpf: '222.222.222-03' },
  { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com', cpf: '222.222.222-04' },
];

export const owners: UserInterface[] = [
  { id: 6, name: 'John Doe', email: 'john.doe@example.com', cpf: '222.222.222-03' },
  { id: 7, name: 'Jane Smith', email: 'jane.smith@example.com', cpf: '222.222.222-04' },
];

export const apartment: ApartmentInterface[] = [
  {
    id: 1,
    unit: 'Apartamento 101',
    block: 'Bloco A',
    owner_id: 6,
    broker_id: 4,
  },
  {
    id: 2,
    unit: 'Apartamento 202',
    block: 'Bloco B',
    owner_id: 7,
    broker_id: 5,
  },
];

export const visits: Visit[] = [
  {
    id: 1,
    date: new Date('2024-06-01'),
    location_id: 1,
    broker_id: 4,
    visitor_id: 1,
    status: VisitStatus.CANCELED,
    awareness: false,
  },
  {
    id: 2,
    date: new Date('2024-06-01'),
    location_id: 1,
    broker_id: 5,
    visitor_id: 1,
    status: VisitStatus.DONE,
    awareness: false,
  },
  {
    id: 3,
    date: new Date('2024-06-01'),
    location_id: 1,
    broker_id: 4,
    visitor_id: 1,
    status: VisitStatus.GOING,
    awareness: true,
  },
  {
    id: 4,
    date: new Date('2024-06-02'),
    location_id: 2,
    broker_id: 5,
    visitor_id: 2,
    status: VisitStatus.REFUSED,
    awareness: true,
  },
  {
    id: 5,
    date: new Date('2024-06-02'),
    location_id: 2,
    broker_id: 4,
    visitor_id: 2,
    status: VisitStatus.SCHEDULED,
    awareness: false,
  },
];

