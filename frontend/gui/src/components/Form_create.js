import React from 'react';
import axios from 'axios';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from "react-redux";
import FormData from 'form-data'


 class FormRecipe extends React.Component {
     constructor (props) {
         super(props);
         this.state = {
             title: '',
             amountIngred: '',
             timePrepare: '',
             portions: '',
             ingredients: '',
             recipe: '',
             category: '',
             photo: null
         };
         this.handleFile = this.handleFile.bind(this);
     }
     handleFile(e){


         this.setState({ photo: e.target.files[0]});
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
        formData.append( 'ingredients', this.state.ingredients);
        formData.append( 'recipe', this.state.recipe);
        formData.append( 'category', this.state.category);
         if (this.state.photo!=null) {
             formData.append('photo', this.state.photo);
         }
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`,
        };
        await axios.post("http://127.0.0.1:8000/api/v0/recipes/", formData )
            .then(res => {
                if (res.status === 201) {
                    this.props.history.push(`/recipe`);
                }
            })

    };

    render() {
        return (
            <Container>
                <Row>
                    <Col lg="10" md="11" sm="12" className="form_сenter">
                        <h2>Создание рецепта</h2>
                        <Form onSubmit={event =>this.handleFormSubmit(event)} token={this.props.token}>
                            <FormGroup>
                                <Label>Название</Label>
                                <Input type="text" name="title" id="title" placeholder="Название рецепта"
                                       onChange={this.handleUserInput}
                                       required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amountingredients">Количество ингредиентов</Label>
                                <Input type="text" name="amountIngred" id="amountingredients" placeholder="Количество"
                                       onChange={this.handleUserInput}
                                       required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="time">Время приготовления</Label>
                                <Input type="text" name="timePrepare" id="time" placeholder="Время"
                                       onChange={this.handleUserInput}
                                       required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="portions">Количество порций</Label>
                                <Input type="text" name="portions" id="portions" placeholder="Количество порций"
                                       onChange={this.handleUserInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ingredients">Ингредиенты</Label>
                                <Input type="textarea" name="ingredients" id="ingredients"
                                       onChange={this.handleUserInput}
                                       required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="recipe">Рецепт</Label>
                                <Input type="textarea" name="recipe" id="recipe"
                                       onChange={this.handleUserInput}
                                       required={true}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Категория</Label>
                                <Input type="select" name="category" id="category"
                                       onChange={this.handleUserInput}
                                       defaultValue="О"
                                >
                                    <option value="">Без категории</option>
                                    <option value="О">Основные блюда</option>
                                    <option value="В">Выпечка</option>
                                    <option value="З">Закуски</option>
                                    <option value="В">Десерты</option>
                                    <option value="Н">Напитки</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="photo">Фотография</Label>
                                <Input type="file" name="photo" id="photo"
                                       onChange={this.handleFile}
                                />
                                <FormText color="muted">
                                    Загрузите фотографию блюда
                                </FormText>
                            </FormGroup>
                            <Button  type="submit">Создать</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        userData: state.userData,
        token: state.token
    };
};

export default connect(mapStateToProps)(FormRecipe);