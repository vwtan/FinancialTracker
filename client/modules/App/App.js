import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

import styles from './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  /* eslint react/prop-types: 0 */
  render() {
    return (
      <div className={styles.container}>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <Helmet
          title="Home"
          titleTemplate="%s - tracker"
        />
        <div className={styles.app}>
          {this.props.children }
        </div>
      </div>
    );
  }
}


export default connect()(App);
