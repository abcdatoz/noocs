import React,{ useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCursos, addCurso, editCurso, deleteCurso} from '../../actions/CursoActions'
import { Link } from 'react-router-dom' 
 
const Curso =() =>{
    const [nombre, setNombre] = useState('')
    const [imagen, setImagen] = useState('')
    const [descripcionA, setDescripcionA] = useState('')
    const [descripcionB, setDescripcionB] = useState('')
    const [descripcionC, setDescripcionC] = useState('')

    const [mode, setMode] = useState('new')
    const [id, setId] = useState('')
     

    
    const auth = useSelector(state => state.auth)
    const cursos = useSelector(state => state.curso.lista)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCursos())
    }, [])


    const agregar = () => {
        setNombre('')
        setImagen('')
        setDescripcionA('')
        setDescripcionB('')
        setDescripcionC('')

        setMode('new')

    }
    

    const editar = (item)=>{
        setNombre(item.nombre)
        setDescripcionA(item.descripcionA)
        setDescripcionB(item.descripcionB)
        setDescripcionC(item.descripcionC)
        setId(item.id)
        setMode('edit')
        $('#MyModal').modal('show')
    }

    const guardar = (e) =>{
        e.preventDefault()

        if (nombre == '') {
            alert('No ha capturado el nombre de curso')
            return
        }
        if (imagen == '') {
            alert('No ha elegido la imagen del curso')
            return
        }
        if (descripcionA == ''){
            alert('No ha capturado la descripción del curso')
            return
        }
        


        let form_data = new FormData()
        form_data.append('nombre', nombre) 
        form_data.append('imagen', imagen, imagen.name)
        form_data.append('descripcionA', descripcionA) 
        form_data.append('descripcionB', descripcionB) 
        form_data.append('descripcionC', descripcionC) 
        form_data.append('updated_by', 'usuario : ' + auth.user.username)

 
        if (mode == 'new'){
            dispatch(addCurso(form_data))
            $('#MyModal').modal('hide')
        }

        if (mode == 'edit'){
            dispatch(editCurso(form_data,id))
            $('#MyModal').modal('hide')
        }
    }

    const eliminar = (item) => {
        setId(item.id)
        $('#MyConfirmation').modal('show')
    }

    const eliminarRegistro = () => {
        dispatch(deleteCurso(id))
        $('#MyConfirmation').modal('hide')
    }


   



    return (
        <>
            <h2>Cursos</h2>
            

            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#MyModal"
                onClick={agregar}
                >
                + Nuevo
            </button>


            <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
            
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Registro</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        
                            <form>
                                <div className="form-group">
                                    <label>*Nombre</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca el nombre del curso"
                                        name="nombre"                                    
                                        onChange = { e => setNombre(e.target.value)  }
                                        value={nombre}                                                                         
                                    />
                                </div>

                                <div className="form-group">
                                    <label>*Imagen</label>
                                    <input 
                                        className="form-control"
                                        type="file"
                                        name="imagen"
                                        accept="image/png, image/jpeg"
                                        onChange = { e => setImagen(e.target.files[0])}
                                        required
                                    />
                                </div>


                                <div className="form-group">
                                    <label>*Descripción A</label>                                
                                    <textarea 
                                        className="form-control"
                                        name="descripcionA"
                                        placeholder="Introduzca la descripción A del curso"
                                        rows="4"
                                        onChange={ e => setDescripcionA(e.target.value)}
                                        value={descripcionA}>
                                    </textarea>                                 

                                </div>
                                <div className="form-group">
                                    <label>Descripción B (opcional)</label>                                
                                    <textarea 
                                        className="form-control"
                                        name="descripcionB"
                                        placeholder="Introduzca la descripción B del curso"
                                        rows="4"
                                        onChange={ e => setDescripcionB(e.target.value)}
                                        value={descripcionB}>
                                    </textarea>                                 

                                </div>
                                <div className="form-group">
                                    <label>Descripción C</label>                                
                                    <textarea 
                                        className="form-control"
                                        name="descripcionC"
                                        placeholder="Introduzca la descripción C del curso"
                                        rows="4"
                                        onChange={ e => setDescripcionC(e.target.value)}
                                        value={descripcionC}>
                                    </textarea>                                 

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
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Descripción A</th>                    
                    <th>Actividades</th>
                    <th>Juegos</th>
                    <th>Videos</th>
                    <th>Quizz</th>

                    <th> </th> 
                </thead>     
                <tbody>
                    {
                        cursos.map(item=>(
                            <tr key={item.id}>
                                <td><img src={item.imagen}  alt="foto" width="120px" height="120px"/> </td>
                                <td>{item.nombre}</td>
                                <td>{item.descripcionA}</td>
                                 <td>  
                                    <Link to={`/cCursoVideoActividad/${item.id}/actividades`}>
                                        <span className="fa fa-group" aria-hidden="true">.</span>
                                    </Link>                                    
                                 </td>
                                 <td>  
                                    <Link to={`/cCursoVideoActividad/${item.id}/juegos`}>
                                        <span className="fa fa-gamepad" aria-hidden="true"></span>
                                    </Link>                                    
                                 </td>
                                 <td>  
                                    <Link to={`/cCursoVideoActividad/${item.id}/videos`}>
                                        <span className="fa fa-play-circle" aria-hidden="true"></span>
                                    </Link>                                    
                                 </td>
                                 <td>  
                                    <Link to={`/cCursoQuestion/${item.id}`}>
                                        <span className="fa fa-tasks" aria-hidden="true"></span>
                                    </Link>                                    
                                 </td>
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
                    

            <div className="modal fade" id="MyConfirmation" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    )

}


export default Curso;
