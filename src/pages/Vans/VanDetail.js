import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export const VanDetail = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const [van, setVan] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/vans/${params.id}`);
        const data = await response.json();
        setVan(data.vans);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.id]);

  return (
    <div className="van-detail-container">
      <Link
        to={`..?${location.state ? location.state.search : ''}`}
        relative="path"
        className="back-button"
      >
        &larr;{' '}
        <span>
          Back to{' '}
          {location.state && location.state.type ? location.state.type : 'all'}{' '}
          vans
        </span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt="van" />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
