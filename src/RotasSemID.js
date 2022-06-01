import { Route, Switch } from "react-router-dom";

import Login from './Rotas/paginas/Login/index';
import NotFounds from './Rotas/paginas/NotFound/index';
import FormSignup from "./Rotas/paginas/Cadastro/FormSignup";
import CadastroPart2 from "./Rotas/paginas/Cadastro/CadastroPart2";
import Cadrasto1 from "./Rotas/paginas/Cadastro/Cadastro1";
import Cadrasto2 from "./Rotas/paginas/Cadastro/Cadastro2";
import Cadrasto3 from "./Rotas/paginas/Cadastro/Cadastro3";
import CadastroFuncionario from "./Rotas/paginas/Cadastro/Cadastro3/funcionario";

const RotasSemID = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/cadastro" component={FormSignup} />
            <Route exact={true} path="/CadastroPart2" component={CadastroPart2} />
            <Route exact={true} path="/CadastroEstudante" component={Cadrasto1} />
            <Route exact={true} path="/CadastroEmpresa" component={Cadrasto2} />
            <Route exact={true} path="/CadastroFaculdade" component={Cadrasto3} />
            <Route exact={true} path="/CadastroFuncionario" component={CadastroFuncionario} />
            <Route exact={true} component={NotFounds} />
        </Switch>
    )
}

export default RotasSemID;