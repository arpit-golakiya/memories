import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import pins from "./pins";

export const reducers = combineReducers({ posts, auth, pins });
