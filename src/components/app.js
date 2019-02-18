import React, { Component } from 'react';
import Header from "./header/header";
import Footer from "./footer/footer";
import Navigation from "./navigation/navigation";
import RightSide from "./right-side/right-side";
import PageCenter from "./center/center";
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser } from "../actions";

class App extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!!token) {
            axios.get(`${window.location.origin}/users/me`, {
                headers: {'x-auth': token}
            }).then(resp => {
                this.props.saveUser(resp.data);
            })
        }
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <Navigation/>
                <PageCenter/>
                <RightSide/>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(null, {saveUser})(App));