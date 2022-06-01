import './login.css';
import React, { useState } from 'react'
import { MdEmail, MdLock } from "react-icons/md";
import firebase from '../../../Firebase';
import { useHistory } from "react-router-dom";

import { useCookies } from 'react-cookie';

export var usuario = {
    email: "",
    senha: ""
}


function Login() {
    const history = useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

    if(cookies.condicao == "true"){
        history.push("/FeedPrincipal");
    }


    const [usuario, setUsuario] = useState("");
    const [Senha, setSenha] = useState("");
    const [Mensagem, setMensagem] = useState("");


    async function logar() {
        await firebase.auth().signInWithEmailAndPassword(usuario, Senha)
            .then((value) => {
                setCookie("uid", value.user.uid,{ path: '/' })
                setCookie("condicao", true,{ path: '/' })

                if (cookies.condicao === undefined){
                    setCookie("uid", value.user.uid,{ path: '/' })
                    setCookie("condicao", true,{ path: '/' })
                }
                history.push("/FeedPrincipal");

            })
            .catch((error) => {
                setMensagem("E-mail ou Senha inválidos! Tente Novamente!");
            })
    }

    return (
        <div className="login">

            <div className="login-right">
                <h1>Acessar </h1>

                <div className="login-loginInputEmail">
                    <MdEmail />
                    <input
                        type="text"
                        placeholder="Digite seu email"
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>

                <div className="login-loginInputPassword">
                    <MdLock />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        onChange={(e) => { setSenha(e.target.value) }}

                    />
                </div>
                <button onClick={logar}>
                    Entrar
                </button>

                <p> {Mensagem} </p>

                <h4>Não possui conta?</h4>

                <button onClick={() => window.open("/cadastro", "_self")}>
                    Cadastrar
                </button>


            </div>
        </div>
    )

}

export default Login