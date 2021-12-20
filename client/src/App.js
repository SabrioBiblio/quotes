import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listen, send } from './common/socket';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { Select } from './components/Select/Select';
import { Section } from './components/Section/Section';
import { getDisabledTickers } from './store/actions/actions';
import { getData } from './store/actions/actions';
import { setIntervalQuotes } from './common/socket';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    listen('connect', () => {
      send('start');
      listen('ticker', (qoutes) => {
        dispatch(getData(qoutes));
      })
    })
    dispatch(getDisabledTickers());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-end'}>
          <Select doFunction={setIntervalQuotes} options={
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
