import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register }  from '../../actions/auth'



export class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        password2:''
    }

    static propTypes = {
        register:PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool
    }


    onSubmit = e => {
        e.preventDefault();
        const {username, email,password, password2} = this.state;

        if(password !== password2){
            alert('Los passwords no coinciden')
        }else{
             const newUser = {username, password, email};
             this.props.register(newUser);
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }
    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />; 
        }
        const { username, email, password, password2} = this.state;
         
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />                            
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />                            
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />                            
                        </div>

                        <div className="form-group">
                            <label>Confirm password</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />                            
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            ¿Ya tienes una cuenta?<Link to="/login">Entrar</Link>
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

export default connect(mapSate,{register})(Register);


 


/*import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register }  from '../../actions/auth'

const Register =()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    onSubmit = e =>{
      e.preventDefault();
      
      if (password!==password2){
        alert('Los Passwords no coinciden');
      }else{
        const newUser = {username, password, email};
        dispatch(register(newUser));
      }
    }

    switch(auth.isAuthenticated){
        case true:
            return <Redirect to="/" />;
            break;
        case false:
            return (
                <>
                    <div className="col-md-6 m-auto">
                        <div className="card card-body mt-5">
                            <h2 className="text-center">Register</h2>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        onChange={ e => setUsername(e.target.value)}
                                        value={username}
                                    />                            
                                </div>
        
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        onChange={e=> setEmail(e.target.value)}
                                        value={email}
                                    />                            
                                </div>
        
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={e=>setPassword(e.target.value)}
                                        value={password}
                                    />                            
                                </div>
        
                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        onChange={e=>setPassword2(e.target.value)}
                                        value={password2}
                                    />                            
                                </div>
        
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                                <p>
                                    ¿Ya tienes una cuenta?<Link to="/login">Entrar</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </>
            )

        default:
            return null;
    }
 
}

export default Register;



 */