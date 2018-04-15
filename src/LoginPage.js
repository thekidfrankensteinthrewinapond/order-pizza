import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { host } from './config';
import './forms.css';
import './LoginPage.css';

export default class extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    return fetch(`${host}/api/session`, {
      credentials: 'same-origin',
      body: '',
      method: 'POST'
    })
    .then(r => r.json())
    .then(() => {
      this.props.history.push('/');
      this.props.onLogin();
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login | Order Pizza</title>
          <meta name="description" content="Login to order a pizza" />
        </Helmet>

        <h1>Login</h1>

        <form className="Login-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" name="login" placeholder="user@example.com"/>
          </fieldset>

          <fieldset>
            <input type="password" name="password" placeholder="password"/>
          </fieldset>


          <button type="submit" className="primary">Login</button>
        </form>
      </div>
    )
  }
}
