import React, { PureComponent } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import MatchingProps from './components/Forms/MatchingProps';
import SimpleForm from './components/Forms/SimpleForm';
import HomePage from './components/common/HomePage';
import FunctionCicle from './components/life/FunctionCicle';
import Cicle from './components/life/Cicle';
import CharsPage from './components/Requests/CharsPages';
import HomeTwo from './components/HomeTwo';

function PriveRoute(props){ // HOC
    let isLoggedIn = true  // consigue la info de validación
    return isLoggedIn ? <Route {...props}  /> : <Redirect to="/login" /> // 
}

const Routes = () => {
    return (  
        <Switch>
            <Route exact path="/" component={HomeTwo} />
            <Route path="/login" component={SimpleForm} />
            <Route path="/timer" component={FunctionCicle} />
            <Route path="/classtimer" component={Cicle} />
            <PriveRoute path="/chars" component={CharsPage} />
        </Switch>
    );
}
 
export default Routes;