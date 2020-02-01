import React, {useState, useEffect} from 'react';
import SimpleList from '../SimpleList';

function EditableList({items, deleteClick, titleClick, addClick, addPlaceholder}) {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState('');

  console.log('EditableList render');
  useEffect(() => {
    console.log('EditableList useEffect');
    setFiltered(filter
      ? items.filter(item => item.title.includes(filter))
      : items);
  }, [filter, items]);

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <form className={'trailing-block'} onSubmit={e => {e.preventDefault(); addClick(title)}}>
          <div className={'trailing-block__body'}>
            <input className={'base-input'}
                   placeholder={addPlaceholder}
                   value={title}
                   onChange={event => setTitle(event.target.value)}/>
          </div>
          <div className={'trailing-block__tail'}>
            <button type={'submit'} className={'base-button base-button--success'}>Add</button>
          </div>
        </form>
      </div>
      <div className={'v-list__item'}>
        <input className={'base-input'} placeholder={'Filter'}
               value={filter}
               onChange={event => setFilter(event.target.value)}/>
      </div>
      <div className={'v-list__item'}>
        <SimpleList items={filtered} deleteClick={deleteClick} titleClick={titleClick}/>
      </div>
    </div>
  )
}

export default React.memo(EditableList)
