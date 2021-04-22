import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to ={{ pathname: this.state.redirectTo }} />
        }
        else {
            return (
                <form>

                    <h3>Log in</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email"
                            name="username"
                            className="form-control" 
                            placeholder="Enter email"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-dark btn-lg btn-block"
                        onClick={this.handleSubmit}
                    >Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            );
        }
    }
}