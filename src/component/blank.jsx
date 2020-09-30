import React from 'react';
const Blank=()=> { 
  return (
    <div className="d-flex h-blank justify-content-center align-items-center">
      <h4 className="text-secondary"> Just a Blank Component Here for illustrate React Route...</h4>
    </div>
  );
}

export default React.memo(Blank)