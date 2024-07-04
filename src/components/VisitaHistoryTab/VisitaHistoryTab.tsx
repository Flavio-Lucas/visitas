// VisitaHistoryTab.tsx
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { Visit } from '../../models/interfaces/visits.interface';

const VisitaHistoryTab: React.FC<{selectedVisit: Visit | null}> = ({ selectedVisit }) => {
  if (!selectedVisit) return null;

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650, marginY: '1rem', overflow: 'auto' }} size="medium" aria-label="visitas table">
          <TableHead>
            <TableRow className='visit-list-table-header'>
              <TableCell sx={{borderColor: '#0000006B'}}>Descrição</TableCell>
              <TableCell sx={{borderColor: '#0000006B'}}>Hora / Data</TableCell>
              <TableCell sx={{borderColor: '#0000006B'}}>Reponsavel</TableCell>
              <TableCell sx={{borderColor: '#0000006B'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedVisit.history?.map((history) => (
              <TableRow key={history.id}>
                <TableCell sx={{borderColor: '#0000006B'}}>{history.statusChangedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VisitaHistoryTab;
