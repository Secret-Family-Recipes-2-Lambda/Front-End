import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardImg, 
  CardBody, 
  CardText,
  CardTitle,
  CardSubtitle 
} from 'reactstrap';
import axios from 'axios';

import img1 from '../assets/chicken.png';
import img2 from '../assets/spring_roll.png';
import img3 from '../assets/puto.png';

const RecipeCard = props => {
    const [userRecipes, setUserRecipes] = useState ([])
    useEffect(() => {
      axios
        .get('/api/recipes')
        .then((response) => {
          setUserRecipes(response.data);
          console.log(userRecipes);
        })
        .catch((error) => {
          console.log("Data Error! BUMMER!", error);
        });
    }, [userRecipes]);


return (
  <div className='wrapper'>
      <div className='form-container' style={{ marginTop: '80%'}}>
        <h1>Recipes</h1>
        
      <Card>
        <CardImg top width='100%' src={ img1 } alt='Recipe' />
          <CardBody>
            <CardTitle>Title: Chicken BBQ</CardTitle>
              <CardSubtitle>Source: </CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          </CardBody>
          <br></br>
          <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
          
        <CardImg top width='100%' src={ img2 } alt='Recipe' />
          <CardBody>
            <CardTitle>Title: Spring Rolls</CardTitle>
              <CardSubtitle>Source: </CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          </CardBody>
                <br></br>
          <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
          
          <CardImg top width='100%' src={ img3 } alt='Recipe' />
            <CardBody>
              <CardTitle>Title: Puto</CardTitle>
                <CardSubtitle>Source: </CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBody>
                <br></br>
            <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
      </Card>
    </div>
  </div>
);
}

export default RecipeCard;