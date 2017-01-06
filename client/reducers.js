import { combineReducers } from 'redux';

// Import Reducers
import dummy from './modules/Dummy/DummyReducer';
import auth from './modules/User/UserReducer';
// Combine all reducers into one root reducer

export default combineReducers({
  dummy,
  auth,
});
