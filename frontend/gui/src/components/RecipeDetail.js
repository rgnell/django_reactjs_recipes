import React from 'react';
import {
     Row,Col,
    CardImg, CardBody,CardTitle,
    CardSubtitle,CardText,
    Card
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

class Recipe extends React.Component {
    state  = {
        recipes: []
    }

    componentDidMount() {
        const RecipeId = this.props.match.params.RecipeId;
        axios.get(`http://127.0.0.1:8000/api/v0/recipes/${RecipeId}`)
            .then(res => {
                const recipes = res.data;
                this.setState({ recipes });
            })
    }
    render() {
        let nrecipe;
        if (this.props.token != null){
            nrecipe = <a href={`/edit/${this.state.recipes.id}`}>Редактировать</a>
        } else {
            nrecipe='';
        }
        return (
            <Row>
            <Col lg="10" md="11" sm="12" className="form_сenter" key={this.state.id}>
                <Card>
                    <CardImg top width="80%"
                             src={this.state.recipes.photo}
                             alt="Card"/>
                    <CardBody>
                        <CardTitle><h2>{this.state.recipes.title}</h2></CardTitle>
                        <CardSubtitle>
                            Количество ингредиентов: <span className="red bold">{this.state.recipes.amountIngred}</span><br/>
                            Время приготовления: <span className="red bold">{this.state.recipes.timePrepare}</span><br/>
                            Количество порций: <span className="red bold">{this.state.recipes.portions}</span><br/>
                        </CardSubtitle><br/>
                        <CardText>
                            <p className="paragraph"><span className="red bold">Ингредиенты</span><br/>
                                {this.state.recipes.ingredients}
                            </p>
                            <p className="paragraph"><span className="red bold">Рецепт</span><br/>
                                {this.state.recipes.recipe}
                            </p>
                            <span>Автор: {this.state.recipes.author} </span>

                            <span className="right">
                                Дата публикации: {
                                moment(this.state.recipes.datePublication).format("D.MM.YYYY")
                            }
                            </span><br/>
                            <span className="bold">{nrecipe} </span>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(Recipe);