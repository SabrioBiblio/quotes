import React from 'react';
import Ticker from './Ticker'
import { render as rtlRender, screen } from "@testing-library/react";
import {Provider} from 'react-redux'
import store from "../../store";

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
);

describe('Quote exists', () => {
  it('Quote renders', () => {
    const ticker = render(<Ticker ticker={{
      current: {
        ticker:"AAPL",
        exchange:"NASDAQ",
        price:"101.79",
        change:"64.38",
        change_percent:"0.05",
        dividend:"0.71",
        yield:"1.50"},
      oldTicker: []
    }}/>);
    console.log(ticker)
    expect(ticker.getByText('✕')).toBeInTheDocument()
  })
})