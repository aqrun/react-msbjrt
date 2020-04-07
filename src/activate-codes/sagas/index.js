import { all, fork } from 'redux-saga/effects' 
import appSagas from './app-sagas';
import modalSagas from './modal-sagas';

export function* rootSaga(){
    yield all([
        ...appSagas,
        ...modalSagas,
    ]);
}
