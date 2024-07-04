import React, { useState } from 'react';
import { Visit } from '../../models/interfaces/visits.interface';
import { Box, Chip, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { visitStatusObj } from '../constants/constants';
import { VisitStatus } from '../../models/enums/status.enum';
import './VisitaDetails.css'
import { getDateString, getHourString } from '../../utils/dateUtils';
import { getOwnerById } from '../../services/api';
import { UserInterface } from '../../models/interfaces/user.interface';

type VisitaDetailsTabProps = {
  selectedVisit: Visit | null;
};

const VisitaDetailsTab: React.FC<VisitaDetailsTabProps> = ({ selectedVisit }) => {
  if (!selectedVisit) return null;

  const [owner, setOwner] = useState<UserInterface>();

  const loadOwner = async () => {
    if (!selectedVisit.location?.owner_id) return;

    const tempOwner = await getOwnerById(selectedVisit.location?.owner_id);
    setOwner(tempOwner);
  }

  loadOwner();

  return (
    <Box>
      <Chip
        sx={{ paddingX: '2rem' }}
        label={visitStatusObj[selectedVisit.status].text}
        color={visitStatusObj[selectedVisit.status].color || 'default'}
      />

      <Typography fontWeight="bold" color="black" variant='h6' component="h2">
        Proprietário
      </Typography>
      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>Nome completo</InputLabel>
      <Box className="not-a-input">
        {owner?.name}
      </Box>

      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>E-mail</InputLabel>
      <Box className="not-a-input">
        {owner?.email}
      </Box>

      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>Data</InputLabel>
      <Box className="not-a-input">
        {getDateString(new Date(selectedVisit.date))}
      </Box>

      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>Hora</InputLabel>
      <Box className="not-a-input">
        {getHourString(new Date(selectedVisit.date))}
      </Box>
      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>Blocos/Torres</InputLabel>
      <Box className="not-a-input">
        {selectedVisit.location?.block}
      </Box>

      <InputLabel sx={{ color: 'black', marginY: '.25rem', fontSize: '.9rem' }}>Unidades</InputLabel>
      <Box className="not-a-input">
        {selectedVisit.location?.unit}
      </Box>

        <Typography fontWeight="bold" color="black" variant='h6' component="h2">
          Visitante e acompanhantes
        </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650, marginY: '1rem', overflow: 'auto' }} size="medium" aria-label="visitas table">
          <TableHead>
            <TableRow className='visit-list-table-header'>
              <TableCell sx={{borderColor: '#0000006B'}}>Nome</TableCell>
              <TableCell sx={{borderColor: '#0000006B'}}>CPF</TableCell>
              <TableCell sx={{borderColor: '#0000006B'}}>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedVisit.visitors && selectedVisit.visitors.map((visitor) => (
              <TableRow key={visitor.cpf}>
                <TableCell sx={{borderColor: '#0000006B'}}>{visitor.name}</TableCell>
                <TableCell sx={{borderColor: '#0000006B'}}>{visitor.cpf}</TableCell>
                <TableCell sx={{borderColor: '#0000006B'}}>{visitor.isVisitor ? 'Visitante' : 'Acompanhante'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VisitaDetailsTab;
