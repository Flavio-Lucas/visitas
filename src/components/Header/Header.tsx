import React from 'react';
import { Toolbar, Typography, Avatar, Box, CircularProgress } from '@mui/material';
import './Header.css'

const Header: React.FC<{ userName: string; condoName: string, loading: boolean }> = ({ userName, condoName, loading }) => {
  return (
    <>
      <div className="container">
        <div>
          <Box height="3.3rem" width="8px" bgcolor="#FFCD01" />
          <Box height="3.3rem" width="8px" bgcolor="#015FE8" />
          <Box height="3.3rem" width="8px" bgcolor="#00A11D" />
        </div>
        <div className="header">
          <Box height="50px" width="100%" bgcolor="#242424" />
          <Toolbar style={{ backgroundColor: 'white', height: "calc(100% - 50px)" }}>
            <Box  display="flex" alignItems="center" justifyContent="right" width="100%" height="100%" px={2}>
              {loading ? (
                <CircularProgress />
              ) :
                <>
                  <Box sx={{textAlign: 'end', marginRight: '1rem'}}>
                    <Typography color='#242424' variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'green' }}>
                      {condoName}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 51, height: 51, marginRight: 1 }} />
                  </Box>
                </>
              }
            </Box>
          </Toolbar>
        </div>
      </div>
    </>
  );
};

export default Header;
