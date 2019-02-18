import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { afterItemAdded, fetchAllItems } from '../../../actions';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './pievienotPreci.scss';
import Message from "../../message/message";

class PievienotPreci extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;

        return (
            <div className='form-group'>
                <label htmlFor={field.input.name}>{field.label}</label>
                <input id={field.input.name}
                       type={field.type}
                       className={className}
                       {...field.input}/>
                <div className='invalid-feedback'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        axios.post(`${window.location.origin}/items`, {
            ...values
        }, {headers: {'x-auth': localStorage.getItem('token')}}).then(resp => {
            this.props.afterItemAdded();
            this.setState({display: true});
            this.props.fetchAllItems();
        });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Preces pievienošanas forma</div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="form-group mt-2">
                        <Field label='Nosaukums'
                               name='name'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Apraksts'
                               name='description'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Saite uz attēlu'
                               name='image'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Daudzums'
                               name='quantity'
                               type='number'
                               component={this.renderField}/>
                        <Field label='Cena'
                               name='price'
                               type='number'
                               component={this.renderField}/>
                        <button type='submit' className='btn btn-primary'>Pievienot</button>
                    </div>
                </form>

                <Message message='Prece veiksmīgi pievienota' display={this.state.display}/>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Ievadiet preces nosaukumu.'
    }

    if (!values.description) {
        errors.description = 'Ievadiet preces aprakstu.'
    }

    if (!values.quantity) {
        errors.quantity = 'Ievadiet preces daudzumu.'
    }

    if (!values.price) {
        errors.price = 'Ievadiet preces cenu.'
    }

    return errors;
}

export default withRouter(reduxForm({
    validate,
    form: 'PrecesPievienosanasForma'
})(connect(null, {afterItemAdded, fetchAllItems})(PievienotPreci)));