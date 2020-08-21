import React, { useState, useEffect } from 'react';
import { Button, Card } from 'reactstrap';

const RecipeList = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    authentication()
      .get('/api/recipes')
      .then((response) => {
        setUserRecipes(response.data);
        console.log(userRecipes);
      })
      .catch((error) => {
        console.log('Something went wrong!', error);
      });
  }, []);

  return (
    <Card>
      <h1 style={{ marginLeft: '45%', width: '50%' }}>Recipe List</h1>
      <div>
        {userRecipes.map((recipes) => {
          return (
            <Card>
              key={recipes.id}
              style={{ margin: '25px auto', width: '25%' }}>
              <p style={{ marginLeft: '25%', marginTop: '10px' }}>
                Title: {recipes.title}
              </p>
              <p style={{ marginLeft: '25%' }}>Source: {recipes.source}</p>
              <p style={{ marginLeft: '25%' }}>
                Ingredients: {recipes.ingredients}
              </p>
              <p style={{ marginLeft: '25%' }}>
                Category: {recipes.categories}
              </p>
              <Button style={{ margin: '20px auto', width: '50%' }}>
                Edit Recipe!
              </Button>
            </Card>
          );
        })}
        ;
      </div>
    </Card>
  );
};

export default RecipeList;
