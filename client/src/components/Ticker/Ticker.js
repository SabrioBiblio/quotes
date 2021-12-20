import React, { useState, useEffect } from 'react';

import s from './Ticker.module.css'
import colors from './TickerColors/TickerColor'
import { Checkbox } from '../Checkbox/Checkbox';
import { actionTicker } from '../../common/common'
import { getStorage } from '../../common/common';


const Ticker = (props) => {
  const [display, setDisplay] = useState(true);
  const [removeClass, setRemove] = useState('');
  const [disabled, disableUpdate] = useState(false);

  let disableClass = disabled ? s.on : s.off;

  const USD = 27;

  useEffect(() => {
    const disableTicker = getStorage('disabled_tickers');
    if(disableTicker.includes(props.ticker.current.ticker)){
      disableUpdate(true)
    }

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
    yield: profit
  } = props.ticker.current;

  const {
    exchange,
    price: oldPrice,
    change: oldChange
  } = props.ticker.oldTicker;

  const changePercent = (((oldPrice/oldChange) - (price/change))/(price/change)) * 100;

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
    actionTicker('exclude_quotes', ticker);
    setRemove(s.tickerRemove);
    setTimeout(() => {
      setDisplay(false);
    }, 300)
  }

  if(disabled){
    return (
      <div className={`d-flex justify-sb ${s.tickerWrapper} ${removeClass}`}>
      <div className={s.ticker}>
        <div className={`${s.tickerName} ${s.disableClass} brd-r-5 dflt-box-sh`} style={{background: changeColor()}}>
          {ticker}/{exchange}
        </div>
      </div>
      <div className={s.price}>-</div>
      <div className={s.priceChange}>
        -
      </div>
      <div>
        -
      </div>
      <div>-</div>
      <div className={`${s.percent} justify-end d-flex`}>
        <div className={`${s.noChange} brd-r-5 dflt-box-sh`}>
          -%
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
    )
  }
  
  return (
    <div className={`d-flex justify-sb ${s.tickerWrapper} ${removeClass}`}>
      <div className={s.ticker}>
        <div className={`${s.tickerName} brd-r-5 dflt-box-sh`} style={{background: changeColor()}}>
          {ticker}/{exchange}
        </div>
      </div>
      <div className={s.price}>{(USD * (price / change)).toFixed(2)} $</div>
      <div className={`${s.priceChange} ${changeClass(changePercent)}`}>
        <span>{Math.abs((USD * ((oldPrice/oldChange) - (price/change)))).toFixed(2)} $</span>
      </div>
      <div>
        {profit}
      </div>
      <div>{dividend}</div>
      <div className={`${s.percent} justify-end d-flex`}>
        <div className={`${changeClass(changePercent)} brd-r-5 dflt-box-sh`}>
          {Math.abs(changePercent).toFixed(1)}%
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