import { render } from "@testing-library/react";

import Tickers from './Tickers'
import React from 'react';

describe('Quote component', () => {
  it('Quote render', () => {
    render(<Tickers/>);
    expect(screen.getByRole('list')).toBeInTheDocument();
  })
})