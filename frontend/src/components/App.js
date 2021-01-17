import React, {  Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Redirect} from 'react-router-dom'


import { Provider } from 'react-redux'
import store from '../store'

import Header from './layout/Header'    

import Login from './accounts/Login'   
import Register from './accounts/Register'   
import PrivateRoute from './common/PrivateRoute'  



import Home from './Home'
import SweetHome from './SweetHome'
import BannerAdmin from './cruds/BannerAdmin'
import Municipio from './cruds/Municipio'
import Escuela from './cruds/Escuela'
import Curso from './cruds/Curso'
import VideoActividades from './cruds/VideoActividades' 
import Questions from './cruds/Question'


const App = () => {
    return (
        <Provider store={store}>            
            <Router> 
                <Fragment>
                    <Header /> 
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component = {Home} />
                            <Route exact path="/register" component = {Register} />
                            <Route exact path="/login" component = {Login} />

                            <PrivateRoute exact path="/sweet" component = {SweetHome} />
                            <PrivateRoute exact path="/cBanner" component = {BannerAdmin} />
                            <PrivateRoute exact path="/cMunicipio" component={Municipio} />
                            <PrivateRoute exact path="/cEscuela" component={Escuela} />
                            <PrivateRoute exact path="/cCurso" component={Curso} />
                            <PrivateRoute exact path="/cCursoVideoActividad/:cursoId/:tipo" component={VideoActividades} />
                            <PrivateRoute exact path="/cCursoQuestion/:cursoId" component={Questions} />
                             
                            
                        </Switch>
                        
                    </div>
                </Fragment>
            </Router>
        </Provider>

    )
}


ReactDOM.render(<App />, document.getElementById('app'))