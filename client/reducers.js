import { combineReducers } from 'redux';

// Import Reducers
import dummy from './modules/Dummy/DummyReducer';

// Combine all reducers into one root reducer

export default combineReducers({
  dummy,
});
