import React, { useContext, useState } from "react";
import firebase from '../../../Firebase';
import './Perfil.css';
import { UilUserSquare } from '@iconscout/react-unicons'

import { useCookies } from 'react-cookie';



function Perfil() {
    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

    const [newusername, setNewUsername] = useState("");
    const [newemail, setNewEmail] = useState("");
    const [newfoto, setNewfoto] = useState();
    const [newinterreses, setNewinterreses] = useState("");
    const [newuni, setNewUni] = useState("");


    function UploadPerfil(e) {
        setNewfoto(e.target.files[0]);
    }

    async function reauthenticateWithCredential() {
        /**
         * @returns {object}
         */
        function promptForCredentials() {
            return {};
        }

        // [START auth_reauth_with_credential]
        const user = firebase.auth().currentUser;

        // TODO(you): prompt the user to re-provide their sign-in credentials
        const credential = promptForCredentials();

        await user.reauthenticateWithCredential(credential).then(() => {
            alert("Reautenticado!")
            // User re-authenticated.
        }).catch((error) => {
            alert(error)
            // An error ocurred
            // ...
        });
        // [END auth_reauth_with_credential]
    }


    async function Update() {
        let alerta = false;

        if (newusername !== "") {
            try {
                await firebase.firestore().collection("Usuario").doc(cookies.uid)
                    .set({
                        nome: newusername
                    }, {
                        merge: true
                    })
                alerta = true;
            } catch (error) {
                await firebase.firestore().collection("Instituição").doc(cookies.uid)
                    .set({
                        nome: newusername
                    }, {
                        merge: true
                    })
                alerta = true;
            }


        }
        if (newemail !== 'auth/email-already-in-use' && /\S+@\S+\.\S+/.test(newemail) && newemail !== "") {
            const user = firebase.auth().currentUser;

            await user.updateEmail(newemail).then(() => {
                // Update successful
                reauthenticateWithCredential()

            }).catch((error) => {
                // An error occurred
            });

            alerta = true;
        }

        if (newfoto !== undefined) {
            let erros = false;

            if (newfoto === undefined) {
                erros = true;
            }

            if (erros === false) {
                await firebase.storage().ref(`FotoPerfil/${cookies.uid}`).child("perfil").put(newfoto);

            }
            alerta = true;
        }

        if (newuni !== "" && newuni !== "Escolha uma opção.") {
            try {
                let snapshot = await firebase.firestore().collection("Instituição").get()
                snapshot.docs.forEach(doc => {
                    if (newuni === doc.data().nome) {
                        firebase.firestore().collection("Usuario").doc(cookies.uid)
                            .update({
                                universidade: doc.id
                            })
                        alerta = true;
                    }
                })
            } catch (error) {
                alert("Não foi possivel alterar a sua universidade!")
                alerta = false;
            }
        }

        if (newinterreses !== "" && newinterreses !== "Escolha uma opção.") {
            try {
                await firebase.firestore().collection("Usuario").doc(cookies.uid)
                    .update({
                        interesses: newinterreses
                    })
                alerta = true;
            } catch (error) {
                alert("Não foi possivel alterar os seus interesses!")
                alerta = false;
            }
        }
        if (alerta === true) {
            alert("Alterações feitas com sucesso!")
            window.location.reload();
        }
        else {
            alert("Não foi possivel realizar alterações! Verifique os campos!")
        }



    }

    return (
        <div className="PerfilDiv">
            <h1 className="h1Perfil">Editar Pefil</h1>

            <div className="PerfilComponente">

                <div className='InputPerfil'>
                    <label className='form-label'>Altere seu Nome</label>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Digite seu nome atualizado'
                        onChange={(e) => { setNewUsername(e.target.value) }}
                    />

                </div>

                <div className='InputPerfil'>
                    <label className='form-label'>Altere seu E-mail</label>
                    <input
                        className='form-input'
                        type='email'
                        placeholder='Entre com seu E-mail atualizado'
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <div className='InputPerfil'>
                    <label className='form-label'>Selecione sua Universidade</label>
                    <select className='form-input' onChange={(e) => setNewUni(e.target.value)}>
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
                </div>

                <div className='InputPerfil'>
                    <label className='form-label'>Selecione seu Interesse</label>
                    <select className='form-input' onChange={(e) => setNewinterreses(e.target.value)}>
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
                </div>

                <div className='InputPerfil'>
                    <label className='form-label'>Atualize sua Foto de Perfil</label>

                    <label className="btn2" htmlFor="botao5">
                        <UilUserSquare className="button__icon" />
                        <input type="file" id="botao5" onChange={(e) => { UploadPerfil(e) }} />
                        <label className="button--flex" htmlFor="botao5">Foto</label>
                    </label>
                </div>



                <button type="button" className='buttonPerfil' onClick={Update}>
                    Atualizar
                </button>
            </div>

        </div>
    )
}

export default Perfil;