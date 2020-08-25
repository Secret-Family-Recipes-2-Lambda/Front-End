import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

//setting state

const LoginForm = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().required("Please enter your Username!"),
    password: yup.string().required("Please enter a password!"),
});

//set user state errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

//for validation using yup
  const formValidation = (e) => {
      yup
        .reach(schema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
          setErrors({ ...errors, [e.target.name]: ""});
        })
        .catch((error) => {
          setErrors({
              ...errors,
              [e.target.name]: error.errors[0],
          });
      });
  };

  //set handle change of data
const handleNameChange = (e) => {
    e.persist();
    const userName = {
        ...userName,
        [e.target.name]: e.target.value,
    };
    formValidation(e);
    setUserName(userName);
};

const handlePasswordChange = (e) => {
  e.persist();
  const userPassword = {
      ...userPassword,
      [e.target.name]: e.target.value,
  };
  formValidation(e);
  setPassword(userPassword);
};

//set button behavior
const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
    schema.isValid(userName).then((valid) => {
        setButtonDisabled(!valid);
    });
}, [userName, schema]);
  const submitForm = (e) => {
    e.preventDefault()
    .post('https://familysecretrecipes.herokuapp.com/api/auth/login', userName)
    .then(response => {
      console.log('Yeyy, Your Login!', response.data)
      props.history.push('/api/auth/login')
    })
    .catch(error => console.log('Login Error', error.message))
  }
function RegistrationForm(props) {
  console.log(props);
}
  return (
      <div className='wrapper'>
        <div className='form-container'>
          <h1>Login</h1>

        <Form onSubmit={submitForm} />
            <div className='userName'>
              <Label htmlFor='userName'>Username</Label>
              <Input
                type='string'
                name='userName'
                placeholder='type your username'
                onChange={handleNameChange}
              />
            </div>
            <div className='password'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='string'
                name='password'
                placeholder='password please'
                onChange={handlePasswordChange}
              />
            </div>
            <br></br>
          <Button disabled={buttonDisabled} type="submit" color="success">
            Log In
          </Button>
          <div className='registerHere' >
          <br></br>
          Don't have an Account?
          <Link to={'/RegistrationForm'} RegistrationForm >
           Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
