import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTickers, getDisabledTickers, getTickerOld } from '../../store/selectors/selectors';

import Spiner from '../Spiner/Spiner';
import { TickerList } from '../TickerList/TickerList';

const Tickers = () => {
  const tickersCurrent = useSelector(getCurrentTickers);
  const tickerOld = useSelector(getTickerOld);
  const disabledTickers = useSelector(getDisabledTickers);

  if(tickersCurrent.length === 0){
    return (
      <div><Spiner/></div>
    )
  }

  return (
    <TickerList tickersCurrent={tickersCurrent} tickerOld={tickerOld} disabledTickers={disabledTickers}/>
  );
}

export default Tickers;