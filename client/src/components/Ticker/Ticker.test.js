import React from 'react';
import Ticker from './Ticker'
import { render as rtlRender } from "@testing-library/react";
import {Provider} from 'react-redux'
import store from "../../store";

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
);

describe('Quote exists', () => {
  it('Quote renders', () => {
    const { container } = render(<Ticker data={{
      current: {
        ticker:"AAPL",
        exchange:"NASDAQ",
        price:"102.38",
        change:"50.54",
        change_percent:"0.93",
        dividend:"0.31",
        yield:"0.09",
        last_trade_tim:"2021-12-24T10:54:06.000Z",
      },
      oldTicker: [],
    }}/>);
    expect(container.firstChild.classList.contains('tickerWrapper')).toBe(true);
  })
})