import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { saveUser } from "../../actions";
import './navtigation.scss';

class Navigation extends React.Component {

    renderLinks() {
        let links = [
            {link: '/galvena', name: 'Galvenā'},
            {link: '/produkti', name: 'Produkti'},
            {link: '/kontakti', name: 'Kontakti'},
        ];

        if (!this.props.level) {
            links = [
                ...links,
                {link: '/registreties', name: 'Reģistrēties'},
                {link: '/pieslegties', name: 'Pieslēgties'}
            ]
        }

        if (this.props.level === 10) {
            links = [
                ...links,
                {link: '/pievienot-preci', name: 'Pievienot Preci'}
            ];
        }

        if (this.props.level !== 10) {
            links = [
                ...links,
                {link: '/grozs', name: 'Grozs', count: this.props.cart.length}
            ];
        }

        return links.map(link => {
            return (
                <NavLink to={link.link}
                         key={Math.random()}
                         activeClassName='active'
                         className='list-group-item list-group-item-action'>
                    {link.name} {!!link.count ? `(${link.count})` : ''}
                </NavLink>
            )
        });
    }

    renderLogoutBtn() {
        if (!!this.props.level) {
            return (
                <button onClick={() => this.logout()}
                        className='button list-group-item list-group-item-action'>Iziet</button>
            )
        }
    }

    logout() {
        const token = localStorage.getItem('token');

        axios.delete('http://localhost:3000/users/me/token', {headers: {'x-auth': token}})
            .then(() => {
                localStorage.removeItem('token');
                this.props.saveUser(null);
                this.props.history.push('/galvena');
            });
    }

    render() {
        return (
            <div className="navigation">
                <div className='list-group'>
                    {this.renderLinks()}
                    {this.renderLogoutBtn()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        level: state.user.level,
        cart: state.cart
    };
}

export default withRouter(connect(mapStateToProps, {saveUser})(Navigation));