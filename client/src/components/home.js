import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'
import SignIn from "./signin";
import SignUp from "./signup";

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Sports+</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <div className="outer">
              <div className="inner">
                <Switch>
                  <Route exact path='/' component={SignIn} />
                  <Route path="/sign-in" component={SignIn} />
                  <Route path="/sign-up" component={SignUp} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
    );
    }
}