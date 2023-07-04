import React, { Suspense } from 'react';
import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from 'react-router-dom';
import { getVan } from '../../api';
import { requireAuth } from '../../utils';

export const loader = async ({ params, request }) => {
  await requireAuth(request);
  return defer({ hostVans: getVan(params.id) });
};

export function HostVanDetail() {
  const dataPromise = useLoaderData();

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  const renderCurrentVan = (currentVan) => {
    return (
      <>
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt={currentVan.name} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            style={({ isActive }) => (isActive ? activeStyles : null)}
            end
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </>
    );
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await resolve={dataPromise.hostVans}>{renderCurrentVan}</Await>
        </Suspense>
      </div>
    </section>
  );
}
