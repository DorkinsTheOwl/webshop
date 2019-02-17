import React from 'react';
import './grozs.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItemFromCart } from "../../../actions";

class Grozs extends React.Component {

    renderRows() {
        return _.map(this.props.cart, item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}€</td>
                    <td>
                        <button type='button'
                                className='close'
                                onClick={() => this.removeItem(item)}
                                aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    removeItem(item) {
        this.props.removeItemFromCart(item);
    }

    getTotalPrice() {
        let price = 0;
        _.map(this.props.cart, item => {
            price += item.price;
        });
        return price;
    }

    render() {

        if (this.props.cart.length > 0) {
            return (
                <div className='container mt-3 mb-3'>
                    <div className='h2 mb-3'>Pirkuma grozs</div>
                    <table className='table'>
                        <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Nosaukums</th>
                            <th scope='col'>Cena</th>
                            <th scope='col-sm'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderRows()}
                        </tbody>
                    </table>

                    <div>Kopējā cena ir {this.getTotalPrice()}€</div>

                    <NavLink to='/grozs/pasutijums' type='button' className='btn btn-primary'>Veikt pasūtījumu</NavLink>
                </div>
            );
        } else {
            return (
                <div>Grozs ir tukšs</div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

export default connect(mapStateToProps, {removeItemFromCart})(Grozs);