import React, { useState, useEffect } from 'react';

function CountryFlags() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries data.');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country Flags</h1>
      {error && <p>Error: {error}</p>}
      <div className="countries">
        {countries.map(country => (
          <div key={country.cca2} className="country">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width="50"
              height="auto"
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryFlags;
