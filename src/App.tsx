import React, { useEffect, useContext } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './reducers'
//import logo from './logo.svg';
import './styles/app.scss';
import {
  Agent,
  Dashboard,
  Htlp,
  MyCruise
} from './pages'
import {
  HistoryList,
  Navigation,
  Footer,
  Header
} from './components'

export function App() {
  let state = useSelector((state:RootState)=>state.app)
  let history = useHistory()
  //let win:any = window
  //win.s = history

  useEffect(()=>{
    if(history.location.pathname === '/'){
      history.push('/agent')
    }
  })

  return (
    <div className="main-container" id="main-container">
      <Header/>
      <div className="content-w max-width">
        <div className="side-a">
          <Navigation routes={state.get('routes')}/>
          <HistoryList />
        </div>
        <div className="side-a1"></div>
        <div className="main">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/agent" component={Agent} />
            <Route path="/htlp" component={Htlp} />
            <Route path="/my-cruise" component={MyCruise} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  )
}

