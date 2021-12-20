import React from 'react';
import { useSelector } from 'react-redux';
import Ticker from '../Ticker/Ticker';
import { uniqId } from '../../common/common';

const Tickers = () => {
  const tickersCurrent = useSelector((state) => state.current);
  const tickerOld = useSelector((state) => state.old);

  return (
    <>
      <div>
        {tickersCurrent.map((quote, i) => {
          return <Ticker ticker={{
            current: quote,
            oldTicker: tickerOld.length > 0 ? tickerOld[i] : quote,
          }}
          key={uniqId(i)}/>
        })}
      </div>
    </>
  );
}

export default Tickers;