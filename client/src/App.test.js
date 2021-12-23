import { render, screen } from '@testing-library/react';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/reducers';
import thunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);


test('renders learn react link', () => {
  const { container, getByText } = render(
    <App />,
    { wrapper: ReduxWrapper },
  );
  expect(screen.getByRole('list')).toBeInTheDocument();
});