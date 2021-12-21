import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { Select } from './components/Select/Select';
import { Section } from './components/Section/Section';
import { initData, addTicker } from './store/actions/actions';
import { setIntervalQuotes } from './common/socket';
import { getStorage, addQuote } from './common/common';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initData());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-sb'}>
          <Select 
            dispatchFunc={addTicker}
            itemStorage={'exclude_quotes'}
            doFunc={addQuote}
            options={getStorage('exclude_quotes')}
          />
          <Select 
            doFunc={setIntervalQuotes} options={
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
              },
            ]
          }/>
        </Section>
        <Section>
          <Tickers/>
        </Section>
      </div>
    </div>
  );
}

export default App;
