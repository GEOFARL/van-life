import React, { Suspense } from 'react';
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useLocation,
} from 'react-router-dom';
import { getVans } from '../../api';

export const loader = ({ params }) => {
  return defer({ van: getVans(params.id) });
};

export const VanDetail = () => {
  const location = useLocation();
  const dataPromise = useLoaderData();

  const renderVan = (van) => {
    return (
      <>
        <img src={van.imageUrl} alt="van" />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </>
    );
  };

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
      <div className="van-detail">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await resolve={dataPromise.van}>{renderVan}</Await>
        </Suspense>
      </div>
    </div>
  );
};
