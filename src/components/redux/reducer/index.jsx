import Status from './loginStatus';
import { combineReducers } from 'redux';

const rootreducer = combineReducers({
  status: Status,
});
export default rootreducer;
