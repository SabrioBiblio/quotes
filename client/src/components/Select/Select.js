import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import s from './Select.module.css'

export const Select = ({doFunc, options}) => {
  const selectRef = useRef('select');
  const [optionsState, updateOptions] = useState(options);

  if(!optionsState.length){
    return (
      <select
      id={s.intervalSelect}
      className='dflt-box-sh'
    >
    </select>
    )
  }

  return (
    <select
      onChange={() => doFunc(selectRef.current.value)} 
      id={s.intervalSelect}
      className='dflt-box-sh'
      name="select"
      ref={selectRef}
    >
      {optionsState.map((option) => 
      <option 
        value={option.value}
      >
      {option.optionName ? option.optionName : option}
      </option>)}
    </select>
  )
}
