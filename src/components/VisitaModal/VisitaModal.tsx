// VisitaModal.tsx
import React from 'react';
import { Modal, Box, Typography, Tabs, Tab } from '@mui/material';
import TabPanel from '../TabPanel/TabPanel';
import VisitaDetailsTab from '../VisitaDetailsTab/VisitasDetailsTab';
import VisitaHistoryTab from '../VisitaHistoryTab/VisitaHistoryTab';
import { Visit } from '../../models/interfaces/visits.interface';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import './VisitaModal.css'

type VisitaModalProps = {
  openedModal: boolean;
  handleClose: () => void;
  currentModalTab: string;
  handleChangeTab: (event: React.SyntheticEvent, newValue: string) => void;
  selectedVisit: Visit | null;
};

const VisitaModal: React.FC<VisitaModalProps> = ({ openedModal, handleClose, currentModalTab, handleChangeTab, selectedVisit }) => (
  <Modal
    open={openedModal}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="modal-visit-details">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography id="modal-modal-title" fontWeight={700} variant="h6" component="h2">
          Visualizar Visita
        </Typography>
        <Box sx={{cursor: 'pointer'}}>
          <CloseIcon onClick={handleClose}/>
        </Box>
      </Box>

      <Tabs value={currentModalTab} onChange={handleChangeTab} aria-label="lab API tabs example">
        <Tab label={
          <Box display="flex" alignItems="center" gap=".5rem">
            <VisibilityIcon />
            <span className='text'>Visualizar Visita</span>
          </Box>
        } value="1" />
        <Tab label={
          <Box display="flex" alignItems="center" gap=".5rem">
            <HistoryIcon />
            <span className='text'>Histórico</span>
          </Box>
        } value="2" />
      </Tabs>

      <Box sx={{maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden'}} className="NOME DA CAIXA">
        <TabPanel value={currentModalTab} index="1">
          <VisitaDetailsTab selectedVisit={selectedVisit} />
        </TabPanel>
        <TabPanel value={currentModalTab} index="2">
          <VisitaHistoryTab selectedVisit={selectedVisit}/>
        </TabPanel>
      </Box>
    </Box>
  </Modal>
);

export default VisitaModal;
