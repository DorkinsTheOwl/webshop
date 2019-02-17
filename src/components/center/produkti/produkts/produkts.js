import './produkts.scss';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addItemToCard } from "../../../../actions";

class Produkts extends React.Component {

    render() {
        const {match: {params: {id}}} = this.props;
        const selectedItem = _.find(this.props.items, item => item._id === id);
        
        return !!selectedItem ? (
            <div className='container mt-3 mb-3'>
                <div className="jumbotron">
                    <h1 className="display-4">{selectedItem.name}</h1>
                    <img className='image' src={selectedItem.image} alt={selectedItem.name}/>
                    <p className="lead">{selectedItem.description}</p>
                    <div className="row">
                        <button className='btn btn-primary col-2'
                                type='button'
                                onClick={() => this.props.addItemToCard(selectedItem)}>Ielikt Grozā
                        </button>
                        <div className='col text-right price'>{selectedItem.price}€</div>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

function mapStateToProps(state) {
    return {
        items: state.items.allItems
    };
}

export default connect(mapStateToProps, {addItemToCard})(Produkts);