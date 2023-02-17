import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructorReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers( { burgerConstructorReducer, userReducer });
