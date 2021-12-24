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
    const { container } = render(<Ticker ticker={{
      current: [],
      oldTicker: [],
    }}/>);
    expect(container.firstChild.classList.contains('tickerWrapper')).toBe(true);
  })
})