import { combineReducers } from '@reduxjs/toolkit';
import songReducer from './songSlice';

const rootReducer = combineReducers({
  song: songReducer,
});

export default rootReducer;
