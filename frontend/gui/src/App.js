import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import LayoutItem from "./containers/Layout";
import BaseRouter from './routes';
import { connect } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom';
import * as actions from './store/actions/auth';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div >

                <Router>
                        <LayoutItem {...this.props}>
                            <BaseRouter/>
                        </LayoutItem>
                </Router>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        userData: state.userData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
