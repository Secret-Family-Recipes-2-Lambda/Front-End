import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { SpinnerDiv, Spinner } from '../components/spinner';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Button, Form, Input } from 'reactstrap';
import RecipeCard from './RecipeCard';


const RecipeList = () => {
    const userId = Number(localStorage.getItem('userId'))
    const [allRecipes, setAllRecipes] = useState([])
    const [err, setErr] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");

    //console.log(userId)

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const handleSubmit = event => {
        setSearchTerm(event.target["title"].value);
        event.preventDefault();
    };
    useEffect(() => {
        axiosWithAuth()
            .get('/recipes/allRecipes')
            .then(res => {
                setAllRecipes(res.data.filter(recipe => recipe.user_id === userId))
                console.log(res)
                setIsFetching(false)
            })
            .catch(err => {
                setErr(err)
                setIsFetching(false)
            })
    }, [userId])

    const gotallRecipes = allRecipes.length !== 0 ? true : false
    const gotError = err.message !== undefined ? true : false


    if (isFetching)
        return (
            <SpinnerDiv>
                <Spinner color='success' />
            </SpinnerDiv>
        )
    else if (gotallRecipes)
        return (
            <Container>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <div className='searchBox'>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Search recipe"
                                onChange={handleChange}
                                value={searchTerm}
                            />
                            <Button type='submit'>Search</Button>
                        </div>
                    </Form>
                </div>
                <Row>
                    {allRecipes.map(recipe => {
                        if (recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return (
                                <Col xs='12' sm='6' md='4' key={recipe.id}>
                                    <RecipeCard recipe={recipe} />
                                </Col>
                            )
                        } else return null

                    })}
                </Row>
            </Container>
        )
    else if (!gotallRecipes)
        return (
            <Container style={{ margin: '50px auto' }}>
                <Row>
                    <Col xs='12' lg={{ size: 4, offset: 4 }}>
                        <Card>
                            <CardBody>
                                No recipes yet? <Link to='/addrecipe'>Add One!</Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    else if (gotError)
        return (
            <Card>
                <CardBody>{err.message}</CardBody>
            </Card>
        )
    else return <></>
}

export default RecipeList;