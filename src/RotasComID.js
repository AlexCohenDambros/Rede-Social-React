import {Route, Switch } from "react-router-dom";
import Menu from "./Rotas/Componentes/Header/Menu";

const RotasComID = () => {
    return (
        <Switch>
            <Route exact={true} path="/FeedPrincipal" component={Menu} />
            <Route exact={true} path="*" component={Menu} />
        </Switch>
    )
}

export default RotasComID;