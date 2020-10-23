import React, {useState, useEffect} from 'react'

//import SideBar from '../../components/SideBar'

import { Map, Marker, TileLayer } from 'react-leaflet';

import Logo from '../../images/reciclagem-logo.png'

import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import Leaflet from 'leaflet';

import { useHistory } from "react-router-dom";

import {LeafletMouseEvent} from 'leaflet'

import './Create.css'

import Axios from 'axios'

import {Form, Formik, Field} from 'formik'

import Building from '../../images/building.png'
import Emails from '../../images/gmail.png'
import Whatsapp from '../../images/whatsapp.png'
import Street from '../../images/road.png'
import Numbers from '../../images/list.png'
import identify from '../../images/identity.png'

import Local from '../../images/gps.png'

const MapIcon = Leaflet.icon({
    iconUrl: Local,
  
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popupAnchor: [0, -30]
    
  })


const Create = () => {

  //  const [position, setPosition] = useState({latitude: 0, longitude: 0})

    const INITIAL_STATE = {
    latitude: 0, 
    longitude: 0,
    name: '',
    email: '',
    whatsapp: '',
    cidade: '',
    endereco: '',
    items: [],
    numero: 0,
     // MANY TO MANY

    }

    const [state, setState] = useState(INITIAL_STATE)

  //  const [position, setPosition] = useState({latitude: 0, longitude: 0})
   // const [name, setName] = useState('')
   // const [email, setEmail] = useState('')
   // const [whatsapp, setWhatsapp] = useState('')
   // const [cidade, setCidade] = useState('')
   // const [endereco, setEndereco] = useState('')
   // const [numero, setNumero] = useState<number>(0)
   // const [items, setItems] = useState<string[]>([])

   // const [state, setState] = useState({
      //   position,
      //   name,
     //    email,
      //   whatsapp,
      //   cidade,
      //   endereco,
    //     numero,
   //      items
  //  })

  
   


  // LeafletMouseEvent
    function handleMapClick(LeafletMouseEvent) {
 
       const {lat, lng} = LeafletMouseEvent.latlng
       
       setState({
           latitude: lat,
           longitude: lng
        })
       
         }
         console.log(state)

         const HandleSubmit = (e) => {
             e.preventDefault()
             Axios.post('http://localhost:7777/api/points/create', state).then(response => {
                 console.log(response)
                 alert('Salvou')

             }).catch(err => {
                 console.log(err)
                 alert('Deu erro')
             })


         }

         console.log(state)

         const HandleChange = (e) => {
         setState({...state, [e.target.name]: e.target.value})
         }


      
        
         


         



    return (
    <div id="template_create">
        <aside>
        <Link to="/"><button className="btn btn-warning" id="btnleft">
            <FaArrowLeft></FaArrowLeft></button></Link>
            <header>
                <br/>
            <img src={Logo} height="80px" width="80px"/>
            <h2>Florileta</h2>
           <h3>Cadastre um ponto de coleta</h3>
           <p>A natureza agradece!</p>
            </header>
            <footer>
                <strong>Florianópolis</strong>
                <span>Santa Catarina</span>
            </footer>
        </aside>
        <div className="content_create">
         <div className="card">
             <div className="card-body">
                 <h1>Cadastre um ponto de coleta</h1>
                 <br/>
                 <Formik initialValues={INITIAL_STATE}>
                 <Form onSubmit={HandleSubmit} onChange={HandleChange}>
                 <fieldset>
            <legend>Dados</legend>

            <label>Selecione o local no mapa!</label>

            <Map 
                 center={[-27.5884465,-48.506986]}
              style={{ width: '100%', height: 280, borderRadius: '20px' }}
              zoom={11}
              onclick={handleMapClick}
       
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {
                state.latitude !== 0 && (
                <Marker interactive={false} 
                icon={MapIcon}
                 position={[
                state.latitude,
                state.longitude]} /> 
                 ) }

            
            </Map>


          
        <label>Nome do ponto de coleta <img src={identify} height="30px" width="30px"/></label>
        <Field
        name="name" required className="form-control" autoFocus type="text"
        placeholder="Digite o nome do ponto de coleta"></Field>
            <br/>
        <label>Email <img src={Emails} height="30px" width="30px"/></label>
        <Field name="email"  required className="form-control" type="email" 
        placeholder="Digite o seu melhor email"></Field>
            <br/>
        <label>WhatsApp - Telefone <img src={Whatsapp} height="30px" width="30px"/></label>
        <Field  name="whatsapp" required className="form-control" type="text" 
        placeholder="Digite o número do celular"></Field>
            <br/>

            <p id="location">Localização</p>

            <div id="localizacao"></div>

        <label>Endereço <img src={Street} height="30px" width="30px"/></label>
        <Field  name="endereco" 
      required className="form-control" type="text" 
        placeholder="Digite o endereço"></Field>
            <br/>
        <label>Número <img src={Street} height="30px" width="30px"/></label>
        <Field name="numero" required className="form-control" type="number" 
        placeholder="Número de endereço"></Field>

                    <br/>
        <label htmlFor="cidade">Cidade <img src={Building} height="30px" width="30px"/></label>
        <select   name="cidade" className="form-control">
                <option value="">Selecione a Cidade</option>
                <option value="Florianópolis">Florianópolis</option>
                <option value="Biguaçu">Biguaçu</option>
                <option value="Palhoça">Palhoça</option>
                <option value="São José">São José</option>
                         </select>
                       <br/>

                       <select multiple name="items" value={state.items} className="form-control">
                      <option value="">Selecione</option>
                      <option value="1">Lampadas</option>
                      <option value="2">Pilhas e Baterias</option>
                      <option value="3">Pápeis e Papelão</option>
                      <option value="4">Residuos Eletronicos</option>
                      <option value="5">Residuos Organicos</option>
                      <option value="6">Óleo de cozinha</option>
                       </select>

                  

       
                     
                       <br/>
        <button type="submit" id="btnsubmit" className="btn btn-warning">Registrar</button>
                      
                   </fieldset>
                 </Form>
                 </Formik>
             </div>
         </div>
        </div>
    </div>
    )
}

export default Create