import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getMunicipios, addMunicipio,editMunicipio, deleteMunicipio} from '../../actions/MunicipioActions'



const Municipio = () =>{
    
    const [clave, setClave] = useState('');
    const [nombre,setNombre] = useState('');
    const [id,setId] = useState('');
    const [mode, setMode] = useState('new');
    
    const auth = useSelector(state => state.auth);
    const municipios =useSelector(state => state.municipio.lista);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMunicipios());
    },[])



    const agregar = () => {
        setClave('');
        setNombre('');
        setMode('new');
    }

    const editar = (item)=>{
        setClave(item.clave);
        setNombre(item.nombre);
        setId(item.id);
        setMode('edit');
        $('#MyModal').modal('show');
    }

    const guardar = (e) => {

        e.preventDefault();

        let data = {
            clave, 
            nombre,
            status: 1,
            updated_by: 'user:' + auth.user.username
        };
        

        mode == 'new'
            ? dispatch(addMunicipio(data))
            : dispatch(editMunicipio(data,id))

        $('#MyModal').modal('hide');
    }

    const eliminar = (item) => {
        setId(item.id);
        $('#MyConfirmation').modal('show');
    }
    
    const eliminarRegistro = () => {
        dispatch(deleteMunicipio(id));
        $('#MyConfirmation').modal('hide');        
    }

  
    return(
        <>
            <h2>Municipios</h2>


            
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
                    <th> </th> 
                </thead>     
                <tbody>
                    {
                        municipios.map(item=>(
                            <tr key={item.id}>
                                <td>{item.clave}</td>
                                <td>{item.nombre}</td>
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

export default Municipio;