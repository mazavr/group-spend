import React, {useEffect, useRef} from 'react';
import {makeSortable} from './sortable';

function SortableList({children, itemSelector, dragHelperSelector, sort}) {
  const listEl = useRef(null);

  useEffect(() =>
    makeSortable({
      listEl: listEl.current,
      dragHelperSelector,
      itemSelector,
      sort
    })
  );

  return (
    <div ref={listEl}>
      {children}
    </div>
  )
}

export default React.memo(SortableList);
