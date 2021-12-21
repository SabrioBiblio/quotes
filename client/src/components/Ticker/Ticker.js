import React, { useState, useEffect } from 'react';

import s from './Ticker.module.css'
import colors from './TickerColors/TickerColor'
import { Checkbox } from '../Checkbox/Checkbox';
import { deletingQuotes, getStorage } from '../../common/common'
import { useSelector } from 'react-redux';


const Ticker = (props) => {
  const disableTicker = useSelector((state) => state.disabledTickers);

  const [display, setDisplay] = useState(true);
  const [removeClass, setRemove] = useState('');
  const [disabled, disableUpdate] = useState(disableTicker.includes(props.ticker.current.ticker));

  const USD = 27;
  
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
    ticker,
    price,
    change,
    dividend,
    yield: profit,
    exchange,
  } = props.ticker.current;

  const {
    price: oldPrice,
    change: oldChange
  } = props.ticker.oldTicker;

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
    deletingQuotes(ticker);
    setRemove(s.tickerRemove);
    setTimeout(() => {
      setDisplay(false);
    }, 300)
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
      </div>
      <div className={`${s.priceChange} ${changeClass(changePercent)}`}>
        <span>{
        oldPrice === '0' && oldChange === '0' ? '-' : Math.abs((USD * ((oldPrice/oldChange) - (price/change)))).toFixed(2)
        } $</span>
      </div>
      <div className={s.profit}>
        <span>{profit}</span>
      </div>
      <div className={s.dividend}>
        <span>{dividend}</span>
      </div>
      <div className={`${s.percent} justify-end d-flex`}>
        <div className={`${changeClass(changePercent)} brd-r-5 dflt-box-sh`}>
          {oldPrice === '0' && oldChange === '0' ? '-' : Math.abs(changePercent).toFixed(1)}%
        </div>
      </div>
      <div
        className={`${s.tickerTools} d-flex justify-end align-i-center`}
      >
        <Checkbox
          disableState={disabled}
          disableStateUpdate={disableUpdate}
          ticker={ticker}
        />
        <div 
          onClick={() => removeTicker(ticker)}
          className={`${s.removeButton} align-i-center justify-center d-flex`}
        >
          ✕
        </div>
    </div>
    </div>
  );
}

export default Ticker;