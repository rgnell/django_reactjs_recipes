import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Container
} from 'reactstrap';

class LayoutItem extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {

        let logInOut;
        let newrecipe;
        if (this.props.isAuthenticated){
            logInOut = <NavLink key="2" href="/recipe" onClick={this.props.logout} >Выйти</NavLink>
            newrecipe = <NavLink href="/create">Создать</NavLink>
        } else {
            logInOut = <NavLink key="1" href="/login">Войти</NavLink>
        }
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/recipe">Рецепты</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/*<NavItem>
                                <NavLink href="#">Основные блюда {this.state.userData}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Выпечка</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Закуски</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Напитки</NavLink>
                            </NavItem>*/}
                            <NavItem>
                                {newrecipe}
                            </NavItem>
                            <NavItem >
                                {logInOut}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <main>
                    <Container >
                            {this.props.children}
                    </Container>
                </main>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {

        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LayoutItem));