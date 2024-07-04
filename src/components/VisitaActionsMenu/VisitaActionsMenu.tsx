import React, { useState } from 'react';
import { Box, Button, IconButton, InputLabel, Menu, MenuItem, Modal, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Visit } from '../../models/interfaces/visits.interface';
import { VisitStatus } from '../../models/enums/status.enum';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

type VisitaActionsMenuProps = {
  visit: Visit;
  handleOpenModal: (visit: Visit) => void;
  handleCancel: () => void;
  handleApprove: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>, visit: Visit) => void;
  anchorEl: null | HTMLElement;
  openId: number;
  handleClose: () => void;
};

const VisitaActionsMenu: React.FC<VisitaActionsMenuProps> = ({ visit, handleOpenModal, handleApprove, handleCancel, handleClick, anchorEl, openId, handleClose }) => {
  const [openedCancelModal, setOpenedCancelModal] = useState<boolean>(false);

  const handleOpenCancelModal = () => {
    setOpenedCancelModal(true);
  }

  return (
    <>
      <IconButton
        onClick={(event) => handleClick(event, visit)}
        size="small"
        aria-label="more"
        aria-controls={openId === visit.id ? 'long-menu' : undefined}
        aria-expanded={openId === visit.id ? 'true' : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openId === visit.id}
        onClose={handleClose}
        sx={{
          maxHeight: 48 * 4.5,
          width: '20ch',
        }}
      >
        <MenuItem onClick={() => { handleOpenModal(visit) }}>
          <VisibilityIcon sx={{ marginRight: '0.5rem' }} />
          Visualizar
        </MenuItem>
        {visit.status === VisitStatus.SCHEDULED && <MenuItem onClick={() => { handleOpenCancelModal() }}>
          <CancelRoundedIcon sx={{ marginRight: '0.5rem' }} />
          Cancelar
        </MenuItem>}
        {!visit.awareness && visit.status === VisitStatus.SCHEDULED && <MenuItem onClick={() => { handleClose(); handleApprove(); }}>
          <ThumbUpRoundedIcon sx={{ marginRight: '0.5rem' }} />
          Estou ciente
        </MenuItem>}
        <MenuItem  onClick={handleClose}>
        <Link to={'concluir/' + openId}>
          <CheckCircleRoundedIcon sx={{ marginRight: '0.5rem' }} />
          Concluir Visita
        </Link>
        </MenuItem>
      </Menu>
      <Modal
        open={openedCancelModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display='flex' flexDirection="column" className="modal-visit-details">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="h1">Deseja cancelar a visita <Typography variant="h5" component="h1" sx={{ color: '#1B7FCC', display: 'inline' }}>{openId}</Typography> ?</Typography>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <CloseIcon sx={{ cursor: 'pointer' }} />
            </IconButton>
          </Box>
          <InputLabel sx={{ color: '#0F172A', fontWeight: 'bold' }}>Motivo</InputLabel>
          <Box>
            <Textarea sx={{ height: '15rem' }} />;
          </Box>
          <Button sx={{alignSelf: 'flex-end'}} onClick={() => { handleCancel(); setOpenedCancelModal(false) }} variant="contained" color="success">
            Confirmar
          </Button>
        </Box>

      </Modal>
    </>
  )
};

export default VisitaActionsMenu;
