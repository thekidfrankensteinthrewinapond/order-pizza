import React, { Component } from 'react';
import { host } from './config';
import LoginPage from './LoginPage';
import OrderPage from './OrderPage';
import { PageCacheProvider } from 'react-renderhare';
import { Route, Link } from 'react-router-dom';
import './App.css';

function LoginButton({loggedIn, logout}) {
  if(loggedIn) {
    return <button className="login" onClick={logout}>Logout</button>
  } else {
    return <Link to="/login" className="login">Login</Link>
  }
}

function getSession() {
  let opts = { credentials: 'same-origin' };
  return fetch(`${host}/api/session`, opts).then(r => r.json());
}

class App extends Component {
  constructor() {
    super();
  }

  changeLoginState(loggedIn) {
    let { invalidate } = this.state;
    if(loggedIn === false) {
      fetch(`${host}/api/session`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(r => r.text())
      .then(invalidate);
    } else {
      invalidate();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Order Pizza <span role="img" aria-label="Pizza">🍕</span></h1>

          <nav>
            <PageCacheProvider cacheKey="session" fetch={getSession}
              invalidate={invalidate => this.setState({ invalidate })}
              render={({loggedIn}) => (
                <LoginButton loggedIn={loggedIn} logout={() => this.changeLoginState(false)}/>
              )}
            />
          </nav>
        </header>

        <Route exact path="/" render={() =>
          <OrderPage />
        } />
        <Route path="/login" render={({history}) =>
          <LoginPage onLogin={() => this.changeLoginState(true)} history={history} />
        } />
      </div>
    );
  }
}

export default App;
