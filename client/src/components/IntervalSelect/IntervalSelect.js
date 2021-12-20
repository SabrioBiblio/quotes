import React, { useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';
import s from './IntervalSelect.module.css'

export const IntervalSelect = () => {
  const selectRef = useRef('interval');
  const [listen, send] = useSocket();

  const setInterval = () => {
    send('change_interval', selectRef.current.value);
  }

  return (
    <select id={s.intervalSelect} className='dflt-box-sh' onChange={() => setInterval()} name="interval" ref={selectRef}>
      <option >default</option>
      <option value="1000">1s</option>
      <option value="3000">3s</option>
      <option value="5000">5s</option>
      <option value="10000">10s</option>
    </select>
  )
}
