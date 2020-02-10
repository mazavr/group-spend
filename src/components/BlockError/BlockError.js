import React from 'react';

const ErrorLine = props =>
  <div className="base-error">
    {props.children}
  </div>;

function BlockError({error, errors}) {
  if (error) {
    return <ErrorLine>{error}</ErrorLine>
  } else if (errors) {
    return Object.keys(errors).map(error =>
      <ErrorLine key={error}>{errors[error]}</ErrorLine>
    )
  }

  return null;
}

export default BlockError;
