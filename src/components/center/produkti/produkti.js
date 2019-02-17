import './produkti.scss';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addItemToCard, filterItems } from "../../../actions";
import { NavLink } from "react-router-dom";

class Produkti extends React.Component {

    onClick(e, item) {
        e.preventDefault();
        this.props.addItemToCard({...item, id: Math.random()});
    }

    renderPosts() {
        const items = !!this.props.filteredTerm ? this.props.filteredItems : this.props.items;

        return _.map(items, item => {
            return (
                <NavLink to={`/produkti/${item._id}`} className='card' key={item._id}>
                    <img className='card-img-top' src={item.image} alt={item.name}/>
                    <div className='card-body'>
                        <h5 className='card-title'>{item.name}</h5>
                        <p className='card-text'>{_.truncate(item.description)}</p>
                        <div className="row">
                            <button className='btn btn-primary col'
                                    type='button'
                                    disabled={this.props.level === 10}
                                    onClick={event => this.onClick(event, item)}>Ielikt Grozā
                            </button>
                            <div className='col text-right price'>{item.price}€</div>
                        </div>
                    </div>
                </NavLink>
            )
        })
    }

    clearLabel() {
        this.props.filterItems('');
    }

    renderFilter() {
        if (!!this.props.filteredTerm) {
            return (
                <div className='alert alert-secondary' role='alert'>Produkti atlasīti pēc
                    atslēgvārda: {this.props.filteredTerm}
                    <button type='button'
                            className='close'
                            onClick={() => this.clearLabel()}
                            aria-label='Close'>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Produkti</div>
                {this.renderFilter()}
                <div className='list-of-products'>
                    {this.renderPosts()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items.allItems,
        level: state.user.level,
        filteredTerm: state.items.filteredTerm,
        filteredItems: state.items.filteredItems
    };
}

export default connect(mapStateToProps, {addItemToCard, filterItems})(Produkti);