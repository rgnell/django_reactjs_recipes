import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';


class Logins extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleUserInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);

        this.props.history.push('/recipe');
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <Row>
                <Col className="forms">
                    {errorMessage}
                    {
                        this.props.loading ?

                            <p>Загрузка</p>

                            :

                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <FormGroup>
                                    <Label for="userName">Логин</Label>
                                    <Input type="text" name="username" id="userName" placeholder="Имя пользователя"
                                           value={this.state.username}
                                           onChange={this.handleUserInput}
                                           required={true}
                                    />

                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">Пароль</Label>
                                    <Input type="password" name="password" id="password" placeholder="Dведите пароль"
                                           value={this.state.password}
                                           onChange={this.handleUserInput}
                                           required={true}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Button type="submit" style={{marginRight: '10px'}}>
                                        Войти
                                    </Button>
                                    Или
                                    <NavLink
                                        style={{marginRight: '10px'}}
                                        to='/signup/'> Зарегистрироваться
                                    </NavLink>
                                </FormGroup>
                            </Form>
                    }
                </Col>
            </Row>
        );
    }
}

//const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logins);