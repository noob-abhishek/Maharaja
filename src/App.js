import React from 'react';
import FixedSidebar from './Components/FixedSidebar';
import DataContainer from './Components/MainContainer.jsx';

const App = () => {
  
  const apiEndpoint2 = 'https://jobnews-backend.onrender.com/api/jobs';

  return (
    <div style={{ display: 'flex' }}>
      <FixedSidebar />
      <DataContainer apiEndpoint={apiEndpoint2} />
    </div>
  );
};

export default App;
