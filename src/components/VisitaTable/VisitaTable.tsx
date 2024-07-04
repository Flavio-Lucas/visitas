// VisitaTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination } from '@mui/material';
import { Visit } from '../../models/interfaces/visits.interface';
import { visitStatusObj } from '../constants/constants';
import VisitaActionsMenu from '../VisitaActionsMenu/VisitaActionsMenu';
import { datePipe } from '../../utils/dateUtils';
import './VisitaTable.css';

type VisitaTableProps = {
  visits: Visit[];
  handleOpenModal: (visit: Visit) => void;
  handleCancel: () => void;
  handleApprove: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>, visit: Visit) => void;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  selectedVisit: Visit | null;
  loading: boolean;
};

const VisitaTable: React.FC<VisitaTableProps> = ({ visits, handleOpenModal, handleApprove, handleCancel, handleClick, anchorEl, handleClose, selectedVisit, loading }) => {
  const [pagination, setPagination] = useState({
    page: 0,
    length: 0,
    rowPerPage: 10,
  });

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination({ ...pagination, page: newPage })
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPagination({
      ...pagination,
      rowPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <>
      <TableContainer className='visit-list-table-container' component={Paper}>
        <Table sx={{ minWidth: 650, marginY: '1rem' }} size="medium" aria-label="visitas table">
          <TableHead>
            <TableRow className='visit-list-table-header'>
              <TableCell>ID</TableCell>
              <TableCell>Data e hora</TableCell>
              <TableCell>Corretor</TableCell>
              <TableCell>Ciência da Visita</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : (
              visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.id}</TableCell>
                  <TableCell>{datePipe(new Date(visit.date))}</TableCell>
                  <TableCell>{visit.broker?.name || 'Teste'}</TableCell>
                  <TableCell>{visit.awareness ? 'Ciente' : 'Não ciente'}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip label={visitStatusObj[visit.status].text} color={visitStatusObj[visit.status].color || 'default'} />
                  </TableCell>
                  <TableCell>
                    <VisitaActionsMenu
                      visit={visit}
                      handleOpenModal={handleOpenModal}
                      handleApprove={handleApprove}
                      handleCancel={handleCancel}
                      handleClick={handleClick}
                      anchorEl={anchorEl}
                      openId={selectedVisit?.id || 0}
                      handleClose={handleClose}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

      </TableContainer>
      <Paper sx={{ marginTop: '1rem' }}>
        <TablePagination
          component="div"
          count={pagination.length}
          page={pagination.page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rowPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default VisitaTable;
