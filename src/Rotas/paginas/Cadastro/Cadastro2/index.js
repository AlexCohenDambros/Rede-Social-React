import './cd2.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { usuario } from "../FormSignup";
import firebase from '../../../../Firebase';
import { nome } from '../FormSignup';


function Cadrasto2() {

    const history = useHistory();

    const [ramo, setRamo] = useState("");
    const [cnpj, setCNPJ] = useState("");

    const [ramoE, setRamoE] = useState("");
    const [cnpjE, setCNPJE] = useState("");


    async function validateInfo() {
        setRamoE("")
        setCNPJE("")

        let error = false;

        if (ramo === "") {
            error = true;
            setRamoE("É necessário um ramo")
        }

        if (cnpj === "") {
            error = true;
            setCNPJE("É necessário uma CNPJ")
        }

        if (error === false) {
            await firebase.firestore().collection("Instituição").doc(usuario.uid)
                .set({
                    nome: nome,
                    Ramo: ramo,
                    cnpj: cnpj,
                }, {
                    merge: true
                })

            history.push("/");
        }
    }
    return (
        <div className='cd2-container'>
            <div className='cd2-content-left'></div>
            <div className='cd2-content-right'>
                <form className="form">
                    <h1>Cadastrar Instituição</h1>
                    <br />

                    <div className='form-inputs'>
                        <label className='form-label'>Ramo da Instituição</label>
                        <input
                            className='form-input'
                            type='text'
                            name='ramoEmpresa'
                            placeholder='Digite o ramo da Instituição'
                            onChange={(e) => setRamo(e.target.value)}

                        />
                        <p>{ramoE}</p>
                    </div>


                    <div className='form-inputs'>
                        <label className='form-label'>CNPJ</label>
                        <input
                            className='form-input'
                            type='text'
                            name='cnpj'
                            placeholder='Digite a CNPJ'
                            onChange={(e) => setCNPJ(e.target.value)}
                        />
                        <p>{cnpjE}</p>
                    </div>


                    <br />

                    <button type="button" className='form-input-btn' onClick={validateInfo}>
                        Finalizar
                    </button>
                </form>
            </div>
        </div>

    );

}


export default Cadrasto2;