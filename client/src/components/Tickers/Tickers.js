import React from 'react';
import { useSelector } from 'react-redux';
import Ticker from '../Ticker/Ticker';
import { uniqId } from '../../common/common';
import Spiner from '../Spiner/Spiner'

const Tickers = () => {
  const tickersCurrent = useSelector((state) => state.current);
  const tickerOld = useSelector((state) => state.old);

  if(tickersCurrent === 0){
    return (
      <div><Spiner/></div>
    )
  }

  return (
    <ul>
      {tickersCurrent.map((quote, i) => {
        return <Ticker data={{
          current: quote,
          oldTicker: tickerOld.find((quoteOld) => quoteOld.ticker === quote.ticker) || quote,
        }}
        key={uniqId(i)}/>
      })}
    </ul>
  );
}

export default Tickers;