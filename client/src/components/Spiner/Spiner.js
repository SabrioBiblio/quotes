import React from 'react';

import spinner from '../../images/spinner.svg';
import s from './Spiner.module.css';

export default function Spinner() {
  return (
    <div className={s.spinner}>
      <img src={spinner} alt="" />
    </div>
  );
}