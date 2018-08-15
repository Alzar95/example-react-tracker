import React, { Component } from 'react';
import { registrationUser } from '../actions/index';
import Login from './Login';
import './Registration.css';

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'Manager',
            posts: [],
            showMessage: false,
            login: false,
            defaultValue: 'Manager'
        };

        this.openLogin = this.openLogin.bind(this);
    }

    openLogin() {
        this.setState({login: true});
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

    handleChangeRole = event => {
        this.setState({ role: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ showMessage: true });

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };

        registrationUser(user);
    };

    render() {
        if(!this.state.showMessage && !this.state.login) {
            return (
                <div className="registration-block">
                    <h2 className="registration-header">Registration</h2>
                    <form className="forms-for-filling-registration" method="post" action="/"
                          onSubmit={this.handleSubmit}>
                        <label>
                            Full Name
                            <br/>
                            <input type="text" className="field-for-registration" name="name" placeholder="Full Name" onChange={this.handleChangeName}/>
                        </label>
                        <br/>
                        <label>
                            Email
                            <br/>
                            <input type="text" className="field-for-registration" name="name" placeholder="Email" onChange={this.handleChangeEmail}/>
                        </label>
                        <br/>
                        <label>
                            Password
                            <br/>
                            <input type="text" className="field-for-registration" name="name" placeholder="Password" onChange={this.handleChangePassword}/>
                        </label>
                        <br/>
                        <label>
                            Choose role
                            <br/>
                            <select className="field-for-choose-role" onChange={this.handleChangeRole}>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                            </select>
                        </label>
                        <br/>
                        <input type="submit" className="button-ok" value="OK"/>
                        <a className="link-for-open-login" onClick={this.openLogin}>Cancel</a>
                    </form>

                </div>
            )
        } else if(this.state.login) {
            return (
                <div>
                    <Login/>
                </div>
                )
        } else {
            return (
                <div>
                    <h2 className="information-message">Go to the link that went to your e-mail, for verification!</h2>
                </div>
            )
        }
    }
}

export default Registration;