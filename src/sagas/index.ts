import { all, fork } from 'redux-saga/effects' 

import agentSagas from './agent-sagas'

export function* rootSaga(){
    console.log('root saga')
    yield all([
        ...agentSagas
    ]);
}