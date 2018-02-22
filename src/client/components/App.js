import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { renderRoutes } from 'react-router-config';
import { fetchCurrentUser } from '../actions';

class App extends Component {
  renderLogin() {
    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <a href="/auth/spotify">Login</a>;
      default:
        return (
          <div>
            <div>hello, { this.props.auth.username }</div>
            <a href="/auth/logout">Logout</a>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <h1>SSR REACT!!!</h1>
        <button onClick={() => console.log('clicked')}>Click Me!</button>
        { this.renderLogin() }
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
