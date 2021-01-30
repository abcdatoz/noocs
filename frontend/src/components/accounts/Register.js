import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register }  from '../../actions/auth'
import { getMunicipios } from '../../actions/MunicipioActions'
import { getEscuelas } from '../../actions/EscuelaActions'
 


export class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        password2:'',
        municipio:'',
        escuela:''
    }

    static propTypes = {
        register:PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool
    }


    onSubmit = e => {
        e.preventDefault();
        const {username, email,password, password2, municipio, escuela} = this.state;


        if(municipio == '' || municipio == null || escuela == '' || escuela == null){
            alert ('Necesitas seleccionar el municipio y escuela al que perteneces');
            return;
        }
        if(username == '' ||  password == ''){
            alert ('Los campos de usuario y contraseña son necesarios para registrarse');
            return;
        }


        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        
        if (!emailRegex.test(email)) {
            alert('El email no fue capturado correctamente')     
            return;
        }

        if(password !== password2){
            alert('Los passwords no coinciden')
        }else{
             const newUser = {username, password, email, municipio, escuela};
             this.props.register(newUser);              
        }
    }

    componentDidMount(){
        this.props.getMunicipios();    
        this.props.getEscuelas();
    }
 
    

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }
    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />; 
        }
        const { username, email, password, password2, municipio, escuela} = this.state;

        let {escuelas} = this.props
         console.log(escuelas)
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center"> Un nuevo ciudadanito digital esta por crearse </h2>
                    <form onSubmit={this.onSubmit}>


                        <div className="form-group">
                            <label>Municipio   {municipio}</label>
                            <select 
                                className="form-control"
                                name="municipio"
                                value={municipio}
                                onChange={this.onChange} >
                                <option value="null">Seleccione su municipio</option>                                
                                { this.props.municipios.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                                     
                        <div className="form-group">
                            <label>Escuela    </label>
                            <select 
                                className="form-control"
                                name="escuela"
                                value={escuela}
                                onChange={this.onChange}  >
                                <option value="null">Seleccione la escuela (ó biblioteca)</option>                                
                                { escuelas   
                                  .filter(x=> x.municipio == municipio)                                  
                                  .map(x => (
                                        <option key={x.id} value={x.id}>
                                            {x.nombre} - {x.municipio}: {municipio}
                                        </option>
                                    ))}
                            </select>
                        </div>


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
                            <label>E-mail</label>
                            <input 
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
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
                            <label>Conforme la Contraseña</label>
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
                                Registrar
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
    isAuthenticated:state.auth.isAuthenticated,
    municipios: state.municipio.lista,
    escuelas: state.escuela.lista
});

export default connect(mapSate,{register, getMunicipios,getEscuelas})(Register);


 
 