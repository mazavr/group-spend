import React, {useState} from 'react';
import BlockError from '../BlockError';
import {useValidator} from '../../validation/useValidator';

function TitleForm({title: originalTitle, onSubmit, onCancel, validationRules}) {
  const [title, setTitle] = useState(originalTitle);
  const {errors, validate} = useValidator(validationRules);

  const handleSubmit = () => {
    validate({title}, ['title']) && onSubmit(title);
  };

  const changeTitle = title => {
    setTitle(title);
    validate({title}, ['title']);
  };

  return <form className={'v-list'} onSubmit={event => {
    handleSubmit();
    event.preventDefault()
  }}>
    <div className={'v-list__item'}>
      <input className={`base-input ${errors.title ? 'base-input--invalid' : ''}`} value={title}
             onChange={event => changeTitle(event.target.value)}/>
      <BlockError errors={errors.title}/>
    </div>
    <div className={'v-list__item'}>
      <div className={'h-list h-list--pull-right'}>
        <div className={'h-list__item'}>
          <button type={'button'} className={'base-button base-button--light'} onClick={onCancel}>
            Cancel
          </button>
        </div>
        <div className={'h-list__item'}>
          <button type={'submit'} className={'base-button base-button--success'}>
            Save
          </button>
        </div>
      </div>
    </div>
  </form>
}

export default TitleForm;
