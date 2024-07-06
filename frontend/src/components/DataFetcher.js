// src/components/DataFetcher.js
import React, { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ setData }) => {
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [setData]);

  return null;
};

export default DataFetcher;
