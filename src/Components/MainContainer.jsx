import React, { useState, useEffect } from 'react';
import { Container, Typography, Tab, Tabs, Box, Paper } from '@mui/material';

const DataContainer = ({ apiEndpoint }) => {
  const [data, setData] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0', textAlign: 'center' }}>
        Your Favorite Job News Portal
      </Typography>

      <Paper elevation={3} style={{ marginBottom: '20px' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Latest Jobs" />
          <Tab label="Admit Card" />
          <Tab label="Results" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <p>...Admit card content goes here...</p>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <p>Results loading...</p>
      </TabPanel>
    </Container>
  );
};

const TabPanel = ({ value, index, children }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={3} style={{ marginTop: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default DataContainer;
