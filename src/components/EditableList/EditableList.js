import React, {useState, useEffect, useCallback} from 'react';
import SimpleList from '../SimpleList';
import BlockError from '../BlockError';
import {useValidator} from '../../validation/useValidator';

function EditableList({items, deleteClick, deleteFail, titleClick, addClick, addPlaceholder, validationRules}) {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState('');
  const {errors, validate, setErrors} = useValidator(validationRules);

  useEffect(() => {
    const filterLowerCase = filter.toLowerCase();
    setFiltered(filter
      ? items.filter(item => item.title.toLowerCase().includes(filterLowerCase))
      : items);
  }, [filter, items]);

  const onSubmit = event => {
    event.preventDefault();
    if (validate({title}, ['title'])) {
      setTitle('');
      addClick(title)
    }
  };

  const onTitleChange = title => {
    setErrors({});
    setTitle(title);
  };

  const onDeleteClick = useCallback(item => {
    if (!validationRules.onDelete || validate(item, ['onDelete'])) {
      deleteClick(item);
    } else {
      deleteFail(item);
    }
  }, [validationRules, validate, deleteFail, deleteClick]);

  return (
    <div className={'v-list'}>
      <div className={'v-list__item'}>
        <form className={'trailing-block'} onSubmit={onSubmit}>
          <div className={'trailing-block__body'}>
            <input className={`base-input ${errors && errors.title ? 'base-input--invalid' : ''}`}
                   placeholder={addPlaceholder}
                   value={title}
                   onChange={event => onTitleChange(event.target.value)}/>
            <BlockError errors={errors.title}/>
          </div>
          <div className={'trailing-block__tail'}>
            <button type={'submit'} className={'base-button base-button--success'}>
              Add
            </button>
          </div>
        </form>
      </div>
      <div className={'v-list__item'}>
        <input className={'base-input'} placeholder={'Filter'}
               value={filter}
               onChange={event => setFilter(event.target.value)}/>
      </div>
      <div className={'v-list__item'}>
        <SimpleList items={filtered} deleteClick={onDeleteClick} titleClick={titleClick}/>
      </div>
    </div>
  )
}

export default EditableList;
