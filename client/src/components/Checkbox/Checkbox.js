import React from 'react'

import s from './Checkbox.module.css';

export const Checkbox = ({onCheckboxChange, disabledState}) => {
  let checkBoxClass = disabledState ? '' : s.on;

  return (
    <div
      className={`${checkBoxClass} ${s.checkbox} dflt-box-sh`}
      onClick={onCheckboxChange}
    ></div>
  )
} 
