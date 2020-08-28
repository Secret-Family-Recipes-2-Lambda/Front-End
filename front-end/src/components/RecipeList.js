import React, { useState, useEffect } from "react";
import { Card, Row } from "reactstrap";
import axios from 'axios';

const Recipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/recipes/allRecipes')
      .then(response => {
        setUserRecipes(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log("API NOT WORKING!", error)
      });
}, []);

  return (
      <div className='wrapper'>
        <div className='form-container'>
          <h1>User Recipes</h1>
        <Row>
          {userRecipes.map(recipes => {
            return <Card recipes={userRecipes} key={recipes.id} />
          })}
        </Row>
        </div>
      </div>
  )

}
export default Recipes;