import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { RootState } from '../store';

interface Props {
  component: React.FC;
  [x: string]: any;
}

function PrivateRoute({ component: Component, ...rest }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Route {...rest}>
      {user ? <Component {...rest} /> : <Redirect to="/login" />}
    </Route>
  );
}

export default PrivateRoute;
