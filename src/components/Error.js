import React from 'react';
import { useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
};
