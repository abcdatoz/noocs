import React, { useState,useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBanners} from '../actions/BannerActions'
import {getCursos} from '../actions/CursoActions'
import {getMisCursos} from '../actions/MisCursosActions' 
import {Link} from 'react-router-dom'


const Home = () => {

    const dispatch = useDispatch()

    const banners = useSelector(state => state.banner.lista)
    const cursos = useSelector(state => state.curso.lista)
    const miscursos = useSelector( state => state.miscursos.lista)
 
    const {isAuthenticated, user} = useSelector( store => store.auth);


    const [cursosPendientes, setCursosPendientes] = useState([])
    const [cursosTomados, setCursosTomados] = useState([])
     
    useEffect(() => {
        dispatch(getCursos())
        dispatch(getBanners())
        dispatch(getMisCursos())
       
         
    }, [])

   
  
     
    
    const guestOption = (
        <>
        <h2><span>Noocs</span></h2>
        <div className="flexbox-container">
        {    
            cursos
                .map((item, index) => (  
                <div   key={index} className="main-item">    
                    <img src={item.imagen} style={{width: "100%"}}  />    
                    <p>{item.descripcionA}</p>                   
                    
                    <h3>{item.nombre} </h3>                            
                </div>                                 
                    
            ))
        }
        </div>   


        <div className="flexbox-container">
        {    
        /*    banners.map((each, index) => (  
            <div   key={index}>                           
                <img src={each.imagen} style={{width: "100%"}} />
                <h3>{each.titulo} </h3>                                            
            </div>                                 
                
        ))
        */
        }
        </div>
        </>
    )  


    const userOption = (
        <>
            <h2><span> Mis Noocs</span></h2>
            <div>
                
                <div className="flexbox-container">

                {
                    cursos
                        .filter(x=> {
                            
                            let arr = [];

                            if (user){
                                arr = miscursos
                                        .filter (x=> x.usuario == user.id)
                                        .map (x => {  return x.curso }) 
                            }

                            
                            let res = arr.find(y => {  return y == x.id; });
                            return res != undefined;

                        })
                        .map((item) => (                            
                            <div className = "flexbox-item" key={item.id}>
                                <h3>{item.nombre}</h3>
                                <img src={item.imagen} style={{width: "99%"}} />
                                <p>Status:  { miscursos.filter(x=>x.curso ==item.id)[0].estatus } </p>
                                <Link to={`/CursarCurso/${item.id}`} className="btnLink"> Entrar</Link>                                 
                            </div>
                        ))
                }
                </div>

            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2><span>Noocs disponibles</span></h2>
            <div className="flexbox-container">
            {    
                cursos
                    .filter(x=> {

                        let arr = [];

                        if (user){
                            arr = miscursos
                                    .filter (x=> x.usuario == user.id)
                                    .map (x => {  return x.curso }) 
                        }
                        
                        let res = arr.find(y => {  return y == x.id; });
                        return res == undefined;

                    })                
                    .map((item, index) => (  
                        <div   key={index} className="flexbox-item">    
                            <img src={item.imagen} style={{width: "99%"}} />                                            
                            <h3>{item.nombre} </h3>   
                            

                            <Link to={`/VerCurso/${item.id}`} className="btnLink">Ver Curso</Link> 

                        </div>                                 
                            
                    ))
            }
            </div>   
         </>
    )

    return(
 
        < >

        

        {
            isAuthenticated && !user.is_staff
            ? userOption
            : guestOption
        } 


 
        </>
    )
}


export default Home;
