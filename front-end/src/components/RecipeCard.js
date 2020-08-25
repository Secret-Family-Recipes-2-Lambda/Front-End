import React, { useState, useEffect } from "react";
import { Card, Form, Button, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';
import * as yup from "yup";

const RecipeCards = () => {

     const [recipeData, setRecipeData] = useState({
        recipeTitle: "",
        source: "",
        ingredients: "",
        instructions: "", 
        categories: "",     
    });
//schema validation 
    const recipeSchema = yup.object().shape({
        recipeTitle: yup.string().required("Enter Recipe Name"),
        source: yup.string().required("Enter Source Origin"),
        ingredients: yup.string().required("Enter Ingredients"),
        instruction: yup.string().required("Enter Cooking Instructions"),
        categories: yup.string().required("Enter Category"),
    });

//form submission
    const submitNewRecipe = (e) => {
        yup
            .reach(recipeSchema)
            .validate(recipeData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        };
//set state errors
    const [errors, setErrors] = useState({
        recipeTitle: "",
        source: "",
        ingredients: "",
        instructions: "", 
        categories: "",       
    });    

//Checks the form to see if everything is written
    const recipeValidation = (e) => {
        yup
          .reach(recipeSchema, e.target.name)
          .validate(e.target.value)
          .then((valid) => {
            setErrors({ ...errors, [e.target.name]: "" });
          })
          .catch((error) => {
            setErrors({
              ...errors,
              [e.target.name]: error.errors[0],
            });
          });
      };

//handle change
const inputChange = (e) => {
    e.persist();
    const newRecipeData = {
      ...recipeData,
      [e.target.name]: e.target.value,
    };
    recipeValidation(e);
    setRecipeData(newRecipeData);
  };
//set button behavior 
const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
    recipeSchema.isValid(recipeData).then((valid) => {
        setButtonDisabled(!valid);
      });
    }, [recipeData]);

//fetch data
    axios
    .get('https://familysecretrecipes.herokuapp.com/api/recipes/allRecipes')
    .then((response => {
      console.log(response.data)
    }
    )
return (
  
    <Card style={{ margin: "25px auto", width: "50%" }}>
      <Form
        style={{ margin: "25px auto" }}
        onSubmit={(e) => {
          e.preventDefault();
          submitNewRecipe();
          console.log(userRecipe);
        }}
      >
        <FormGroup>
          <Label htmlFor="recipeTitle">Recipe Title</Label>
            <Input
              type="text"
              name="recipeTitle"
              id="recipeTitle"
              placeholder="Title"
              onChange={inputChange}
              value={userRecipe.recipeTitle}
            />
          {errors.recipeTitle.length > 0 ? <p>{errors.recipeTitle}</p> : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="source">Source</Label>
            <Input
              type="text"
              name="source"
              id="source"
              placeholder="Source"
              onChange={inputChange}
              value={userRecipe.source}
            />
            {errors.source.length > 0 ? <p>{errors.source}</p> : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="categories">Categories</Label>
            <Input
              type="text"
              name="categories"
              id="categories"
              placeholder="Categories"
              onChange={inputChange}
              value={userRecipe.categories}
            />
            {errors.categories.length > 0 ? <p>{errors.categories}</p> : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Ingredients">Ingredients</Label>
            <Input
              type="textarea"
              name="ingredients"
              id="Ingredients"
              placeholder="Ingredients"
              onChange={inputChange}
              value={userRecipe.ingredients}
            />
            {errors.ingredients.length > 0 ? <p>{errors.ingredients}</p> : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="instructions">Instructions</Label>
            <Input
              type="textarea"
              name="instructions"
              id="instructions"
              placeholder="Instructions"
              onChange={inputChange}
              value={userRecipe.instructions}
            />
            {errors.instructions.length > 0 ? <p>{errors.instructions}</p> : null}
        </FormGroup>
        <Button disabled={buttonDisabled} color="success">
          Add Your Recipe!
        </Button>
      </Form>
    </Card>
  )};

export default RecipeCards;
