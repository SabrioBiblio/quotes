import { useSocket } from './hooks/useSocket';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { IntervalSelect } from './components/IntervalSelect/IntervalSelect';
import { Section } from './components/Section/Section';
import { getDisabledTickers } from './store/actions/actions';
import { getData } from './store/actions/actions';


const App = () => {

  const [listen, send] = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    listen('connect', () => {
      send('start');
    })
    dispatch(getDisabledTickers());
  }, []);

  listen('ticker', (qoutes) => {
    dispatch(getData(qoutes));
  })

  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-end'}>
          <IntervalSelect/>
        </Section>
        <Section>
          <Tickers/>
        </Section>
      </div>
    </div>
  );
}

export default App;
