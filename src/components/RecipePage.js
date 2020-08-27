import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col, Card, CardBody, CardImg } from 'reactstrap';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

import yum from '../img/yum.jpg';

const Title = styled.div`
  margin-bottom: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Btn = styled.button`
  margin-left: 0;
`;

const RecipePage = props => {
  const { id } = useParams()
  const userId = Number(localStorage.getItem('userId'))
  const [item, setItem] = useState({})
  const history = useHistory()

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes/${id}`)
      .then(res => {
        console.log('recipe page get response', res)
        setItem(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  const routeToRecipeEdit = (e, item) => {
    e.preventDefault()
    history.push(`/editrecipe/${item.id}`)
  }

  const deleteRecipe = id => {
    axiosWithAuth()
      .delete(`/recipes/${id}`)
      .then(res => {
        console.log('Delete:', res.data.message)
        history.push('/recipes')
      })
      .catch(err => console.log(err))
  }

  if (!item || (item.user_id !== userId && item.user_id > 0))
    return (
      <div className='status'>Uh oh! You don't have access to this recipe!</div>
    )
  else
    return (
      <Container>
        <Row>
          <Col xs={{ size: 8, offset: 2 }}>
            <Card>
              <CardImg src={yum} alt='yum-image' />
              <CardBody className='text-center'>
                <Title>
                  <h2>{item.title}</h2>
                  <p>from {item.source}</p>
                </Title>
                <Title>
                  <h5>Ingredients</h5>
                  <p>{item.ingredients}</p>
                </Title>
                <Title>
                  <h5>Instructions</h5>
                  <p>{item.instructions}</p>
                </Title>
                <BtnContainer>
                  <Btn onClick={e => routeToRecipeEdit(e, item)} key={item.id}>
                    Edit Recipe
                  </Btn>
                  <Btn onClick={() => deleteRecipe(id)}>Delete Recipe</Btn>
                  <Btn onClick={() => history.push('/recipes')}>Return</Btn>
                </BtnContainer>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}

export default RecipePage;