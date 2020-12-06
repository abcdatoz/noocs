import React, {Fragment, useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getBanners, addBanner, editBanner, deleteBanner} from '../../actions/BannerActions'


const BannerAdmin = () => {

    
    const banners = useSelector(state => state.banner.lista);
    const auth = useSelector(state => state.auth);


    const dispatch = useDispatch();

    const agregar = () => {
         
    }

    const guardar = (e) => {

        e.preventDefault();
         
        let form_data = new FormData();
        form_data.append('titulo', titulo);
        form_data.append('imagen', imagen, imagen.name);
        form_data.append('updated_by', 'usuario : ' + auth.user.username);


        dispatch (addBanner(form_data)); 
          
    }

    const cancelar =()=>{
        console.log('cancelar');
    }

    const editar = (item) =>{
        console.log(item);
    }

    const eliminar = (item)=>{
        console.log('eliminar');
    }
 
    const cargardatos = ()=>{
        dispatch(getBanners());
    }


    const Lista = () => {
        return (
            <>
                <h2>Banners</h2> 
                 

            <button onClick={agregar} className="btn btn-default btn-lg">
                <span className="fa fa-plus-square fa-lg" aria-hidden="true">Agregar</span>
            </button>

            <button onClick={() => dispatch(getBanners()) } className="btn btn-default btn-lg">
                <span className="fa fa-plus-square fa-lg" aria-hidden="true">Load</span>
            </button>

             <table className="table table-striped">
                 <thead>
                     <th>Titulo</th>
                     <th>Imagen</th>
                     <th></th>
                 </thead>
                 <tbody>
                     {

                         banners.map(item =>(
                             <tr key={item.id}>
                                 <td>{item.titulo}</td>
                                 <td><img src={item.imagen} alt="banners" width="100px" height="100px" /> </td>
                                 <td><button
                                        onClick={ () => editar(item) }
                                        className="btn btn-default btn-lg" >
                                        <span className="fa fa-edit fa-lg" aria-hidden="true"></span>
                                     </button>
                                     <button 
                                        onClick={ () => eliminar(item) }
                                        className="btn btn-default btn-lg" >
                                         <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>   
                                     </button>
                                 </td>
                             </tr>
                         ))
                     }
                 </tbody>
             </table>

            </>
        );
    };




    const Formulario = () =>{
        const [titulo, setTitulo] = useState('');
        const [imagen, setImagen] = useState('');
    
        return (
            <>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h3><i className="fa fa-angle-double-right"></i> Banners</h3>

                        <form>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Introduzca el titulo del banner"
                                    name="titulo"                                    
                                    onChange = { e => setTitulo(e.target.value)  }
                                    value={titulo}                                    
                                    autofocus
                                />
                            </div>

                            <div className="form-group">
                                <label>Imagen</label>
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
                                <button className="btn btn-primary" onClick={()=> guardar()}>
                                    Guardar
                                </button>
                                <button className="btn btn-default" onClick={() => cancelar()}>
                                    Cancelar
                                </button>
                            </div>


                        </form>

                            
                    </div>
                </div>

            </>
        );
    };





    return (
        
        <Fragment>

            <Formulario />

            <Lista />  
 

        </Fragment>

        
         

    )
}


export default BannerAdmin;
