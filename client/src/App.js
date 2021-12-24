import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { Section } from './components/Section/Section';
import { getQuotes } from './store/actions/actions';
import { send } from './common/socket';
import { Select } from './components/Select/Select'
import { changeInterval, addQuote } from './common/socket';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    send('get_deleted_quotes')
    send('start');
    dispatch(getQuotes());
  }, []);
 
  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-sb'}>
          <Select 
            label='Change interval'
            doFunc={changeInterval}
            optionsProps={
            [
              {
                value: 1000,
                optionName: '1s',
              },
              {
                value: 3000,
                optionName: '3s',
              },
              {
                value: 5000,
                optionName: '5s',
              },
              {
                value: 10000,
                optionName: '10s',
              }
            ]
          }/>
        <Select 
          label='Add quote'
          doFunc={addQuote}
          optionsProps={[]}/>
        </Section>
        <Section>
          <Tickers/>
        </Section>
      </div>
    </div>
  );
}

export default App;
