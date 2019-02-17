import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './center.scss';
import Galvena from './galvena/galvena';
import Kontakti from './kontakti/kontakti';
import Pieslegties from './pieslegties/pieslegties';
import Registreties from './registreties/registreties';
import Produkti from './produkti/produkti';
import Produkts from './produkti/produkts/produkts';
import PievienotPreci from './pievienotPreci/pievienotPreci';
import connect from "react-redux/es/connect/connect";
import { fetchAllItems } from '../../actions/index';
import Grozs from "./grozs/grozs";
import PasutijumaForma from "./grozs/pasutijumaForma/pasutijumaForma";

class PageCenter extends React.Component {

    componentDidMount() {
        this.props.fetchAllItems();
    }

    render() {

        return (
            <div className="center">
                <Switch>
                    <Route path='/galvena' component={Galvena}/>
                    <Route exact path='/produkti' component={Produkti}/>
                    <Route path='/produkti/:id' component={Produkts}/>
                    <Route path='/pievienot-preci' component={PievienotPreci}/>
                    <Route path='/pieslegties' component={Pieslegties}/>
                    <Route path='/registreties' component={Registreties}/>
                    <Route exact path='/grozs' component={Grozs}/>
                    <Route path='/grozs/pasutijums' component={PasutijumaForma}/>
                    <Route path='/kontakti' component={Kontakti}/>
                    <Route render={() => (
                        <Redirect to='/galvena'/>
                    )}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(null, {fetchAllItems})(PageCenter));