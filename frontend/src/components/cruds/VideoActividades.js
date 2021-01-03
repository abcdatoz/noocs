import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getVideoActividades,addVideoActividad,editVideoActividad,deleteVideoActividad} from '../../actions/VideoActividadesActions'
import {getCursos} from '../../actions/CursoActions'
import {useParams} from 'react-router-dom'

const VideoActividades = () => {
    const [curso, setCurso] = useState('')
    const [tipo, setTipo] = useState('')  
    const [orden, setOrden] = useState(0)  
    const [nombre, setNombre] = useState('')
    const [direccionURL, setDireccionURL] = useState('')
    const [id, setId] = useState('')
    const [mode, setMode] = useState('new')


    const videoactividades = useSelector(state => state.videoactividades.lista)
    const cursos = useSelector(state => state.curso.lista)

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(()=> {
        dispatch(getVideoActividades())
        dispatch(getCursos())
    },[])

    const agregar =()=>{
        setCurso('')
        setTipo('')
        setOrden(0)
        setNombre('')
        setDireccionURL('')
        setMode('new')
    }

    const editar = (item) => {
        setCurso(item.curso)
        setTipo(item.tipo)
        setOrden(item.orden)
        setNombre(item.nombre)
        setDireccionURL(item.direccionURL)
        setMode('edit')
        $('#MyModal').modal('show')
    }

    const guardar = (e) => {
        e.preventDefault()

        let data = {
            curso: parseInt(params.cursoId),
            tipo,
            orden,
            nombre,
            direccionURL
        }

        mode == 'new'
            ? dispatch(addVideoActividad(data))
            : dispatch(editVideoActividad(da,ta,id))
        
        $('MyModal').modal('hide')
    }

    const eliminar = () => {
        setId (item.id)
        $('MyConfirmation').modal('show')
    }
    
    const eliminarRegistro = () => {
        dispatch(deleteVideoActividad(id))
        $('MyConfirmation').modal('hide')

    }

  
    return(
        <>
            <h2>Actividades|Juegos|Videos</h2>

             

           
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
                                <label>Curso  </label>
                                <select 
                                    className="form-control"
                                    name="curso"
                                    value={curso}
                                    onChange={ e=> setCurso (e.target.value) } >                                    
                                    {cursos.filter(p => p.id === parseInt(params.cursoId)).map(x => (
                                    <option key={x.id} value={x.id}>
                                    {x.nombre}
                                    </option>
                                ))}
                                </select>
                            </div>




                                <div className="form-group">
                                    <label>Tipo</label>
                                    <select 
                                        className="form-control"
                                        name="tipo"
                                        value={tipo}
                                        onChange={ e=> setTipo (e.target.value) } >
                                        <option value="null">Seleccione el curso</option>
                                        <option value="actividad">Actividad</option>                                
                                        <option value="juegos">Juegos</option>                                
                                        <option value="videos">Videos</option>                                
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Orden</label>
                                    <input 
                                        className="form-control"
                                        type="number"
                                        placeholder="Introduzca el orden"
                                        name="orden"
                                        value={orden}
                                        onChange={ e => setOrden(e.target.value)}
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
                                    <label>Dirección URL</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca la dirección url"
                                        name="direccionURL"
                                        value={direccionURL}
                                        onChange={ e => setDireccionURL(e.target.value)}
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
                    <th>Tipo</th>
                    <th>Orden</th>
                    <th>Nombre</th>
                    <th>Dirección URL</th>
                    <th> </th> 
                </thead>     
                <tbody>
                    {
                        videoactividades.map(item=>(
                            <tr key={item.id}>
                                <td>{item.tipo}</td>
                                <td>{item.orden}</td>
                                <td>{item.nombre}</td>
                                <td>{item.direccionURL}</td>
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


export default VideoActividades;
