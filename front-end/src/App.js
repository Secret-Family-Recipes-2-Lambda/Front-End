import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

export default function App() {
  return (
      <div className='App'>
        <Switch>
          <Route path='/api/auth/register' component={RegistrationForm} />
          <Route path='/api/auth/LoginForm' component={LoginForm} />
        </Switch>
      </div>
  );
}


