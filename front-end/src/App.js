import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <div className='wrapper'>
        <Switch>
          <Route path='/api/auth/register' component={RegistrationForm} />
          <Route exact path='/api/auth/LoginForm' component={LoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
