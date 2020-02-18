import React from 'react';

function BlockError({errors}) {
  if (!errors) {
    return null;
  }

  return Object.entries(errors).map(([error, message]) =>
    <div key={error} className={'base-error'}>{message}</div>
  )
}

export default React.memo(BlockError);
