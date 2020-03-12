import { fromJS, Map } from 'immutable';
import * as types from '../constants/app-constants';

let initRoutes = [
    {id:1, name: 'DASHBOARD', url: '/dashboard', icon:'dashboard'},
    {id:2, name: 'AGENT', url: '/agent', icon: 'relation'},
    {id:3, name: 'MY CRUISE', url: '/my-cruise', icon: 'boat'},
    {id:4, name: 'HTLP', url: '/htlp', icon: 'help'},
]


const inintialState = fromJS({
    routes: initRoutes
});

export const appReducer = (
    state=inintialState,
    action:any
):Map<any,any> => {
    //console.log('reducer action', action)
    switch( action.type ) {
        
        default:
            return state;
    }
}
