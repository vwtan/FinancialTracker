import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.scss');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        {routes}
      </Router>
    </Provider>
  );
}

/* eslint react/forbid-prop-types: 0 */
App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
