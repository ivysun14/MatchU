import React from 'react';

const Display = ({ data }) => {
  return (
    <div>
      <h3>Match you:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Display;
