// src/App.js
import React, { useState } from 'react';
import DataFetcher from './components/DataFetcher';
import Visualization from './components/Visualization';

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <h1>Blackcoffer Data Visualization Dashboard</h1>
      <DataFetcher setData={setData} />
      <Visualization data={data} />
    </div>
  );
};

export default App;
