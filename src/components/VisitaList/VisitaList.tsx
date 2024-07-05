// VisitaListPage.tsx
import React, { useState, useEffect } from 'react';
import { Visit } from '../../models/interfaces/visits.interface';
import VisitaTable from '../VisitaTable/VisitaTable';
import VisitaModal from '../VisitaModal/VisitaModal';
import VisitaFilters from '../VisitaFilters/VisitaFilters';
import { fetchVisits } from '../../services/api';
import { VisitStatus } from '../../models/enums/status.enum';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, IconButton, InputBase, Modal, Paper, Typography } from '@mui/material';
import { Filters } from '../../utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

let filters: Filters = {};

const VisitaList: React.FC = () => {

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [openedApproveModal, setOpenedApproveModal] = useState<boolean>(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [currentModalTab, setCurrentModalTab] = useState<string>('1');
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVisits(filters);
      setVisits(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleOpenModal = (_: Visit) => {
    setOpenedModal(true);
  };

  const handleCloseModal = () => {
    setOpenedModal(false);
    setSelectedVisit(null);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentModalTab(newValue);
  };

  const handleCancel = () => {
    console.log(selectedVisit);
    const index = visits.findIndex(v => v.id === selectedVisit?.id);
    const tempVisit = visits;
    tempVisit[index].status = VisitStatus.CANCELED;
    setVisits(tempVisit);
    handleClose();
  };

  const handleApprove = () => {
    setOpenedApproveModal(true);
    const index = visits.findIndex(v => v.id === selectedVisit?.id);
    const tempVisit = visits;
    tempVisit[index].awareness = true;
    setVisits(tempVisit);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, visit: Visit) => {
    setAnchorEl(event.currentTarget);
    setSelectedVisit(visit);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVisit(null);
  };

  const updateAwarenessFilter = async (value: boolean) => {
    setLoading(true);
    const newFilters = {
      ...filters,
      awareness: value,
    };
    const data = await fetchVisits(newFilters);
    setVisits(data);
    setLoading(false);
  };

  const updateStartDate = async (value: Date) => {
    setLoading(true);
    const newFilters = {
      ...filters,
      startDate: value,
    };
    const data = await fetchVisits(newFilters);
    filters = newFilters;
    setVisits(data);
    setLoading(false);
  };

  const updateEndDate = async (value: Date) => {
    setLoading(true);
    const newFilters = {
      ...filters,
      endDate: value,
    };
    const data = await fetchVisits(newFilters);
    filters = newFilters;
    setVisits(data);
    setLoading(false);
  };

  const updateStatusFilter = async (value: string) => {
    setLoading(true);
    const newFilters = {
      ...filters,
      status: value,
    };
    const data = await fetchVisits(newFilters);
    filters = newFilters;
    setVisits(data);
    setLoading(false);
  };


  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const newFilters = {
      ...filters,
      search: event.target.value
    };
    const data = await fetchVisits(newFilters);
    filters = newFilters;
    setVisits(data);

    setLoading(false);
  };

  return (
    <>
      <Box className='visitas-page-container-filters'>
        <h1>Visitas</h1>
        <Box className='visitas-page-container-registerbtn'>

          <Paper style={{
            width: 'fit-content',
            height: 'fit-content'
          }} elevation={0} variant='outlined'>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={handleSearch}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton onClick={(_) => setShowFilters(!showFilters)} type="button" sx={{ p: '10px' }} aria-label="search">
              <TuneIcon />
            </IconButton>
            <InputAdornment position="start">
            </InputAdornment>
          </Paper>

          <Button color="success" disabled variant="contained">
            Registrar visita
          </Button>
        </Box>
      </Box>
      {showFilters && <VisitaFilters
        updateAwarenessFilter={updateAwarenessFilter}
        updateStatusFilter={updateStatusFilter}
        updateStartDate={updateStartDate}
        updateEndDate={updateEndDate}
      />}
      <VisitaTable
        visits={visits}
        handleOpenModal={handleOpenModal}
        handleApprove={handleApprove}
        handleCancel={handleCancel}
        handleClick={handleClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        selectedVisit={selectedVisit}
        loading={loading}
      />
      <VisitaModal
        openedModal={openedModal}
        handleClose={handleCloseModal}
        currentModalTab={currentModalTab}
        handleChangeTab={handleChangeTab}
        selectedVisit={selectedVisit}
      />

      <Modal
        open={openedApproveModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' flexDirection="column" className="modal-visit-details">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="h1">Você marcou que está ciente da visita.</Typography>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem" marginY="1rem">
            <Typography>Sucesso!</Typography>
            <CheckCircleRoundedIcon color='success'/>
          </Box>
          <Button sx={{ alignSelf: 'flex-end' }} onClick={() => { setOpenedApproveModal(false); handleClose() }} variant="contained" color="success">
            Ok, entendi
          </Button>
        </Box>

      </Modal>
    </>
  );
};

export default VisitaList;
