import React from 'react';
import { useSelector } from 'react-redux';
import Ticker from '../Ticker/Ticker';
import { uniqId } from '../../common/common';
import Spiner from '../Spiner/Spiner'

const Tickers = () => {
  const tickers = useSelector((state) => state);

  if(tickers.current.length === 0){
    return (
      <div><Spiner/></div>
    )
  }

  return (
    <>
      <div>
        {tickers.map((quote, i) => {
          return <Ticker ticker={{
            current: quote,
            oldTicker: tickers.old.find((quoteOld) => quoteOld.ticker === quote.ticker) || quote,
          }}
          key={uniqId(i)}/>
        })}
      </div>
    </>
  );
}

export default Tickers;