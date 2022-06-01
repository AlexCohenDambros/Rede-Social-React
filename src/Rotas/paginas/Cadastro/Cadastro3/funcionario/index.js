import './cd31.css';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { usuario } from "../../FormSignup";
import firebase from '../../../../../Firebase';
import { nome } from '../../FormSignup';

function Cadrasto31(){
    const history = useHistory();

    const [cpf, setCpf] = useState("");
    const [sobrenome, setSobre] = useState("");
    const [cargo, setCargo] = useState("");
    const [nomeInt, setNomeInt] = useState("");

    const [cpfE, setCpfE] = useState("");
    const [sobrenomeE, setSobreE] = useState("");
    const [cargoE, setCargoE] = useState("");
    const [nomeIntE, setNomeIntE] = useState("");

    function validateInfo(){
        setCpfE("")
        setSobreE("")
        setCargoE("")
        setNomeIntE("")

        let error = false;

        if (sobrenome === ""){
            error = true;
            setSobreE("É necessário um sobrenome")
        }

        if (cpf === ""){
            error = true;
            setCpfE("É necessário um CPF")
        }

        if (cargo === ""){
            error = true;
            setCargoE("É necessário um cargo")
        }
        if (nomeInt === ""){
            error = true;
            setNomeIntE("É necessário um nome da Instituição em que trabalha")
        }

        if (error === false){
            firebase.firestore().collection("Usuario").doc(usuario.uid)
                .set({
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    nomeInstituição: nomeInt,
                    cargo: cargo,
                },{
                    merge: true
            })
            history.push("/");
          }
        
    }

    return (
        <div className='cd31-container'>
            <div className='cd31-content-left'></div>
            <div className='cd31-content-right'>
                <form className="form"> 
                    <h1>Cadastrar Funcionário</h1>
                    <br/>

                    <div className='form-inputs'>
                        <label className='form-label'>Sobrenome</label>
                        <input
                            className='form-input'
                            type='text'
                            name='sobrenome'
                            placeholder='Digite seu Sobrenome'
                            onChange={(e) => setSobre(e.target.value)}
                        />
                        <p>{sobrenomeE}</p>
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>CPF</label>
                        <input
                            className='form-input'
                            type='text'
                            name='cpf'
                            placeholder='Digite a CPF'
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <p>{cpfE}</p>
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Cargo / Função</label>
                        <input
                            className='form-input'
                            type='text'
                            name='cargoefuncao'
                            placeholder='Digite sua função/cargo na Instituição'
                            onChange={(e) => setCargo(e.target.value)}
                        />
                        <p>{cargoE}</p>
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Nome da Instituição</label>
                        <input
                            className='form-input'
                            type='text'
                            name='nomeInsti'
                            placeholder='Digite o nome da Instituição em que você atua'
                            onChange={(e) => setNomeInt(e.target.value)}
                        />
                        <p>{nomeIntE}</p>
                    </div>
                

                    <button type="button" className='form-input-btn' onClick={validateInfo}>
                        Finalizar
                    </button>

                </form>
            </div>
        </div>

    );
}

export default Cadrasto31;