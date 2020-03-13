import React from 'react';

function BlockError({errors, showFirstOnly}) {
  if (!errors) {
    return null;
  }

  const errorsArray = Object.entries(errors);

  if (errorsArray.length === 0) {
    return null;
  }

  const renderError = ([error, message]) => <div key={error} className={'base-error'}>{message}</div>;

  return showFirstOnly
    ? renderError(errorsArray[0])
    : errorsArray.map(renderError);
}

export default React.memo(BlockError);
