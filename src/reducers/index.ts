import { combineReducers, Reducer } from 'redux';
import { Map } from 'immutable'

import { appReducer } from './app-reducer';
import { agentReducer } from './agent-reducer';

export interface RootState{
    app: Map<any,any>,
    agent: Map<any,any>
}

export const rootReducer = combineReducers({
    app: appReducer,
    agent: agentReducer
});