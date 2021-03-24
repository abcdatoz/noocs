import React, {useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCursos} from '../actions/CursoActions'
import {getMisCursos} from '../actions/MisCursosActions'
import {getVideoActividades} from '../actions/VideoActividadesActions'

import {getQuestions} from '../actions/QuestionActions'
import {getAnswers} from '../actions/AnswerActions'

import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'


const CursarCurso = () =>{

    const params = useParams()

    const dispatch = useDispatch()
     
    //selectors
    const cursos = useSelector(state => state.curso.lista)
    const miscursos = useSelector(state => state.miscursos.lista)
    const videoactividades = useSelector(state => state.videoactividades.lista)
    const { user } = useSelector( store => store.auth);

    //effects
    useEffect(() => {
        dispatch(getCursos())
        dispatch(getMisCursos())                 
        dispatch(getVideoActividades())

        dispatch(getQuestions())
        dispatch(getAnswers())
 
    }, [])
 
 

     return(

      
        <div> 
             
            <div className="circle-container">
                <div className="circle">
                    <Link to={`/PopQuiz/${params.cursoId}`} id="popquizz"> Hacer Test</Link> 
                </div>
            </div>

            

            {
                miscursos
                    .filter(x=>x.curso == params.cursoId)
                    .filter(y=>y.usuario == user.id)
                    .map( micurso => (
                        <div key={micurso.id}>

                            <h3>Videos</h3>
                            <div className="flexbox-container" >
                                {
                                    videoactividades
                                        .filter(x => x.curso == params.cursoId)
                                        .filter(y => y.tipo == 'videos')
                                        .map((item)=>(
                                            <div className="flexbox-item"> 
                                                <p>{item.nombre}</p> 
                                                <ReactPlayer
                                                    url={item.direccionURL}
                                                    className='react-player'
                                                    width='100%'
                                                    height='100%'
                                                />    
                                            </div>
                                        ))
                                }
                            </div>

                            <h3>Juegos</h3>
                            <div className="flexbox-container" >
                                {
                                    videoactividades
                                        .filter(x => x.curso == params.cursoId)
                                        .filter(y => y.tipo == 'juegos')
                                        .map((item)=>(
                                            <div className="flexbox-item"> 
                                                <p>{item.nombre}</p> 
                                                <ReactPlayer
                                                    url={item.direccionURL}
                                                    className='react-player'
                                                    width='100%'
                                                    height='100%'
                                                />    
                                            </div>
                                        ))
                                }
                            </div>

                            <h3>Actividades</h3>
                            <div className="flexbox-container" >
                                {
                                    videoactividades
                                        .filter(x => x.curso == params.cursoId)
                                        .filter(y => y.tipo == 'actividades')
                                        .map((item)=>(
                                            <div className="flexbox-item"> 
                                                <p>{item.nombre}</p> 
                                                <ReactPlayer
                                                    url={item.direccionURL}
                                                    className='react-player'
                                                    width='100%'
                                                    height='100%'
                                                />    
                                            </div>
                                        ))
                                }
                            </div>

                        </div>
                    ))
                
            }

            <Link to={`/`}>
                <span className="fa fa-arrow-left" className="btnLink">Regresar</span>
            </Link>

                
        </div>
    );
}



export default CursarCurso;