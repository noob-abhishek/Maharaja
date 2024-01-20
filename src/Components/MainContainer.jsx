import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Tab,
  Tabs,
  Box,
  Paper,
  Card,
  CardContent,
  Button,
  Pagination,
} from '@mui/material';

const DataContainer = ({ apiEndpoint }) => {
  const [data, setData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 18; 
  const maxPages = 3; 
 

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
    setPage(1); 
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const JobCard = ({ job }) => {
    return (
      <Card style={{ margin: '20px', width: '300px', borderRadius: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <CardContent style={{ padding: '20px' }}>
          <Typography variant="h6" component="div" style={{ marginBottom: '10px', textAlign: 'center' }}>
            {job.job_title}
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: '10px', textAlign: 'center' }}>
            Last Date: {job.last_date}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" href={job.job_link} target="_blank">
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TabPanel = ({ value, index, children }) => {
    return (
      <div hidden={value !== index}>
        {value === index && (
          <Box p={3} style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const calculateStartIndex = () => (page - 1) * itemsPerPage;
  const calculateEndIndex = () => Math.min(page * itemsPerPage, data.length);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '40px 0', textAlign: 'center', letterSpacing: '1px', color: '#333' }}>
        Your Dream Job Portal
      </Typography>

      <Paper elevation={3} style={{ marginBottom: '40px', borderRadius: '16px' }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.slice(calculateStartIndex(), calculateEndIndex()).map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {data && (
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={Math.min(Math.ceil(data.length / itemsPerPage), maxPages)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
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

export default DataContainer;
