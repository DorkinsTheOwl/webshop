import React from 'react';
import './right-side.scss';
import Calendar from 'react-calendar';
import { connect } from "react-redux";
import { filterItems } from "../../actions";
import { withRouter } from "react-router-dom";

class RightSide extends React.Component {

    handleSearch(e) {
        e.preventDefault();
        this.props.history.push('/produkti');
    }

    render() {
        return (
            <div className="right-side">
                <form onSubmit={e => this.handleSearch(e)}>
                    <input type='text'
                           value={this.props.value}
                           onChange={e => this.props.filterItems(e.target.value)}
                           className='search-input'
                           placeholder='Meklēt preci'/>
                </form>
                <Calendar className='calendar mt-3' value={new Date()}/>
                <div>Sociālie tīkli:</div>
                <a href='https://www.facebook.com/' target='_blank'>
                    <img src='/assets/images/facebook.png' className='icon'/>
                </a>
                <a href='https://twitter.com' target='_blank'>
                    <img src='/assets/images/twitter.png' className='icon'/>
                </a>
                <a href='https://www.instagram.com' target='_blank'>
                    <img src='/assets/images/instagram.png' className='icon'/>
                </a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        value: state.items.filteredTerm
    }
}

export default withRouter(connect(mapStateToProps, {filterItems})(RightSide));