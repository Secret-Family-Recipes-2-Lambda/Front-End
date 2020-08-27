import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    Container,
    Row,
    Col,
    Form as ReactForm,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { SpinnerDiv, Spinner } from '../components/spinner';

import { postLogin } from '../store/actions';


const Form = styled(ReactForm)`
  margin-top: 150px;
  width: 100%;
`;

const initialState = {
    username: '',
    password: '',
}

const LoginForm = props => {
    const history = useHistory()
    const [userInfo, setUserInfo] = useState(initialState)

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    // POST request handled through Redux
    const handleSubmit = e => {
        e.preventDefault()
        props.postLogin(userInfo)
        history.push('/recipes')
    }

    if (localStorage.getItem('token')) {
        return <Redirect to='/recipes' />
    } else {
        return (
            <Container>
                <Row>
                    <Col xs='12' md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for='username-field'>Username</Label>
                                <Input
                                    type='text'
                                    name='username'
                                    id='username-field'
                                    placeholder='Username'
                                    value={userInfo.username}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='password-field'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password-field'
                                    placeholder='Password'
                                    value={userInfo.password}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <button>Log In</button>
                            <h6>Don't have an account?<Link to='/registration'> Register</Link> </h6>
                        </Form>
                        {props.isFetching && (
                            <SpinnerDiv>
                                <Spinner color='success' />
                            </SpinnerDiv>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        error: state.error,
    }
}

export default connect(mapStateToProps, { postLogin })(LoginForm)