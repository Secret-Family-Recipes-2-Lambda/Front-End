import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';

// components
import Navigation from './components/Navigation';
import AddNewRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import RecipePage from './components/RecipePage';
import RecipeList from './components/RecipeList';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <div>
      <Navigation />

      {/* Switch checks each path down the list */}
      <Switch>
        {/* Protected routes ck for token then redirect to the login if none */}
        <ProtectedRoute path='/addrecipe' component={AddNewRecipe} />
        <ProtectedRoute path='/editrecipe/:id' component={EditRecipe} />
        <ProtectedRoute path='/recipes/:id' component={RecipePage} />
        <ProtectedRoute path='/recipes' component={RecipeList} />
        <Route path='/registration' component={RegistrationForm} />
        <Route path='/login' component={LoginForm} />

        {/* If user has a token, redirect to recipe list, if not redirect to login */}
        <Route path='/'>
          {localStorage.getItem('token') ? (
            <Redirect to='/recipes' />
          ) : (
              <Redirect to='/login' />
            )}
        </Route>
      </Switch>
    </div>
  )
}

export default App;