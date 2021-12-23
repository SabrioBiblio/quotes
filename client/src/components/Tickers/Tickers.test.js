import { render as rtlRender, screen } from "@testing-library/react";
import React from 'react';
import {Provider} from 'react-redux'
import store from "../../store";

import Tickers from './Tickers'

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
)

describe('Quotes component', () => {
  it('Quotes renders', () => {
    render(<Tickers/>);
    expect(screen.getByRole('list')).toBeInTheDocument();
  })
})