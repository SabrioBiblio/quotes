import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import s from './Select.module.css'

export const Select = ({doFunc, options, dispatchFunc}) => {
  const dispatch = useDispatch();
  const selectRef = useRef('select');
  return (
    <select
      onChange={() => {
        doFunc(selectRef.current.value);
        if(dispatchFunc === Function){
          dispatch(dispatchFunc(selectRef.current.value))
        }else{
          return;
        };
      }} 
      id={s.intervalSelect}
      className='dflt-box-sh'
      name="select"
      ref={selectRef}
    >
      {options.map((option) => 
      <option 
        value={option.value}
      >
      {option.optionName ? option.optionName : option}
      </option>)}
    </select>
  )
}
