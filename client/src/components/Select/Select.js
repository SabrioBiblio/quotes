import React, { useEffect, useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';
import s from './Select.module.css'

export const Select = ({doFunction, options}) => {
  const selectRef = useRef('interval');

  return (
    <select
      onChange={() => doFunction(selectRef.current.value)} 
      id={s.intervalSelect}
      className='dflt-box-sh'
      name="interval"
      ref={selectRef}
    >
      {options.map((option) => <option value={option.value}>{option.optionName}</option>)}
    </select>
  )
}
