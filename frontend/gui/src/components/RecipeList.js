import React from 'react';
import {
    Row,
    Col,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Card, CardSubtitle,
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class RecipeContainer extends React.Component {
    state  = {
        recipes: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/v0/recipes/`)
            .then(res => {
                const recipes = res.data;
                this.setState({ recipes });
            })
    }



    render() {

        return (
                <Row>
                    { this.state.recipes.map(recipe =>
                            <Col  lg="3" md="4" sm="6">
                                <Card key={recipe.id} className="cardclass">
                                    <CardImg top width="100%"
                                             src={recipe.photo}
                                             alt="Фото"
                                            height="200px" display="block"
                                    />
                                    <CardBody>
                                        <CardTitle><h5>{recipe.title}</h5></CardTitle>
                                        <CardSubtitle>Автор: {recipe.author}</CardSubtitle>
                                        <CardText>Количество ингредиентов: <span className="red bold">{recipe.amountIngred}</span><br/>
                                                Время приготовления: <span className="red bold">{recipe.timePrepare}</span>
                                        </CardText>
                                        <a href={`/recipe/${recipe.id}`}>Подробнее</a><br/>

                                    </CardBody>
                                </Card>

                            </Col>
                        )
                    }
                </Row>

        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(RecipeContainer);