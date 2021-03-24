import React, {useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCursos} from '../actions/CursoActions'
import {getVideoActividades} from '../actions/VideoActividadesActions'
import {addMiCurso} from '../actions/MisCursosActions' 
import {Link, useParams, useHistory} from 'react-router-dom'



const VerCurso = () =>{

    const params = useParams()

    const dispatch = useDispatch()
     
    //selectors
    const cursos = useSelector(state => state.curso.lista)
    const videoactividades = useSelector(state => state.videoactividades.lista)
    const { user} = useSelector( store => store.auth);

    //effects
    useEffect(() => {
        dispatch(getCursos())                 
        dispatch(getVideoActividades())
 
    }, [])

    let history = useHistory()
 


    const tomarCurso = (id) =>{
        let registro = JSON.stringify({
            usuario: user.id,
            curso: id
        });       
        
        dispatch(addMiCurso(registro));

        history.push('/CursarCurso/'+id)

         
    }

    const regresar = () => {
        history.push('/')
    }
 
    return(
        <div> 
             
             
             

            {    
                cursos      
                .filter(x=>x.id == params.cursoId)          
                .map((each, index) => (  
                     
                    <>
                    
                    <div className="flexbox-container" key={index}>

                        <div  className="curso-item">                            
                            <img src={each.imagen} style={{width: "100%"}} />                                                                        

                            <h3>{each.nombre} </h3> 
                            <ul>
                                <li>videos : {videoactividades.filter(x=>x.curso == params.cursoId && x.tipo == 'videos').length} </li>
                                <li>Juegos : {videoactividades.filter(x=>x.curso == params.cursoId && x.tipo == 'juegos').length} </li>
                                <li>Actividades : {videoactividades.filter(x=>x.curso == params.cursoId && x.tipo == 'actividades').length} </li>                 
                            </ul>


                            <button  onClick={()=> tomarCurso(params.cursoId)} style={{width:"50%"}} >
                                Tomar Curso
                            </button> 
                            
                            <br /> 

                          


                            <button  onClick={()=> regresar()} style={{width:"50%"}} >
                                Regresar
                            </button> 

                
                        </div>                                 

                        <div  className="curso-item">                                
                            <h3>{each.nombre} </h3> 
                            <p>{each.descripcionA}</p>
                        </div>                   

                        {
                            each.descripcionB.length > 0 
                            ? (
                                <div  className="curso-item">    
                                    <p>{each.descripcionB}</p>
                                </div>
                            )
                            : null
                        }

                        {
                            each.descripcionC.length > 0
                            ?(
                                <div  className="curso-item">    
                                    <p>{each.descripcionC}</p>
                                </div>
                            )
                            : null
                        }
                                           
                                           

                                             
                    </div>   
                     
                        
                    </>
                      
                        
                ))
            }
        </div>
    );
}



export default VerCurso;