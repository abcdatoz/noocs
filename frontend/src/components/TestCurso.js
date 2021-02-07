import React, {useState, useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCursos} from '../actions/CursoActions'
import {getMisCursos} from '../actions/MisCursosActions'
import {Link, useParams} from 'react-router-dom'
 


const TestCurso = () =>{

    const params = useParams()

    const dispatch = useDispatch()
     
    //selectors
    const miscursos = useSelector(state => state.miscursos.lista)
    const answers = useSelector(state => state.answer.lista)
    const questions = useSelector(state => state.question.lista)
    const { user } = useSelector( store => store.auth);
     
 

    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState([])

    const [preguntasCorrectas, setPreguntasCorrectas] = useState(0)


    //effects
    useEffect(() => {
        dispatch(getCursos())
        dispatch(getMisCursos())                  
        
        let p = []
        let r=[]
        let arr =[]


        questions.forEach(element => {
            if (element.curso == params.cursoId)
                p.push(element)
        });

        //unsort questions
        arr = p

        let i = arr.length;
        while(i--){
            let j = Math.floor( Math.random() * (i+1) );
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        } 
        
        p = arr;


        

        answers.forEach(element => {
            if(element.question.curso == params.cursoId)
                r.push(element)
        });

        
        //unsort answers
        arr = r
        i = arr.length;
        while(i--){
            let j = Math.floor( Math.random() * (i+1) );
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }         
        r = arr;

        setPreguntas(p)
        setRespuestas(r)        
    }, [])
 
    
    //useStates
    
    const [numero, setNumero] = useState(0)


    const siguiente = () =>{
        
        let x = numero +1
        setNumero(x)
    }

    return(

      
        <div> 

            {
                miscursos
                    .filter(x=>x.curso == params.cursoId)
                    .filter(y=> y.usuario == user.id)
                    .map( micurso => (
                        <div key={micurso.id}>
                            
                            <h3>Pop Quizz</h3>
                            <div className="ask-container" >


                            {
                                numero < preguntas.length
                                    ? null
                                    : (
                                        <div>
                                            Tuviste {preguntasCorrectas} correctas de {preguntas.length}
                                        </div>
                                    )
                            }
                            

                            {


                                preguntas
                                    .map((ask, askIndex)=>(

                                        numero != askIndex
                                        ? null
                                        :  (
                                            <div> 

                                                <p>{ask.pregunta}</p>
                                          
                                                <ol>
                                                {
                                                    respuestas            
                                                        .filter (x => x.question.id == ask.id)                            
                                                        .map ((item) =>(

                                                            
                                                            <li key={item.id}>                                                                  
                                                                <button 
                                                                    type="button"                                                                     
                                                                    className="btn-answer"
                                                                    onClick={() => { 

                                                                        item.es_correcta 
                                                                            ? setPreguntasCorrectas(preguntasCorrectas+1)
                                                                            : console.log('wrong')
                                                                            
                                                                        
                                                                        setNumero(numero + 1)
                                                                    }}
                                                                >

                                                                    {item.opcion}  
                                                                </button>                                                                 
                                                            </li>
                                                    
                                                        ))
                                                }

                                                </ol>
        
                                            </div>
                                            )
                                ))
                            }

                            </div>
                            

                            

                        </div>
                    ))
                
            }

    
        <Link to={`/CursarCurso/${params.cursoId}`} className="btnLink"> Regresar</Link>

                
        </div>
    );
}



export default TestCurso;