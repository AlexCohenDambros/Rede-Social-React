import './cd3.css'
import React, {useState} from "react";
import {useHistory} from "react-router-dom";


function Cadastro3(){
    const history = useHistory();

    const [rota, setRota] = useState("");
    const [mensagem, setMes] = useState("");

    function validateInfo(){
        setMes("")
        
        if (rota === ""){
            setMes("É necessário selecionar uma opção!")
        }

        if (rota !== ""){
            history.push(rota);
        }
    }


    return (
        <div className='cd3-container'>
            <div className='cd3-content-left'></div>
            <div className='cd3-content-right'>
                <form className="form"> 
                    <h1>Cadastro Universidade</h1>
                    <br/>

                    <h1>Escolha uma opção de conta:</h1>
                    <br/>

                    <label className="label-input"> 
                        <input type="radio" className="cd3" name="escolha" value="/CadastroEmpresa"  onChange={(e) => setRota(e.target.value)}/> Cadastrar uma Universidade
                    </label>
                    <br/>

                    <label className="label-input"> 
                        <input type="radio" className="cd3" name="escolha" value="/CadastroFuncionario" onChange={(e) => setRota(e.target.value)}/> Cadastrar como Funcionário
                    </label>
                    <br/>

                    <p>{mensagem}</p>
                    
                    <br/>

                    <button type="button" className='cd3-input-btn' onClick={validateInfo}>
                        Selecionar
                    </button>

                </form> 
            </div>
        </div>

    );
}

export default Cadastro3;