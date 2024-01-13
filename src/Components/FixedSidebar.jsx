import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const FixedSidebar = () => {
  return (
    <Box
      sx={{
        width: '200px', 
        height: '100%',
        position: 'fixed',
        backgroundColor: '#f0f0f0', 
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <List>
        <ListItem button>
          <ListItemText primary="API1" />
        </ListItem>
        
      </List>
     
      <Typography> Will render Ads here </Typography>
    </Box>
  );
};

export default FixedSidebar;
