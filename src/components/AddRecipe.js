import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Input,
    Form as ReactForm,
} from 'reactstrap';
import { postAddRecipe } from '../store/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Form = styled(ReactForm)`
  width: 100%;
`
const initialState = {
    title: '',
    source: '',
    ingredients: '',
    instructions: '',
    category: '',
    user_id: 1,
}

const AddNewRecipe = () => {
    const userId = Number(localStorage.getItem('userId'))
    const [newRecipe, setNewRecipe] = useState(initialState)

    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = e => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(
            postAddRecipe({
                title: newRecipe.title,
                source: newRecipe.source,
                ingredients: newRecipe.ingredients,
                instructions: newRecipe.instructions,
                category: newRecipe.category,
                user_id: userId,
            })
        )
        setNewRecipe(``)
        history.push('/recipes')
    }

    return (
        <Container>
            <Row>
                <Col xs='12' md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input
                                type='text'
                                name='title'
                                id='title'
                                placeholder='Recipe Name'
                                onChange={handleChange}
                                value={newRecipe.title}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='source'>Source</Label>
                            <Input
                                type='text'
                                name='source'
                                id='source'
                                placeholder='Who made it first?'
                                onChange={handleChange}
                                value={newRecipe.source}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='category'>Category</Label>
                            <Input
                                type='select'
                                name='category'
                                id='category'
                                onChange={handleChange}
                                value={newRecipe.category}
                            >
                                <option>Add category</option>
                                <option>Lunch</option>
                                <option>Breakfast</option>
                                <option>Dinner</option>
                                <option>Cookies</option>
                                <option>Dessert</option>
                                <option>Bread</option>
                                <option>Salad</option>
                                <option>Soup</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='ingredients'>Ingredients</Label>
                            <Input
                                type='textarea'
                                name='ingredients'
                                id='ingredients'
                                placeholder='List of ingredients...'
                                onChange={handleChange}
                                value={newRecipe.ingredients}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='exampleText'>Instructions</Label>
                            <Input
                                type='textarea'
                                name='instructions'
                                id='instructions'
                                placeholder='Instructions...'
                                onChange={handleChange}
                                value={newRecipe.instructions}
                            />
                        </FormGroup>

                        <Button type='submit'>Add</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default AddNewRecipe;