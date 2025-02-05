import React from 'react';
import './styles.scss'
import SortableList from '../SortableList';

function SimpleList({items, deleteClick, titleClick, sort, isSortable}) {
  return <SortableList itemSelector={'.js-sortable-item'}
                       dragHelperSelector={'.js-drag-helper'}
                       disableSort={!isSortable}
                       sort={sort}>
    <div className={'v-list'}>
      {items.map(item =>
        <div className={'v-list__item js-sortable-item'} key={item.id}>
          <div className={'trailing-block'}>
            <div className={`trailing-block__body`} onClick={() => titleClick(item)}>
              <div className={'list-item__title-wrapper'}>
                {isSortable && <div className={'list-item__drag-helper js-drag-helper js-drag-state'}></div>}
                <div className={`list-item__title`}>
                  {item.title}
                  {item.hint && ' '}
                  {item.hint && <span className={'list-item__title-hint'}>{item.hint}</span>}
                </div>
              </div>
            </div>
            <div className={'trailing-block__tail'}>
              <div className={'list-item__actions'}>
                <button type={'button'} className={'base-button base-button--danger'}
                        onClick={() => deleteClick(item)}>
                  Del
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </SortableList>
}

export default React.memo(SimpleList);
