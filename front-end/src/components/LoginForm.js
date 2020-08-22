import React, { useState } from 'react';
import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


const initialState = {
  username: '',
  password: '',
  isFetching: false,
};

const LoginForm = (props) => {
  const [inputValues, setInputValues] = useState(initialState);

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault()
      .post('/api/auth/login', inputValues)
      .then((response) => {
        console.log("You're Login", response)
        props.history.push('/api/recipes');
      })
      .catch((error) => console.log("Login Error:", error.message));
      
  }

  return (
    <>
      <div className='form-container'>
        Do you have an account?
        <Link to='/api/auth/register'>
          Register
        </Link>
      </div>
      <Card style={{ margin: '25px auto', width: '50%' }}>
        <Form style={{ margin: '25px auto' }} onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor='username'>Username</Label>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color='success' type='submit'>
            Log In
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
