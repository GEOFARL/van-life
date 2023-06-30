import React from 'react';
import { useOutletContext } from 'react-router-dom';

export const HostVanPhotos = () => {
  const { currentVan } = useOutletContext();
  return (
    <img
      src={currentVan.imageUrl}
      alt={currentVan.name}
      className="host-van-detail-image"
    />
  );
};
