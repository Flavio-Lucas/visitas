// VisitaFilters.tsx
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { VisitStatus } from '../../models/enums/status.enum';
import { visitStatusObj } from '../constants/constants';
import './VisitaFilters.css';

type VisitaFiltersProps = {
  updateAwarenessFilter: (value: boolean) => void;
  updateStatusFilter: (value: string) => void;
  updateStartDate: (newStartDate: Date) => void;
  updateEndDate: (newStartDate: Date) => void;
};

const VisitaFilters: React.FC<VisitaFiltersProps> = ({ updateAwarenessFilter, updateStatusFilter, updateStartDate, updateEndDate }) => (
  <Box className="visit-list-table-filters">
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DateField
        slotProps={{ textField: { size: 'small' } }}
        label="Data inicial"
        onChange={(newValue) => updateStartDate(newValue?.toDate() || new Date())}
      />
      <DateField
        slotProps={{ textField: { size: 'small' } }}
        label="Data final"
        onChange={(newValue) => updateEndDate(newValue?.toDate() || new Date())}
      />
    </LocalizationProvider>

    <FormControl>
      <InputLabel size="small" id="ciencia-label">Ciência da visita</InputLabel>
      <Select
        size='small'
        labelId="ciencia-label"
        id="ciencia-select"
        label="Ciência da visita"
        onChange={(event) => updateAwarenessFilter(!!event.target.value)}
      >
        <MenuItem value={1}>Ciente</MenuItem>
        <MenuItem value={0}>Não ciente</MenuItem>
      </Select>
    </FormControl>

    <FormControl>
      <InputLabel size="small" id="status-label">Status</InputLabel>
      <Select
        size="small"
        sx={{ minWidth: '100%' }}
        labelId="status-label"
        label="Status"
        onChange={(event) => updateStatusFilter(event.target.value as string)}
      >
        <MenuItem></MenuItem>
        <MenuItem value={VisitStatus.CANCELED}>{visitStatusObj[VisitStatus.CANCELED].text}</MenuItem>
        <MenuItem value={VisitStatus.DONE}>{visitStatusObj[VisitStatus.DONE].text}</MenuItem>
        <MenuItem value={VisitStatus.GOING}>{visitStatusObj[VisitStatus.GOING].text}</MenuItem>
        <MenuItem value={VisitStatus.REFUSED}>{visitStatusObj[VisitStatus.REFUSED].text}</MenuItem>
        <MenuItem value={VisitStatus.SCHEDULED}>{visitStatusObj[VisitStatus.SCHEDULED].text}</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default VisitaFilters;
