import React from 'react'
import { useDispatch } from 'react-redux'
import { initialDisableQuotes } from '../../store/actions/actions'

import { disablingQuotes } from '../../common/common'
import s from './Checkbox.module.css';

export const Checkbox = ({ticker, updateDisable, disabledState}) => {
  let checkBoxClass = disabledState ? s.off : s.on;

  const dispatch  = useDispatch();
  
  return (
    <div
      className={`${checkBoxClass} ${s.checkbox} dflt-box-sh`}
      onClick={() => {
          updateDisable((state) => state = !state)
          disablingQuotes(ticker);
          dispatch(initialDisableQuotes());
        }
      }
    ></div>
  )
} 
