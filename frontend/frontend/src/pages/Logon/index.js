import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handlerLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            console.log(response);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.ong.name); 

            console.log(response.data.nome);
            history.push('/profile');
        } catch(err) {
            alert('Falha no login, tente novamente!');
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
               <img src={logoImg} alt="Be The Hero"/> 
                
                <form onSubmit={handlerLogin}>
                    <h1>Faça seu Logon</h1>

                    <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID" />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho Cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}