import React from 'react';
import VisitaList from '../../components/VisitaList/VisitaList';
import './VisitasPage.css';

import { Box } from '@mui/material';

const VisitasPage: React.FC = () => {
  return (
    <Box className='visitas-page-container'>
      <VisitaList />
    </Box>
  );
};

export default VisitasPage;
