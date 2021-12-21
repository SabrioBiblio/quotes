import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Tickers from './components/Tickers/Tickers';
import './App.css';
import { Section } from './components/Section/Section';
import { getQuotes } from './store/actions/actions';
import { send } from './common/socket';
import { Select } from './components/Select/Select'
import { changeInterval, getDeletedQuotes } from './common/socket';

const App = () => {
  const dispatch = useDispatch();
  const [s, ss] = useState([]);
  const a = async () => {
    const data = await getDeletedQuotes()
    ss(data)
  }
  useEffect(() => {
    a()
    send('start');
    dispatch(getQuotes());
  }, []);


 
  return (
    <div className="App">
      <div className="container">
        <Section styleClass={'d-flex justify-sb'}>
          <Select 
          doFunc={changeInterval}
            options={
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
              }
            ]
          }/>
        <Select options={s}/>
        </Section>
        <Section>
          <Tickers/>
        </Section>
      </div>
    </div>
  );
}

export default App;
