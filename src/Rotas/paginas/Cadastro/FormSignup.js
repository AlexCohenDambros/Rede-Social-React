import './Form.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from '../../../Firebase';

export var usuario = {
  email: "",
  senha: "",
  uid: ""
}

export var nome;


function FormSignup() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [password2, setSenha2] = useState("");

  const [errosNome, setNomeE] = useState("");
  const [errosEmail, setEmailE] = useState("");
  const [errosSenha, setSenhaE] = useState("");
  const [errosSenha2, setSenha2E] = useState("");

  async function validateInfo() {
    setNomeE("");
    setEmailE("");
    setSenhaE("");
    setSenha2E("");

    let error = false;

    if (username === "") {
      error = true;
      setNomeE("É necessário um nome!")
    }
    if (email === "") {
      error = true;
      setEmailE("É necessário um E-mail!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = true;
      setEmailE("O endereço de E-mail é inválido!");
    } else if (email === 'auth/email-already-in-use') {
      error = true;
      setEmailE("O E-mail já é existente!");
    }

    if (password === "") {
      error = true;
      setSenhaE("É necessário uma senha!");
    } else if (password.length < 6) {
      error = true;
      setSenhaE("A senha precisa ter 6 ou mais caracteres!");
    }

    if (password2 === "") {
      error = true;
      setSenha2E("Repita a senha!");
    } else if (password2 !== password) {
      error = true;
      setSenha2E("As senhas não são iguais!");
    }

    if (error === false) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
          usuario.email = email;
          usuario.senha = password;
          usuario.uid = value.user.uid;

          nome = username;
          history.push("/CadastroPart2");
        })
        .catch ((error) => {
        if (error.code === 'auth/weak-password') {
          alert("Senha fraca! Tente novamente!!");
        }
        else if (error.code === 'auth/email-already-in-use') {
          alert("E-mail já existente!! Tente novamente!!")
        }
      })
    }
  }

  return (
    <div className='form-container'>
      <div className='form-content-left'></div>

      <div className='form-content-right'>
        <form className='form'>
          <h1>
            Cadastro
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Nome</label>
            <input
              className='form-input'
              type='text'
              placeholder='Digite seu nome'
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <p>{errosNome}</p>

          </div>
          <div className='form-inputs'>
            <label className='form-label'>E-mail</label>
            <input
              className='form-input'
              type='email'
              placeholder='Entre com seu E-mail'
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>{errosEmail}</p>

          </div>
          <div className='form-inputs'>
            <label className='form-label'>Senha</label>
            <input
              className='form-input'
              type='password'
              placeholder='Entre com sua senha'
              onChange={(e) => setSenha(e.target.value)}
            />
            <p>{errosSenha}</p>
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Confirmar Senha</label>
            <input
              className='form-input'
              type='password'
              placeholder='Confirme sua senha'
              onChange={(e) => setSenha2(e.target.value)}
            />
            <p>{errosSenha2}</p>
          </div>

          <button type="button" className='form-input-btn' onClick={validateInfo}>
            Cadastrar
          </button>

          <span className='form-input-login'>
            Você já tem uma conta? Login <a onClick={() => window.open("/", "_self")}>aqui</a>
          </span>
        </form>
      </div>
    </div>
  )
}
export default FormSignup;
