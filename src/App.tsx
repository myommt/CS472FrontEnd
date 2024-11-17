import React, { useContext, useState, useEffect } from 'react';
import { Policies } from './PolicyContext';
import { UserContext } from './UserContext';
import './App.css';

function App() {
  const { user } = useContext(UserContext);

  const [year, setYear] = useState(() => {
    const savedYear = localStorage.getItem('selectedYear');
    return savedYear ? parseInt(savedYear) : new Date().getFullYear();
  });

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value);
    setYear(selectedYear);
    localStorage.setItem('selectedYear', selectedYear.toString());
  };

  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  useEffect(() => {
    const savedYear = localStorage.getItem('selectedYear');
    if (savedYear) {
      setYear(parseInt(savedYear));
    }
  }, []);

  console.log('User context in App component:', user);

  return (
    <div className="app-container">
      <div className="year-select-container">
        <label>Select Year: </label>
        <select id="year-select" value={year} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className={`main-content ${user.id === '' ? 'with-auth' : 'full-width'}`}>
        <div className="policies-container">
          <Policies year={year}>
            <div>
            </div>
          </Policies>
        </div>

      </div>
    </div>
  );
}

export default App;
