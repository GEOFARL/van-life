import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../api';

export const Vans = () => {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const vans = await getVans();
      setVans(vans);
      setLoading(false);
    })();
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={`${van.id}`}
        state={{
          search: searchParams.toString(),
          type: typeFilter,
        }}
      >
        <img src={van.imageUrl} alt="van" />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === 'simple' ? 'selected' : ''
          }`}
          onClick={() => setSearchParams({ type: 'simple' })}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === 'luxury' ? 'selected' : ''
          }`}
          onClick={() => setSearchParams({ type: 'luxury' })}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === 'rugged' ? 'selected' : ''
          }`}
          onClick={() => setSearchParams({ type: 'rugged' })}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};
