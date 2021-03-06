import React,{ useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBanners, addBanner, editBanner, deleteBanner} from '../../actions/BannerActions'

const BannerAdmin =() =>{
    const [titulo, setTitulo] = useState('')
    const [imagen, setImagen] = useState('')
    
    const [mode, setMode] = useState('new')
    const [id, setId] = useState('')

    
    const auth = useSelector(state => state.auth)
    const lista = useSelector(state => state.banner.lista)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBanners())
    }, [])


    const agregar = () => {
        setTitulo('')
        setImagen('')
        
        setMode('new')
    }
    

    const editar = (item)=>{
        setTitulo(item.titulo)        
        setId(item.id)
        setMode('edit')
        $('#MyModal').modal('show')
    }

    const guardar = (e) =>{
        e.preventDefault()

        if (titulo == '') {
            alert('No ha capturado el titulo')
            return
        }
        if (imagen == '') {
            alert('No ha elegido la imagen del curso')
            return
        }
         


        let form_data = new FormData()
        form_data.append('titulo', titulo) 
        form_data.append('imagen', imagen, imagen.name)
        form_data.append('updated_by', 'usuario : ' + auth.user.username)

 
        if (mode == 'new'){
            dispatch(addBanner(form_data))
            $('#MyModal').modal('hide')
        }

        if (mode == 'edit'){
            dispatch(editBanner(form_data,id))
            $('#MyModal').modal('hide')
        }
    }

    const eliminar = (item) => {
        setId(item.id)
        $('#MyConfirmation').modal('show')
    }

    const eliminarRegistro = () => {
        dispatch(deleteBanner(id))
        $('#MyConfirmation').modal('hide')
    }



    return (
        <>
            <h2>Banners</h2>

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
                                    <label>*Titulo</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        placeholder="Introduzca el titulo"
                                        name="titulo"                                    
                                        onChange = { e => setTitulo(e.target.value)  }
                                        value={titulo}                                                                         
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
                    <th>Titulo</th>
                    <th>Nombre</th>                    
                    <th> </th> 
                </thead>     
                <tbody>
                    {
                        lista.map(item=>(
                            <tr key={item.id}>
                                <td><img src={item.imagen}  alt="foto" width="120px" height="120px"/> </td>
                                <td>{item.titulo}</td>                                
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


export default BannerAdmin;
