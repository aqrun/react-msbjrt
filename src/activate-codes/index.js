import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';

import { App } from './app'
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export function ActivateCodesModule(){
    render(
        <Provider store={store}>
            <App/>  
        </Provider>, document.getElementById('content_wrapper'));
}