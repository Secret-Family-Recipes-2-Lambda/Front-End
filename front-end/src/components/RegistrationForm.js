import React, { useState, useEffect } from 'react';
import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';
import * as yup from 'yup';
import { Link } from 'react-router-dom'


 //set user data state
const RegistrationForm = (props) => {
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    });

 //set yup validation 
 const formSchema = yup.object().shape({
    userName: yup.string().required("Please enter your Username!"),
    password: yup.string().required("Please enter a password!"),
});

 //set user state error
 const [errors, setErrors] = useState({
  userName: "",
  password: "",
});

//for validation using yup
const formValidation = (e) => {
    yup
      .reach(formSchema, e.target.name)
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

//set handling change
const handleDataChange = (e) => {
    e.persist();
    const newUserData = {
        ...newUser,
        [e.target.name]: e.target.value,
    };
    formValidation(e);
    setNewUser(newUserData);
};
//set button behavior
const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
    formSchema.isValid(newUser).then((valid) => {
        setButtonDisabled(!valid);
    });
}, [newUser, formSchema]);

const submitRegistration = (e) => {
    e.preventDefault()
    .post('https://familysecretrecipes.herokuapp.com/api/auth/register', newUser)
    .then(response =>  {
      console.log('New User Registration:', response)
      props.history.push('/api/auth/login')
    })
    .catch(error => console.log ('New User Error:', error.message))
}

return (
    <>
    <div className='wrapper'>
          <h1>Login or Register</h1>
        <Link className='login-link' to='/api/autho/login'>LoginForm</Link>
    </div>
    <Card style={{ margin: "25px auto", width: "50%" }} >
      <Form
        style={{ margin: "25px auto" }}
        onSubmit={submitRegistration}
      >
        <FormGroup>
          <Label htmlFor="userName">Username</Label>
          <Input className={errors.userName.length > 0 ? 'errors' : null}
            type="string"
            name="username"
            id="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleDataChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input className={errors.password.length > 0 ? 'errors' : null}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={newUser.password}
            onChange={handleDataChange}
          />
        </FormGroup>
        <Button disabled={buttonDisabled} type="submit" color="success">
          Sign In or Register Now!
        </Button>
      </Form>
    </Card>
    </>
  );
}

export default RegistrationForm;