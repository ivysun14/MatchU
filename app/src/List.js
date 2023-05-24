import React from 'react';

const List = ({ data }) => {
  // Render the list using the provided data
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default List;
