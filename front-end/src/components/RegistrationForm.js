import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import * as yup from 'yup';

//set new user data state
const RegisterForm = (props) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    terms: true
  });

  const [serverError, setServerError] = useState('');

  //set yup validation
  const schema = yup.object().shape({
    firstName: yup.string().required('Name is required!'),
    lastName: yup.string().required('Lastname required!'),
    email: yup.string()
      .email("Valid email required")
      .required('Must include an email!'),
    userName: yup.string().required('Please enter your username!'),
    password: yup.string()
      .required("Please enter a password!")
      .min(8, "Password too short - minum 8 characters.")
      .matches(/(?=.*[0-9])/, "Password ust contain a number."),
    terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
  });

  //set user state errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    terms: ''
  });

  const [post, setPost] = useState([])

  //form validation using yup
  const formValidation = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: '' });
      })
      .catch((error) => {
        console.log(error)
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        });
      });
  };

  //set handle change of data
  const inputChange = (e) => {
    e.persist();
      console.log("input changed!", e.target.value);
    const newUserData = {
      ...userData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };

    formValidation(e);
    setUserData(newUserData);
  };

  //set button behavior
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(userData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [userData, schema]);

  const submitForm = (e) => {
    e.preventDefault()
    console.log('form is submitted!')
      .post(
        '/api/auth/register', userData)
      .then((response) => {
        console.log('Success! You registered!', response.data);
        setPost(response.data);
        setServerError(null);
        setUserData({
          firstName: '',
          lastName: '',
          email: '',
          userName: '',
          password: '',
          terms: true
        });
      })
      .catch((error) => {
        setServerError('Error in Registration');
      });
  };

  return (
    <div className='wrapper'>
      <div className='form-container'>
        <h1>Create Account</h1>

      <Form onSubmit={submitForm} />
        {serverError ? <p className="error">{serverError}</p> : null}
        
          <Label htmlFor='firstName'>
            First Name
            <Input
              id='name'
              type='string'
              name='firstName'
              placeholder='firstname required'
              onChange={inputChange}
              value={userData.firstName}
            />
            {errors.firstName.length > 0 ? <p className='error'>{errors.firstName}</p> : null}
          </Label>
        
          <Label htmlFor='lastName'>
            Last Name
            <Input
              type='string'
              name='lastName'
              placeholder='lastname required'
              onChange={inputChange}
              value={userData.lastName}
            />
            {errors.lastName.length > 0 ? <p className='error'>{errors.lastName}</p> : null}
          </Label>
        
          <Label htmlFor='email'>
            Email
            <Input
              type='string'
              name='email'
              placeholder='valid email only'
              onChange={inputChange}
              value={userData.email}
            />
            {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
          </Label>
        
        <Label htmlFor='password'>
            User Name
            <Input
              type='string'
              name='password'
              placeholder='create a password'
              onChange={inputChange}
              value={userData.password}
            />
            {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
          </Label>
        
          <Label htmlFor='terms' className='terms' style={{ paddingLeft: '20px'}}>
            <Input
              type='checkbox'
              name='terms'
              onChange={inputChange}
              checked={userData.terms}
            />
            Terms & Cs
            {errors.terms.length > 0 ? <p className='error'>{errors.terms}</p> : null}
          </Label>
        <Button disabled={buttonDisabled} type='submit' color='success'>
          Register Now!
        </Button>
          <pre>{JSON.stringify(post, null, 2)}</pre>  
      </div>
    </div>
  );
}

export default RegisterForm;
