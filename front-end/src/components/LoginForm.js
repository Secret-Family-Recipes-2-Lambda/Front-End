import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

//setting state

export default function LoginForm(){
  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
});

  const [serverError, setServerError] = useState("");

  //set button behavior
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //set user state errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

// temporary post response
  const [post, setPost] = useState ([])

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

//onSubmit Function
  const submitForm = (e) => {
    e.preventDefault()
    axios
      .post('api/login', loginState)
      .then(response => {
        console.log('Yeyy, Your Login!', response.data)
        setPost(response.data);
        setServerError(null)
        setLoginState({
          email: "",
          password: ""
        })
    })
      .catch(error => {
        setServerError('ALERT! Login Error!')
    });
  }

  //set handle change of data
  const inputChange = (e) => {
    e.persist();
      console.log("input has changed!", e.target.value);
    const newLoginData = {
      ...loginState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value};

      formValidation(e);
      setLoginState(newLoginData);
    };

  const schema = yup.object().shape({
    email: yup.string()
      .email()
      .required("Required!"),
    password: yup.string()
      .required("Please enter a password!")
      .min(8, "Password too short - minimum 8 characters.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
  });

  useEffect(() => {
    schema.isValid(loginState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [loginState, schema]);
  
  return (
      <div className='wrapper'>
        <div className='form-container'>
          <h1>Login</h1>

        <Form onSubmit={submitForm} />
          {serverError ? <p className="error">{serverError}</p> : null}

            <div className='email'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='text'
                name='email'
                placeholder='type your email'
                onChange={inputChange}
                value={loginState.email}
              />
            </div>
            <div className='password'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='string'
                name='password'
                placeholder='password please'
                onChange={inputChange}
                value={loginState.password}
              />
            </div>
            <br></br>
          <Button disabled={buttonDisabled} type="submit" color="success">
            Log In
          </Button>
          <div className='registerHere' >
          <br></br>
          Don't have an Account?
          <Link to='/register'>Register Here</Link>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

