import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { Section } from './components/Section/Section';
import { getQuotes } from './store/actions/actions';
import { send } from './common/socket';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    send('start');
    dispatch(getQuotes());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-sb'}>
        </Section>
        <Section>
          <Tickers/>
        </Section>
      </div>
    </div>
  );
}

export default App;
