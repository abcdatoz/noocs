import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getEscuelas, addEscuela,editEscuela,deleteEscuela} from '../../actions/EscuelaActions'
import {getMunicipios} from '../../actions/MunicipioActions'


const Escuela = () => {

    const [clave, setClave] = useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [id, setId] = useState('')
    const [mode, setMode] = useState('new') 


    const auth = useSelector(state => state.auth)
    const escuelas = useSelector(state => state.escuela.lista)
    const municipios = useSelector(state => state.municipio.lista)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEscuelas())
        dispatch(getMunicipios())
    }, [])


    const agregar = () => {
        setClave('')
        setNombre('')
        setDireccion('')
        setMunicipio('')
        setMode('new');
    }

    const editar = (item)=>{
        setClave(item.clave)
        setNombre(item.nombre)
        setDireccion(item.direccion)
        setMunicipio(item.municipio)        
        setId(item.id)
        setMode('edit')
        $('#MyModal').modal('show')
    }

    const guardar = (e) => {

        e.preventDefault();

        let data = {
            clave, 
            nombre,
            direccion,
            municipio,
            status: 1,
            updated_by: 'user:' + auth.user.username
        };
        

        mode == 'new'
            ? dispatch(addEscuela(data))
            : dispatch(editEscuela(data,id))

        $('#MyModal').modal('hide');
    }

    const eliminar = (item) => {
        setId(item.id);
        $('#MyConfirmation').modal('show');
    }
    
    const eliminarRegistro = () => {
        dispatch(deleteEscuela(id));
        $('#MyConfirmation').modal('hide');        
    }

  
    return(
        <>
            <h2>Escuelas</h2>

           
            <button 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target="#MyModal" 
                onClick={agregar}
                >
                + Nuevo
            </button>
            
            <div className="modal fade" id="MyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Registro</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
            
                        <form>
                                <div className="form-group">
                                    <label>Clave</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca la clave"
                                        name="clave"
                                        value={clave}
                                        onChange={ e => setClave(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca el nombre"
                                        name="nombre"
                                        value={nombre}
                                        onChange={ e => setNombre(e.target.value)}
                                    />
                                </div>
 

                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca la dirección"
                                        name="direccionn"
                                        value={direccion}
                                        onChange={ e => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Municipio  {municipio} </label>
                                    <select 
                                        className="form-control"
                                        name="municipio"
                                        value={municipio}
                                        onChange={ e=> setMunicipio (e.target.value) } >
                                        <option value="null">Seleccione su municipio</option>                                
                                        {municipios.map(x => (
                                        <option key={x.id} value={x.id}>
                                        {x.nombre}
                                        </option>
                                    ))}
                                    </select>
                                </div>




                            </form>
            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={guardar}>Guardar</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>


            <table className="table table-striped">
                <thead>
                    <th>Clave</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th> </th> 
                </thead>     
                <tbody>
                    {
                        escuelas.map(item=>(
                            <tr key={item.id}>
                                <td>{item.clave}</td>
                                <td>{item.nombre}</td>
                                <td>{item.direccion}</td>
                                <td>
                                    <button  onClick={() => editar(item)} className="btn btn-default btn-lg" >
                                        <span className="fa fa-edit" aria-hidden="true"></span>
                                    </button>
                                
                                     <button  onClick={() => eliminar(item)} className="btn btn-default btn-lg" >
                                        <span className="fa fa-trash" aria-hidden="true"></span>
                                    </button>

                                     

                                </td>
                            </tr>
                        ))
                    }                               
    
                </tbody>
            </table>
                    

            <div className="modal fade" id="MyConfirmation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Noocs</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    ¿Esta seguro de eliminar el registro
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={eliminarRegistro}>Eliminar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
            </div>


        </>
    );

 
    
         

}


export default Escuela;