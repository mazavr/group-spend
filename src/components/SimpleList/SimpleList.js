import React from 'react';
import './styles.scss'

function SimpleList({items, deleteClick, titleClick}) {
  return (
    <div className={'v-list'}>
      {items.map(item =>
        <div className={'v-list__item'} key={item.id}>
          <div className={'trailing-block'}>
            <div className={'trailing-block__body'} onClick={() => titleClick(item)}>
              <div className={'list-item__title-wrapper'}>
                <div className={'list-item__title'}>
                  {item.title}
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
  )
}

export default SimpleList;
