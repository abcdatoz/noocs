import React, {useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCursos} from '../actions/CursoActions'
import {getMisCursos} from '../actions/MisCursosActions'
import {getVideoActividades} from '../actions/VideoActividadesActions'
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
 
    }, [])
 
    const filtrar = (elemento) =>{

        let res = miscursos.find(x => {  return x.curso == elemento.curso.id; });
            

    }

     return(

      
        <div> 

            <Link to={`/`}>
                <span className="fa fa-arrow-left" aria-hidden="true">Regresar</span>
            </Link>

            {
                miscursos
                    .filter(x=>x.curso == params.cursoId)
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

            

                
        </div>
    );
}



export default CursarCurso;