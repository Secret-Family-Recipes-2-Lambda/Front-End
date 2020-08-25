import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <div className='wrapper'>
          <h1>Family Secret Recipe</h1>
        <Switch>
          <Route path='/' component={LoginForm} />
          <Route path='/' component={RegistrationForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;