import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { getVisitas } from '../../services/api';

interface Visita {
  id: number;
  dataVisita: string;
  status: string;
  ciencia: string;
  descricao: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'dataVisita', headerName: 'Data da Visita', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'ciencia', headerName: 'Ciência', width: 130 },
  { field: 'descricao', headerName: 'Descrição', width: 200 },
];

const VisitaList: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVisitas();
        setVisitas(data);
      } catch (error) {
        console.error("Erro ao buscar visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={visitas} columns={columns} pageSizeOptions={[15]} loading={loading} checkboxSelection />
    </div>
  );
};

export default VisitaList;
