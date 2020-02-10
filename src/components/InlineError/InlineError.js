import React from 'react';

function InlineError({errors, field}) {
  return errors[field] ? <div className={'base-error'}>{errors[field]}</div> : null;
}

export default InlineError;
