import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructorReducer';
import { userReducer } from './userReducer';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({ burgerConstructorReducer, userReducer, wsReducer });
