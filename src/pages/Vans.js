import React, { useEffect, useState } from 'react';

export const Vans = () => {
  const [vans, setVans] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/vans');
        const data = await response.json();
        setVans(data.vans);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <img src={van.imageUrl} alt="van" />
      <div className="van-info">
        <h3>{van.name}</h3>
        <p>
          ${van.price}
          <span>/day</span>
        </p>
      </div>
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};
