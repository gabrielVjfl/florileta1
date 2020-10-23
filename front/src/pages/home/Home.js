import React from 'react'

import './Home.css'

import Logo from '../../images/reciclagem-logo.png'

import { FaSearch, FaPlus } from 'react-icons/fa';

//import Peoples from '../../images/home-background.svg'

import {Link} from 'react-router-dom'

const Home = () => {
    return (
    <div id="template_home">
        <div className="content">
        <div className="logo">
    <img src={Logo} height="80px" width="80px"/>
    <h2>Florileta</h2>
        </div>

        <div className="title">
            <h1>Seu Marketplace de coleta de resíduos</h1>
            <p>Ajudamos pessoas de <strong>Florianópolis e Grande Florianópolis</strong> a encontrarem
                pontos de coleta de forma eficiente.
            </p>
            
            <Link to="/maps"><button className="btn btn-success">Achar ponto de coleta 
            <FaSearch id="icon"></FaSearch> </button></Link>

          <div className="register">
            <Link to="/create"><button className="btn btn-warning">Cadastrar ponto de coleta <FaPlus id="icon" size={16}></FaPlus></button></Link>
            </div>

        </div>
        </div>
    </div>
    )
}

export default Home