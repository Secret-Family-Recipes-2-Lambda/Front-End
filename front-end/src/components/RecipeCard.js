import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
    Card as ReactCard,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Badge,
} from 'reactstrap';
import yum from '../img/yum.jpg';

const Card = styled(ReactCard)`
  margin-bottom: 50px;
  border: 5px double #67696c;
`

const RecipeCard = ({ recipe }) => {
    const history = useHistory()
    const routeToRecipe = e => {
        e.preventDefault()
        history.push(`/recipes/${recipe.id}`)
    }
    return (
        <Card>
            <CardImg top width='100%' src={ yum } alt='Recipe' />
            <CardBody>
                <CardTitle>Title: {recipe.title}</CardTitle>
                <CardSubtitle>Source: {recipe.source}</CardSubtitle>
                <Badge color='dark' pill>
                    Category: {recipe.category}
                </Badge>
            </CardBody>
            <CardBody>
                <Button onClick={routeToRecipe}>View Recipe</Button>
            </CardBody>
        </Card>
    )
}

export default RecipeCard;