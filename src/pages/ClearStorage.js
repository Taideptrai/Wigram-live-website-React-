import React from 'react';

function ClearStorage() {
  localStorage.removeItem('filtersApplied');
  localStorage.removeItem('groupBy');
  return (
    <div style={{ color: 'white', padding: '20px' }}>Settings cleared.</div>
  );
}

export default ClearStorage;
