import React,{ useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getQuestions, addQuestion,editQuestion,deleteQuestion } from '../../actions/QuestionActions'
import { getAnswers} from '../../actions/AnswerActions'
import {Link, useParams} from 'react-router-dom'
import { getCursos } from '../../actions/CursoActions'
 

const Question = () => {

    
    const [inciso, setInciso] = useState('')
    const [pregunta, setPregunta] = useState('')
    const [respuesta, setRespuesta] = useState('')
    const [opcionB, setOpcionB] = useState('')
    const [opcionC, setOpcionC] = useState('')
    const [opcionD, setOpcionD] = useState('')

    const [id, setId] = useState('')
    const [mode, setMode] = useState('new')

    const listaPreguntas = useSelector(state => state.question.lista)
    const listaRespuestas = useSelector(state => state.answer.lista)
    const listaCursos = useSelector(state => state.curso.lista)

    const dispatch = useDispatch()

    const params = useParams()

    useEffect(() => {
        dispatch(getQuestions())
        dispatch(getAnswers())
        dispatch(getCursos())
        
    }, [])

    const agregar = () =>{

        setInciso('')
        setPregunta('')
        setRespuesta('')
        setOpcionB('')
        setOpcionC('')
        setOpcionD('')

        setMode('new')
    }

    const editar = (item)=>{

        setInciso (item.inciso);
        setPregunta(item.pregunta)

        let ans = listaRespuestas.filter(x=>x.question.id === item.id)
        setRespuesta(ans[0].opcion)
        setOpcionB(ans[1].opcion)
        setOpcionC(ans[2].opcion)
        setOpcionD(ans[3].opcion)

        setId(item.id)
        setMode('edit')
        $('#MyModal').modal('show')
    }

    const guardar = (e) =>{
        e.preventDefault()


        let data = {
            curso: parseInt(params.cursoId),
            inciso,
            pregunta,
            respuesta,
            opcionB,
            opcionC,
            opcionD
        }
 
        if (mode == 'edit'){
            dispatch(deleteQuestion(id))            
        }

        dispatch(addQuestion(data))        
        $('#MyModal').modal('hide')

    }

    const eliminar = (item) => {
        setId(item.id)
        $('#MyConfirmation').modal('show')
    }

    const eliminarRegistro = () => {
        dispatch(deleteQuestion(id))
        $('#MyConfirmation').modal('hide')

    }

    return (
        <>
        <h2>
        Quizz | {listaCursos.filter(p=>p.id === parseInt(params.cursoId))[0].nombre}  
        </h2>
        
         

       
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
                                <label>Inciso</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca el inciso"
                                    name="inciso"
                                    value={inciso}
                                    onChange={ e => setInciso(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pregunta</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca la pregunta"
                                    name="pregunta"
                                    value={pregunta}
                                    onChange={ e => setPregunta(e.target.value)}
                                />
                            </div> 


                            <div className="form-group">
                                <label>Respuesta</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca la respuesta"
                                    name="respuesta"
                                    value={respuesta}
                                    onChange={ e => setRespuesta(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Opción B</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca la opción B"
                                    name="opcionB"
                                    value={opcionB}
                                    onChange={ e => setOpcionB(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Opción C</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca la opción C"
                                    name="opcionC"
                                    value={opcionC}
                                    onChange={ e => setOpcionC(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Opción D</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca la opción D"
                                    name="opcionD"
                                    es una        value={opcionD}
                                    onChange={ e => setOpcionD(e.target.value)}
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
                <th>Inciso</th>
                <th>Pregunta</th>
                <th>Respuesta</th>
                <th>Opción B</th>
                <th>Opción C</th>
                <th>Opción D</th>
                <th> </th> 
            </thead>     
            <tbody>
                {
                    listaPreguntas
                        .filter(x => x.curso === parseInt(params.cursoId) )
                        .map(item=>(
                        <tr key={item.id}>
                            <td>{item.inciso}</td>
                            <td>{item.pregunta}</td>
                            {
                                listaRespuestas
                                    .filter (x=> x.question.id === item.id)
                                    .map (y => (
                                        <td>{y.opcion}</td>
                                    ))
                            }
                           
                           
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

         

        <Link to={`/cCurso`}>
            <span className="fa fa-arrow-left" aria-hidden="true">Regresar</span>
        </Link>    

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


export default Question;