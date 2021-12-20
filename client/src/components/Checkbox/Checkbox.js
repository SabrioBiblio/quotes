import React from 'react'
import s from './Checkbox.module.css'
import { useDispatch } from 'react-redux'

import { setDisabledTickers } from '../../store/actions/actions'

export const Checkbox = ({disableState, disableStateUpdate, ticker}) => {
  const dispatch = useDispatch();
  let checkBoxClass = disableState ? s.off : s.on;

  return (
    <div onClick={
        () => {
          disableStateUpdate((state) => state = !state);
          dispatch(setDisabledTickers(ticker));
        }
      } 
      className={`${s.checkbox}
      ${checkBoxClass} dflt-box-sh`}
    ></div>
  )
} 
