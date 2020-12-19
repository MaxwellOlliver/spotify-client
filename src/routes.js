import {} from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { WrapContainer } from './pages/WrapContainer';

export function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={WrapContainer} />
    </BrowserRouter>
  );
}
