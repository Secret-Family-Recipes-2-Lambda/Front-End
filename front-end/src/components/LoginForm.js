import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

//setting state

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = yup.object().shape({
    email: yup.string()
      .email()
      .required("Required!"),
    password: yup.string()
      .required("Please enter a password!")
      .min(8, "Password too short - minimum 8 characters.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
  });

//set user state errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

//form validation using yup
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

    formValidation(e);
    setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  e.persist();
  
  formValidation(e);
  setPassword(e.target.value);
};

//set button behavior
const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
  const newObj = {
    email: email,
    password: password
  }
    schema.isValid(newObj).then((valid) => {
      console.log(valid)
        setButtonDisabled(!valid);
    });
}, [email, password, schema]);

  const submitForm = (e) => {
    e.preventDefault()
    .post('http://familysecretrecipes.herokuapp.com/api/login', email)
    .then(response => {
      console.log('Yeyy, Your Login!', response.data)
      props.history.push('/api/auth/login')
    })
    .catch(error => console.log('Login Error', error.message))
  }

  return (
      <div className='wrapper'>
        <div className='form-container'>
          <h1>Login</h1>

        <Form onSubmit={submitForm} />
            <div className='email'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='text'
                name='email'
                placeholder='type your email'
                onChange={handleNameChange}
                value={email}
              />
            </div>
            <div className='password'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='string'
                name='password'
                placeholder='password please'
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <br></br>
          <Button disabled={buttonDisabled} type="submit" color="success">
            Log In
          </Button>
          <div className='registerHere' >
          <br></br>
          Don't have an Account?
          <Link to='/register'>Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
