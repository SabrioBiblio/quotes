import React from 'react'

import Ticker from '../Ticker/Ticker';
import { uniqId } from '../../common/common';

export const TickerList = ({tickersCurrent, tickerOld, disabledTickers}) => {
  return (
    <ul>
      {tickersCurrent.map((quote, i) => {
        return <Ticker data={{
          current: quote,
          oldTicker: tickerOld.find((quoteOld) => quoteOld.ticker === quote.ticker) || quote,
          isDisabled: disabledTickers.includes(quote.ticker)
        }}
        key={uniqId(i)}/>
      })}
    </ul>
  )
}
