import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home';
import RecentlyPlayed from '../RecentlyPlayed';

const Routes: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/recently-played" component={RecentlyPlayed} />
    </>
  );
};

export default Routes;
