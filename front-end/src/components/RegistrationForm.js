import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import * as yup from 'yup';

//set new user data state
const RegisterForm = (props) => {
  const [newUserData, setNewUserData] = useState({
    fullName: '',
    email: '',
    userName: '',
    password: '',
  });

  //set yup validation
  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter your full name!'),
    email: yup.string().required('Please enter a valid email!'),
    userName: yup.string().required('Please enter your Username!'),
    password: yup.string().required('Please enter a password!'),
  });

  //set user state errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    userName: '',
    password: '',
  });

  //for validation using yup
  const formValidation = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: '' });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        });
      });
  };

  //set handle change of data
  const handleDataChange = (e) => {
    e.persist();
    const newUserData = {
      ...newUserData,
      [e.target.name]: e.target.value,
    };
    formValidation(e);
    setNewUserData(newUserData);
  };

  //set button behavior
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(newUserData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [newUserData, schema]);

  // https://secret-recipes-2.herokuapp.com/api

  const submitForm = (e) => {
    e.preventDefault()
      .post(
        'https://familysecretrecipes.herokuapp.com/api/auth/register',
        newUserData
      )
      .then((response) => {
        console.log('Success! You just registered!', response);
        props.history.push('/api/auth/register');
      })
      .catch((error) => console.log('New Registration  Error!', error.message));
  };

  return (
    <div className='wrapper'>
      <div className='form-container'>
        <h1>Create Account</h1>

        <Form onSubmit={submitForm} />
        <div className='fullName'>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            className={errors.fullName.length > 0 ? 'errors' : null}
            type='string'
            name='fullName'
            placeholder='type your fullname'
            value={newUserData.fullName}
            onChange={handleDataChange}
          />
        </div>
        <div className='email'>
          <Label htmlFor='email'>Email</Label>
          <Input
            className={errors.email.length > 0 ? 'errors' : null}
            type='string'
            name='email'
            placeholder='valid email only'
            value={newUserData.email}
            onChange={handleDataChange}
          />
        </div>
        <div className='userName'>
          <Label htmlFor='userName'>User Name</Label>
          <Input
            className={errors.userName.length > 0 ? 'errors' : null}
            type='string'
            name='userName'
            placeholder='choose username'
            value={newUserData.userName}
            onChange={handleDataChange}
          />
        </div>
        <div className='password'>
          <Label htmlFor='password'>Password</Label>
          <Input
            className={errors.password.length > 0 ? 'errors' : null}
            type='string'
            name='password'
            placeholder='unique password'
            value={newUserData.password}
            onChange={handleDataChange}
          />
        </div>
        <Button disabled={buttonDisabled} type='submit' color='success'>
          Register Now!
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
