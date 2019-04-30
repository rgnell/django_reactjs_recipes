import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';


class Signup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(
            this.state.username,
            this.state.email,
            this.state.password1,
            this.state.password2
            );
        this.props.history.push('/recipe');
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        //const { getFieldDecorator } = this.props.form;
        return (
            <Container>
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
                                        <Label for="Email">Email</Label>
                                        <Input type="email" name="email" id="Email" placeholder="Введите Email"
                                               value={this.state.email}
                                               onChange={this.handleUserInput}
                                               required={true}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password1">Пароль</Label>
                                        <Input type="password" name="password1" id="password1" placeholder="введите пароль"
                                               value={this.state.password1}
                                               onChange={this.handleUserInput}
                                               required={true}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password2">Повторно введите пароль</Label>
                                        <Input type="password" name="password2" id="pasword2" placeholder="введите пароль"
                                               value={this.state.password2}
                                               onChange={this.handleUserInput}
                                               required={true}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Button type="submit" style={{marginRight: '10px'}}>
                                            Зарегистрироваться
                                        </Button>
                                        Или
                                        <NavLink
                                            style={{marginRight: '10px'}}
                                            to='/login/'> Войти
                                        </NavLink>
                                    </FormGroup>
                                </Form>
                        }
                    </Col>
                </Row>
            </Container>
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);