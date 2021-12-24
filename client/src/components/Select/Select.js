import React, { useRef, useState, useEffect } from 'react';
import { listen } from '../../common/socket';

import s from './Select.module.css'
import { uniqId } from '../../common/common';

export const Select = ({doFunc, optionsProps, label}) => {
  const selectRef = useRef('select');
  const [options, updateOptions] = useState([]);

  useEffect(() => {
    if(optionsProps.length === 0){
      listen('send_deleted_quotes', (data) => updateOptions(data))
    }else{
      updateOptions(optionsProps);
    }
  }, [])


  return (
    <div>
      <label className={s.label}>{label}</label>
      <select
        onChange={() => doFunc(selectRef.current.value)} 
        className={`${s.select} dflt-box-sh`}
        name="select"
        ref={selectRef}
      >
        <option defaultValue="selected">default</option>
        {options.map((option, i) => 
        <option 
          key={uniqId(i)}
          value={option.value}
        >
        {option.optionName ? option.optionName : option}
        </option>)}
      </select>
    </div>
  )
}
