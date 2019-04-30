import React from 'react';
import axios from 'axios';
import {Col, Button, Form, FormGroup, Label, Input, FormText, CardImg} from 'reactstrap';
import { connect } from "react-redux";
import FormData from 'form-data'


class FormRecipeDP extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            amountIngred: '',
            timePrepare: '',
            portions: '',
            ingredients: '',
            recipe: '',
            category: '',
            photoOld: null,
            photoNew: null,
            statreq: ''
        };

        this.handleFile = this.handleFile.bind(this);
    }
    componentDidMount() {
        const RecipeId = this.props.match.params.RecipeId;
        axios.get(`http://127.0.0.1:8000/api/v0/recipes/${RecipeId}`)
            .then(res => {
                const recipes = res.data;
                this.setState({
                    id: recipes.id,
                    title: recipes.title,
                    author: recipes.author,
                    amountIngred: recipes.amountIngred,
                    timePrepare: recipes.timePrepare,
                    portions: recipes.portions,
                    ingredients: recipes.ingredients,
                    recipe: recipes.recipe,
                    category: recipes.category,
                    photoOld: recipes.photo

                });
            })
    }



    handleFile(e){
        this.setState({ photoNew: e.target.files[0]});
    }


    handleUserInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleFormSubmit = async (event ) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append( 'title', this.state.title);
        formData.append( 'amountIngred', this.state.amountIngred);
        formData.append( 'timePrepare', this.state.timePrepare);
        formData.append( 'portions', this.state.portions);
        formData.append( 'ingredients', this.state.ingredients);
        formData.append( 'recipe', this.state.recipe);
        formData.append( 'category', this.state.category);
        if (this.state.photoNew!=null) {
            formData.append('photo', this.state.photoNew);
        }
        else
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
        };
        const RecipeId = this.props.match.params.RecipeId;
        await axios.put(`http://127.0.0.1:8000/api/v0/recipes/${RecipeId}/`, formData )
            .then(res => {
                this.props.history.push(`/recipe/${RecipeId}`);
            })
            .catch(function (error) {
                alert("Нет прав доступа!");
                console.log(error);
            })
    };
    handleAlternate(event) {
        event.preventDefault();
        const RecipeId = this.props.match.params.RecipeId;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.delete(`http://127.0.0.1:8000/api/v0/recipes/${RecipeId}`)
            .then(res => {
                if (res.status === 204) {
                    this.props.history.push(`/recipe`);
                }
            })
            .catch(function (error) {
                alert("Нет прав доступа!");
                console.log(error);
            })
    }

    render() {
        return (
            <div key={this.state.id}>
                <Col lg="10" md="11" sm="12" className="form_сenter">
                    <h2>Редактирование рецепта</h2>
                    <p>Автор рецепта: {this.state.author}</p>
                <Form onSubmit={event =>this.handleFormSubmit(event)} token={this.props.token} claaa="forms">

                            <FormGroup>
                                <Label for="title">Название</Label>
                                <Input type="text" name="title" id="title"
                                       onChange={this.handleUserInput}
                                       required={true}
                                       Value={this.state.title}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amountingredients">Количество ингредиентов</Label>
                                <Input type="text" name="amountIngred" id="amountingredients"
                                       onChange={this.handleUserInput}
                                       required={true}
                                       defaultValue={this.state.amountIngred}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="time">Время приготовления</Label>
                                <Input type="text" name="timePrepare" id="time"
                                       onChange={this.handleUserInput}
                                       required={true}
                                       defaultValue={this.state.timePrepare}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="portions">Количество порций</Label>
                                <Input type="text" name="portions" id="portions"
                                       onChange={this.handleUserInput}
                                       defaultValue={this.state.portions}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ingredients">Ингредиенты</Label>
                                <Input type="textarea" name="ingredients" id="ingredients"
                                       onChange={this.handleUserInput}
                                       required={true}
                                       value={this.state.ingredients}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="recipe">Рецепт</Label>
                                <Input type="textarea" name="recipe" id="recipe"
                                       onChange={this.handleUserInput}
                                       required={true}
                                       value={this.state.recipe}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Категория</Label>
                                <Input type="select" name="category" id="category"
                                       onChange={this.handleUserInput}>
                                    value={this.state.category}
                                    <option value="О">Основные блюда</option>
                                    <option value="В">Выпечка</option>
                                    <option value="З">Закуски</option>
                                    <option value="В">Десерты</option>
                                    <option value="Н">Напитки</option>
                                </Input>
                            </FormGroup>
                            <p>Исходное фото блюда</p>
                            <img top width="200px"
                                     src={this.state.photoOld}
                                     alt="photo"
                                     height="200px" display="block"
                            />

                            <FormGroup>
                                <Label for="photo">Фотография</Label>
                                <Input type="file" name="photo" id="photo"
                                       onChange={this.handleFile}
                                />
                                <FormText color="muted">
                                    Загрузите фотографию блюда
                                </FormText>
                            </FormGroup>

                            <Button  type="submit">Обновить</Button>
                            <Button onClick={this.handleAlternate.bind(this)} className="right">Удалить</Button>



                </Form>
                </Col>
            </div>
        );
    }
}
const mapStateToProps = state => {

    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(FormRecipeDP);