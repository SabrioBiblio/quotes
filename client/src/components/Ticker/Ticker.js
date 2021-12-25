import React, { useState, useEffect } from 'react';

import s from './Ticker.module.css'
import colors from './TickerColors/TickerColor'
import { Checkbox } from '../Checkbox/Checkbox';
import { send } from '../../common/socket';
import { getCurrency } from '../../common/common';
import { disablingQuotes } from '../../common/common'

const Ticker = ({data}) => {

  const {
    ticker,
    price,
    change,
    dividend,
    yield: profit,
    exchange,
  } = data.current;
 
  const isDisabled = data.isDisabled;

  const [display, setDisplay] = useState(true);
  const [disabled, setDisabled] = useState(isDisabled);
  const [removeClass, setRemove] = useState('');
  
  const USD = getCurrency();
  
  useEffect(() => {
    return () => {
      setRemove('')
    }
  }, []);

  if(!display){
    return (
      <>
      </>
    )
  }

  const {
    price: oldPrice,
    change: oldChange
  } = data.oldTicker;

  const changePercent = oldChange !== '0' ? (((oldPrice/oldChange) - (price/change))/(price/change)) * 100 : 0;

  const changeClass = (value) => {
    if (value === 0){
      return s.noChange;
    }else if(value > 0){
      return s.negative;
    }else if(value < 0){
      return s.positive;
    }
  }

  const changeColor = () => {
    return colors[ticker];
  }

  const removeTicker = () => {
    setRemove(s.tickerRemove);
    send('delete_quote', ticker)
    setTimeout(() => {
      setDisplay(false);
    }, 300)
  }
  
  const onCheckboxChange = () => {
    setDisabled(state => !state)
    disablingQuotes(ticker);
  }
  
  return (
    <div className={`d-flex justify-sb ${s.tickerWrapper} ${removeClass} ${disabled ? s.disableClass : ''}`}>
      <div className={s.ticker}>
        <div className={`${s.tickerName} brd-r-5 dflt-box-sh`} style={{background: changeColor()}}>
          {ticker}/{exchange}
        </div>
      </div>
      <div className={s.price}>
        <span>{oldPrice === '0' && oldChange === '0' ? '-' : (USD * (price / change)).toFixed(2)} $</span>
        <span className={s.tooltip}>Quote price change per tick</span>
      </div>
      <div className={`${s.priceChange} ${!disabled ? changeClass(changePercent) : s.noChange}`}>
        <span>{
        oldPrice === '0' && oldChange === '0' ? '-' : Math.abs((USD * ((oldPrice/oldChange) - (price/change)))).toFixed(2)
        } $</span>
        <span className={s.tooltip}>Price change per tick</span>
      </div>
      <div className={s.profit}>
        <span>{profit}</span>
        <span className={s.tooltip}>Profit</span>
      </div>
      <div className={s.dividend}>
        <span>{dividend}</span>
        <span className={s.tooltip}>Dividend</span>
      </div>
      <div className={`${s.percent} justify-end d-flex`}>
        <div className={`${!disabled ? changeClass(changePercent) : s.noChange} brd-r-5 dflt-box-sh`}>
          <span>
            {oldPrice === '0' && oldChange === '0' ? '-' : Math.abs(changePercent).toFixed(1)}
          </span>
          %
        </div>
      </div>
      <div
        className={`${s.tickerTools} d-flex justify-end align-i-center`}
      >
        <Checkbox
          onCheckboxChange={onCheckboxChange}
          disabledState={disabled}
        />
        <div 
          onClick={() => removeTicker()}
          className={`${s.removeButton} align-i-center justify-center d-flex`}
        >
          ✕
        </div>
    </div>
    </div>
  );
}

export default Ticker;