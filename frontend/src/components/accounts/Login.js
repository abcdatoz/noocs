import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login }  from '../../actions/auth'



export class Login extends Component {
    state = {
        username:'',        
        password:''
    }

    static propTypes = {
        login:PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();

        const {username, password} = this.state;

        if(username == '' ||  password == ''){
            alert ('El usuario y contraseña son necesarios para loguearse');
            return;
        }

        this.props.login(username, password)
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }
    render() {
        if(this.props.isAuthenticated){
            return<Redirect to ="/" />;
        }

        const { username,password} = this.state;
         
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Entrar a Ciudadania Digital</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />                            
                        </div>
 

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />                            
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Entrar
                            </button>
                        </div>
                        <p>
                        <br/>
                        <br/>

                            ¿Aún no tienes cuenta? <br/>
                            <Link to="/register">Registrate</Link> y diviertete aprendiendo
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapSate = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapSate,{login})(Login);
 







/*

import React, { useState } from 'react'
import { Redirect, Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login }  from '../../actions/auth'



const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()    
    

    onSubmit = e => {
        e.preventDefault();
        dispatch (login(username, password));
    }

    switch (auth.isAuthenticated){
        case true:
            return<Redirect to ="/" />;
            break;
        case false:
            return (
                <>
                    <div className="col-md-6 m-auto">
                        <div className="card card-body mt-5">
                            <h2 className="text-center">Acceso al panel de administración</h2>
                            <form >
                                <div className="form-group">
                                    <label>Usuario</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        onChange = { e => setUsername(e.target.value)  }
                                        value={username}
                                    />                            
                                </div>
        
        
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange = { e => setPassword(e.target.value) }
                                        value={password}
                                    />                            
                                </div>
        
        
                                <div className="form-group">
                                    <button onClick={onSubmit} className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                                <p>
                                    ¿No tienes cuenta?<Link to="/register">Registrate</Link>
                                </p>
        
                            </form>
                        </div>
                    </div>
                </>
            )
            break;

        default:
            return null;    
    }    
}

 
export default Login;
 
*/



 