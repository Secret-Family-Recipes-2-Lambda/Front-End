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
    <div className='form-container'>
        <h1>Recipes</h1>
        <div className='container-fluid d-flex justify-content-center'>
        <div className='row'>
          <div className='col-md-4'>
      <Card>
        <CardImg top width='100%' src={ img1 } alt='Recipe' />
          <CardBody>
            <CardTitle style={{paddingLeft: '15px'}}>Chicken 'Inasal'</CardTitle>
              <CardSubtitle style={{fontSize: '15px', paddingLeft: '10px'}}>Source: </CardSubtitle>
                <CardText>Grilled chicken with a twist.
In Bacolod, it's no ordinary grilled chicken.
Marinated in lemongrass, calamansi, garlic, and brushed with annatto seeds oil.</CardText>
          </CardBody>
          <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
      </Card>
        </div>
        <div className='col-md-4'>
      <Card>
        <CardImg top width='100%' src={ img2 } alt='Recipe' />
          <CardBody>
            <CardTitle style={{paddingLeft: '30px'}}>Spring Rolls</CardTitle>
              <CardSubtitle style={{fontSize: '15px', paddingLeft: '10px'}}>Source: </CardSubtitle>
                <CardText>Lumpia are Filipino fried spring rolls filled with ground pork and mixed vegetables. Serve as an appetizer or finger food, with sweet and sour sauce.</CardText>
          </CardBody>
          <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
      </Card>
        </div>
        <div className='col-md-4'>
      <Card>
        <CardImg top width='100%' src={ img3 } alt='Recipe' />
          <CardBody>
            <CardTitle style={{paddingLeft: '10px'}}>Rice Cake (Puto)</CardTitle>
              <CardSubtitle style={{fontSize: '15px', paddingLeft: '10px'}}>Source: </CardSubtitle>
                <CardText>A sweet steamed rice cake, perfect match for savory dishes. Comes in a variety of flavorswhich make for a vibrantly colorful display when sold in stores</CardText>
          </CardBody>
          <Button outline color="success" size='sm' style={{ margin: '10px' }}>Get Recipe</Button>
      </Card>
        </div>
          
          
        
      
        
        </div>
      </div>
    </div>
  </div>
);
}

export default RecipeCard;