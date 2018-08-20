import React, { Component } from 'react';
import MainPage from './MainPage';
import Registration from './Registration';
import { loginUser, currentUser, searchToken, correctToken } from '../actions/index';
import './Login.css';
import axios from "axios/index";
import { apiPrefix } from '../etc/config.json';
import {connect} from "react-redux";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            posts: [],
            correctLogin: [],
            registration: false,
            showMainPage: false,
            correctToken: false
        };

        this.openRegistration = this.openRegistration.bind(this);
    }

    componentDidMount() {
        axios.get(`${apiPrefix}/login`)
            .then(res => {
                const correctLogin = res.data;
                this.setState({ correctLogin: correctLogin });
            });

        let tokenForUser = localStorage.getItem("tokenUser");

        searchToken(tokenForUser).then((data) => {
            if(data.correctToken === true) {
                this.correctToken(true);
                this.currentUser(data.dataUser);
            }
        });
    }

    openRegistration() {
        this.setState({registration: true});
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    };

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        loginUser(user).then((data) => {
            if(data.correctLogin === true) {
                this.currentUser(data.dataUser);
                localStorage.setItem('tokenUser', data.token);
                this.correctToken(true);
            }
        });
    };

    currentUser = (data) => this.props.dispatch(currentUser(data));
    correctToken = (data) => this.props.dispatch(correctToken(data));

    render() {
        if(this.state.registration === false && this.props.dataUser._root.entries[6][1] === false) {
            return (
                <div className="login-block">
                    <h2 className="login-header">Login</h2>
                    <form className="forms-for-filling-login" method="post" action="/"
                          onSubmit={this.handleSubmit}>
                        <label>
                            Full Name
                            <br/>
                            <input type="text" className="field-for-login" name="name" placeholder="Full Name" onChange={this.handleChangeName}/>
                        </label>
                        <br/>
                        <label>
                            Email
                            <br/>
                            <input type="text" className="field-for-login" name="name" placeholder="Email" onChange={this.handleChangeEmail}/>
                        </label>
                        <br/>
                        <label>
                            Password
                            <br/>
                            <input type="text" className="field-for-login" name="name" placeholder="Password" onChange={this.handleChangePassword}/>
                        </label>
                        <br/>
                        <input type="submit" className="button-login" value="Login"/>
                        <button className="button-registration" onClick={this.openRegistration}>Register</button>
                    </form>

                </div>
            )
        } else if(this.state.registration) {
            return (
                <div>
                    <Registration/>
                </div>
            )
        } else {
            return (
                <div>
                    <MainPage/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        dataUser: state
    }
}

export default connect(mapStateToProps)(Login);