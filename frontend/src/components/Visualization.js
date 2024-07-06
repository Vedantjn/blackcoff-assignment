import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Visualization = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = data;
    if (filters.endYear) result = result.filter(item => item.end_year === filters.endYear);
    if (filters.topic) result = result.filter(item => item.topic === filters.topic);
    if (filters.sector) result = result.filter(item => item.sector === filters.sector);
    if (filters.region) result = result.filter(item => item.region === filters.region);
    if (filters.pest) result = result.filter(item => item.pestle === filters.pest);
    if (filters.source) result = result.filter(item => item.source === filters.source);
    if (filters.swot) result = result.filter(item => item.swot === filters.swot);
    if (filters.country) result = result.filter(item => item.country === filters.country);
    if (filters.city) result = result.filter(item => item.city === filters.city);
    setFilteredData(result);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const intensityData = {
    labels: filteredData.map(item => item.topic),
    datasets: [{
      label: 'Intensity',
      data: filteredData.map(item => item.intensity),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const likelihoodData = {
    labels: filteredData.map(item => item.topic),
    datasets: [{
      label: 'Likelihood',
      data: filteredData.map(item => item.likelihood),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  const regionData = {
    labels: [...new Set(filteredData.map(item => item.region))],
    datasets: [{
      data: [...new Set(filteredData.map(item => item.region))].map(
        region => filteredData.filter(item => item.region === region).length
      ),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="visualization-container">
      <div className="dashboard-header">
        <h2>Data Visualization Dashboard</h2>
        <div className="filters">
          <input name="endYear" placeholder="End Year" onChange={handleFilterChange} />
          <input name="topic" placeholder="Topic" onChange={handleFilterChange} />
          <input name="sector" placeholder="Sector" onChange={handleFilterChange} />
          <input name="region" placeholder="Region" onChange={handleFilterChange} />
          <input name="pest" placeholder="PEST" onChange={handleFilterChange} />
          <input name="source" placeholder="Source" onChange={handleFilterChange} />
          <input name="swot" placeholder="SWOT" onChange={handleFilterChange} />
          <input name="country" placeholder="Country" onChange={handleFilterChange} />
          <input name="city" placeholder="City" onChange={handleFilterChange} />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {!loading && !error && (
        <div className="dashboard-grid">
          <div className="dashboard-card website-analytics">
            <h3>Website Analytics</h3>
            <div className="card-metric">Total Conversion Rate</div>
            <div className="large-number">28.5%</div>
            <div className="card-metric">2,845 Daily Visitors</div>
          </div>
          
          <div className="dashboard-card">
            <h3>Average Daily Sales</h3>
            <div className="card-metric">Total Sales This Month</div>
            <div className="large-number">$28,450</div>
            <div className="percentage-increase">12.3% from last month</div>
          </div>
          
          <div className="dashboard-card">
            <h3>Sales Overview</h3>
            <div className="card-metric">Total Revenue</div>
            <div className="large-number">$42.5k</div>
            <div className="percentage-increase">18.2% increase</div>
          </div>
          
          <div className="dashboard-card">
            <h3>Intensity by Topic</h3>
            <div className="chart-container">
              <Bar data={intensityData} options={chartOptions} />
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Likelihood by Topic</h3>
            <div className="chart-container">
              <Line data={likelihoodData} options={chartOptions} />
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Data by Region</h3>
            <div className="chart-container">
              <Pie data={regionData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization;