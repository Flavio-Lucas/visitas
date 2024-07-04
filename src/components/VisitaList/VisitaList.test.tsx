import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VisitaList from './VisitaList';
import { fetchVisits } from '../../services/api';

jest.mock('../services/api');

const mockVisitas = [
  { id: 1, dataVisita: '2023-06-26', status: 'Agendada', ciencia: 'Ciente', descricao: 'Visita agendada' },
  { id: 2, dataVisita: '2023-06-27', status: 'Cancelada', ciencia: 'Não Ciente', descricao: 'Visita cancelada' },
];

describe('VisitaList Component', () => {
  it('renders visitas data', async () => {
    (fetchVisits as jest.Mock).mockResolvedValue(mockVisitas);

    render(<VisitaList />);

    expect(await screen.findByText('Visita agendada')).toBeInTheDocument();
    expect(await screen.findByText('Visita cancelada')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    (fetchVisits as jest.Mock).mockResolvedValue(mockVisitas);

    render(<VisitaList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
