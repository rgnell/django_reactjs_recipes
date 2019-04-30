import React from 'react';
import { Route} from 'react-router-dom';
import RecipeList from './components/RecipeList';
import Recipe from './components/RecipeDetail';
import FormRecipe from './components/Form_create';
import Login from './containers/Login';
import Signup from './containers/Signup';
import FormRecipeDP from './components/Form_edit';


const BaseRouter = () => (
    <div>
        <Route exact path='/recipe' component={RecipeList}/>
        <Route exact path='/recipe/:RecipeId(\d+)' component={Recipe}/>
        <Route exact path='/create' component={FormRecipe}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/edit/:RecipeId(\d+)' component={FormRecipeDP}/>

    </div>
);
export default BaseRouter;
