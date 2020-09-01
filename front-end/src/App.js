import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, ButtonToggle } from 'reactstrap';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Recipe from './components/RecipeCard';

function App() {
  return (
      <div className='wrapper'>
      <Navbar style={{ color:'danger', width: '40%', display: 'flex', justifyContent: 'space-around', padding: '5px 1px' }} >
        <h1 style={{ color: 'white', textShadow: '3px 3px 5px #000000', marginBottom: '25px', marginTop: '25%'}}>
          Family Secret Recipe 2
        </h1>
        
        <Link to={'/login'}>
          <ButtonToggle color='success' size='sm' style={{ boxShadow: '2px 2px 4px #000000' }}>
            Login
          </ButtonToggle>
        </Link>
        <Link to={'/register'}>
          <ButtonToggle
            color='success' size='sm' 
            style={{ boxShadow: '2px 2px 4px #000000', marginLeft: '5px' }}>
            Register
          </ButtonToggle>
        </Link>
        <Link to={'/recipes'}>
          <ButtonToggle
            color='success' size='sm' 
            style={{ boxShadow: '2px 2px 4px #000000', marginLeft: '5px' }}>
            Recipes
          </ButtonToggle>
        </Link>
      </Navbar>
          <Link to='/login'></Link>
          <Link to='/register'></Link>
          <Link to='/recipe'></Link>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegistrationForm} />
          <Route path='/recipes' component={Recipe} />
        </Switch>
      </div>
      

  );
}

export default App;