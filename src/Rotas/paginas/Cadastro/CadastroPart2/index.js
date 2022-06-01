import './CadastroPart2.css'
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function CadastroPart2(){
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
        <div className='cdpt2-container'>
            <div className='cdpt2-content-left'></div>
            <div className='cdpt2-content-right'>
                    
                    <form className="form">
                        <h1>Parte 2 - Cadastro!</h1>
                        <br/>

                        <h1>Escolha uma opção de conta:</h1>
                        <br/> 


                        <div> 
                            <input type="radio" className="cdpt2" name="escolha" value="/CadastroEstudante" onChange={(e) => setRota(e.target.value)}/> 
                            <label className="label-input" > Estudante</label>
                        </div>

                        <br/>

                        <div> 
                            <input type="radio" className="cdpt2" name="escolha" value="/CadastroEmpresa"  onChange={(e) => setRota(e.target.value)}/>
                            <label className="label-input" > Empresa</label>
                        </div>
                        <br/>

                        <div> 
                            <input type="radio" className="cdpt2" name="escolha" value="/CadastroFaculdade" onChange={(e) => setRota(e.target.value)}/>
                            <label className="label-input" > Faculdade</label>
                        </div>
                        <br/>

                        <button type="button" className='cdpt2-input-btn' onClick={validateInfo}>
                            Selecionar
                        </button>
                        
                        <p>{mensagem}</p>

        
                    </form>
                
            </div>
        </div>

    )
}



export default CadastroPart2;