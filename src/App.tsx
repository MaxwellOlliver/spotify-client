import React from 'react';
import { Provider } from 'react-redux';
import { Global } from './global/globalStyles';
import WrapContainer from './pages/WrapContainer/WrapContainer';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Global />
      <WrapContainer />
    </Provider>
  );
}

export default App;
