import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  renderLogin() {
    switch (this.props.auth) {
      case null: 
        return <div />;
      case false: 
        return <a href="/auth/spotify">Login</a>;
      default:
        return <a href="/auth/logout">Logout</a>;  
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
    auth
  };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
