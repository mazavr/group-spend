import React, {useState, useEffect} from 'react';
import SimpleList from '../SimpleList';
import {validate} from '../../validation/validator';
import BlockError from '../BlockError';

function EditableList({items, deleteClick, titleClick, addClick, addPlaceholder, validationRules}) {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFiltered(filter
      ? items.filter(item => item.title.includes(filter))
      : items);
  }, [filter, items]);

  const validateForm = (model, propsArray) => {
    let validationResult = validationRules
      ? validate(propsArray, validationRules, model)
      : undefined;
    setErrors(validationResult || {});
    return validationResult === undefined;
  };

  const onSubmit = event => {
    event.preventDefault();
    if (validateForm({title}, ['title'])) {
      addClick(title)
    }
  };

  const onTitleChange = title => {
    setErrors({});
    setTitle(title);
  };

  const onDeleteClick = item => {
    if (validateForm(item, ['onDelete'])) {
      deleteClick(item)
    } else {
      alert('in use')
    }
  };

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

export default React.memo(EditableList);
