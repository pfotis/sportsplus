import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {
    constructor() {
		super()
		this.state = {
            firstname: '',
            lastname: '',
			email: '',
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
		console.log('sign-up handleSubmit, email: ')
		console.log(this.state.email)
		event.preventDefault()

		//request to server to add a new email/password
		axios.post('/user/', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password,
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg && (this.state.password == this.state.confirmPassword)) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('email already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } 
        else {
            return (
                <form>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="First name"
                            name="firstname"
                            value={this.state.firstname}
							onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Last name" 
                            name="lastname"
                            value={this.state.lastname}
							onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            name="email"
                            value={this.state.email}
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

                    <button 
                        type="submit" 
                        className="btn btn-dark btn-lg btn-block"
                        onClick={this.handleSubmit}
                    >Register</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">log in?</a>
                    </p>
                </form>
            );
        }
    }
}