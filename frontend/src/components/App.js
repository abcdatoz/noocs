import React, {  Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home'

import { Provider } from 'react-redux'
import store from '../store'

import Header from './layout/Header'    


/*
import { Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Alerts from './layout/Alerts'   

import Login from './accounts/Login'   
import Register from './accounts/Register'   
import PrivateRoute from './common/PrivateRoute'  

import { loadUser } from '../actions/auth'

import Medidas from './medidas'
import Grupos from './grupos'
import Productos from './productos'
import Departamentos from './departamentos/Dashboard'
import Posts from './posts'

const alertOptions = {
    timeout:3000,
    position:'top center'
}
*/

const App = () => {
    return (
        <Provider store={store}>            
            <Router> 
                <Fragment>
                    <Header /> 
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component = {Home} />

                        </Switch>
                        
                    </div>
                </Fragment>
            </Router>
        </Provider>
)
}


ReactDOM.render(<App />, document.getElementById('app'))