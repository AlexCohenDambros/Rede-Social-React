
import './cd1.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { usuario } from "../FormSignup";
import firebase from '../../../../Firebase';
import { nome } from '../FormSignup';

function Cadrasto1() {
    const history = useHistory();

    const [cpf, setCpf] = useState("");
    const [matri, setMatri] = useState("");
    const [uni, setUni] = useState("");
    const [curso, setCurso] = useState("");
    const [inte, setInte] = useState("");

    const [cpfE, setCpfE] = useState("");
    const [matriE, setMatriE] = useState("");
    const [uniE, setUniE] = useState("");
    const [cursoE, setCursoE] = useState("");
    const [inteE, setInteE] = useState("");


    async function validateInfo() {
        setCpfE("")
        setMatriE("")
        setUniE("")
        setCursoE("")
        setInteE("")
        let error = false;

        if (cpf === "") {
            error = true;
            setCpfE("É necessário um CPF")
        }

        if (matri === "") {
            error = true;
            setMatriE("É necessário uma Matrícula")
        }

        if (uni === "") {
            error = true;
            setUniE("É necessário selecionar uma Universidade")
        }
        else if (uni === "Escolha uma opção.") {
            error = true;
            setUniE("É necessário selecionar uma Universidade")
        }

        if (curso === "") {
            error = true;
            setCursoE("É necessário um curso")
        }

        if (inte === "") {
            error = true;
            setInteE("É necessário selecionar um interesse")
        }
        else if (uni === "Escolha uma opção.") {
            error = true;
            setInteE("É necessário selecionar um interesse")
        }

        if (error === false) {
            let snapshot = await firebase.firestore().collection("Instituição").get()
            snapshot.docs.forEach(doc => {
                if (uni === doc.data().nome) {
                    firebase.firestore().collection("Usuario").doc(usuario.uid)
                        .set({
                            nome: nome,
                            cpf: cpf,
                            matricula: matri,
                            universidade: doc.id,
                            curso: curso,
                            interesses: inte
                        }, {
                            merge: true
                        })
                }
            })

            history.push("/");
        }
    }


    return (
        <div className='cd1-container'>
            <div className='cd1-content-left'></div>
            <div className='cd1-content-right'>
                <form className="form">
                    <h1>Cadastro Estudante</h1>
                    <br />

                    <div className='form-inputs'>
                        <label className='form-label'>CPF</label>
                        <input
                            className='form-input'
                            type='text'
                            name='cpf'
                            placeholder='Digite seu CPF'
                            onChange={(e) => setCpf(e.target.value)}
                        />

                        <p>{cpfE}</p>

                    </div>


                    <div className='form-inputs'>
                        <label className='form-label'>Matrícula</label>
                        <input
                            className='form-input'
                            type='text'
                            name='matricula'
                            placeholder='Digite sua Matrícula'
                            onChange={(e) => setMatri(e.target.value)}

                        />
                        <p>{matriE}</p>
                    </div>


                    <div className='form-inputs'>
                        <label className='form-label'>Selecione sua Universidade</label>
                        <select className='form-input' onChange={(e) => setUni(e.target.value)}>
                            <option>
                                Escolha uma opção.
                            </option>
                            <option>
                                PUCPR - Pontifícia Universidade Católica do Paraná
                            </option>
                            <option>
                                UniCuritiba
                            </option>
                            <option>
                                UTFPR — Universidade Tecnológica Federal do Paraná UTFPR
                            </option>
                            <option>
                                UFPR — Universidade Federal do Paraná
                            </option>
                        </select>

                        <p>{uniE}</p>
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Curso</label>
                        <input
                            className='form-input'
                            type='text'
                            name='cep'
                            placeholder='Digite seu curso'
                            onChange={(e) => setCurso(e.target.value)}
                        />
                        <p>{cursoE}</p>
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Selecione seu Interesse</label>
                        <select className='form-input' onChange={(e) => setInte(e.target.value)}>
                            <option>
                                Escolha uma opção.
                            </option>
                            <option>
                                Engenharia.
                            </option>
                            <option>
                                Computação.
                            </option>
                            <option>
                                Biologia.
                            </option>
                            <option>
                                Medicina.
                            </option>
                            <option>
                                Química.
                            </option>
                            <option>
                                Física.
                            </option>
                            <option>
                                Matemática.
                            </option>
                            <option>
                                Geografia.
                            </option>
                            <option>
                                História.
                            </option>
                        </select>
                        <p>{inteE}</p>
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


export default Cadrasto1;