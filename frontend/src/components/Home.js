import React, { useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBanners} from '../actions/BannerActions'
import {getCursos} from '../actions/CursoActions'
import { Zoom,Slide } from 'react-slideshow-image'



const Home = () => {

    const dispatch = useDispatch()

    const banners = useSelector(state => state.banner.lista)
    const cursos = useSelector(state => state.curso.lista)

    useEffect(() => {
        dispatch(getCursos())
        dispatch(getBanners())
         
    }, [])


    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
      }


    return(
        < >
            <h2><span>ciudadania digital</span></h2>
            <p>#noocs</p>

             
            {    
                        banners.map((each, index) => (  
                        <div   key={index}>                           
                            <img src={each.imagen} style={{width: "100%"}} />
                            <h3>{each.titulo} </h3>                            
                        </div>                                 
                            
                    ))
                    }


                     

 
            {    
                cursos.map((each, index) => (  
                    <div key={index}>                           
                    <img src={each.imagen} style={{width: "100%"}} />
                    <h3>{each.nombre} {each.descripcionA} </h3>                            
                    </div>                                 

                ))
            }


 
        </>
    )
}


export default Home;
