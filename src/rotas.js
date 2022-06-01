import React from 'react'
import { useCookies } from 'react-cookie';
import RotasComID from "./RotasComID";
import RotasSemID from "./RotasSemID";
import { useHistory } from "react-router-dom";

function Rotas() {
    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);
    const history = useHistory();

    function EscolhaRotas() {
        if (cookies.condicao === undefined){
            history.push("/");
        }
        if (cookies.condicao === "true") return (<RotasComID />)
        return (<RotasSemID />) 
    }
    return (<>{EscolhaRotas()}</>)
}

export default Rotas;