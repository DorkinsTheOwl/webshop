import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import axios from 'axios';
import './registreties.scss';
import Message from "../../message/message";
import { onSuccessfulRegistration } from "../../../actions";

class Registreties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            error: false,
            message: ''
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
        axios.post('http://localhost:3000/users', {
            email: values.email,
            password: values.password
        }).then(() => {
            this.setState({display: true, message: 'Reģistrācija veiksmīga', error: false});
            this.props.onSuccessfulRegistration();
        }).catch(() => {
            this.setState({display: true, message: 'Reģistrācija neveiksmīga', error: true});
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Reģistrācijas forma</div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="form-group mt-2">
                        <Field label='E-pasts'
                               name='email'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Parole'
                               name='password'
                               type='password'
                               component={this.renderField}/>
                        <Field label='Atkārtota Parole'
                               name='password2'
                               type='password'
                               component={this.renderField}/>
                        <button type='submit' className='btn btn-primary'>Reģistrēties</button>
                    </div>
                </form>

                <Message message={this.state.message} display={this.state.display} error={this.state.error}/>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.email) {
        errors.email = 'Ievadiet e-pastu.'
    }

    if (!!values.email && !regExp.test(values.email.toLowerCase())) {
        errors.email = 'Ievadiet derīgu e-pasta adresi.'
    }

    if (!values.password) {
        errors.password = 'Ievadiet parole.'
    }

    if (!values.password2) {
        errors.password2 = 'Ievadiet paroli atkārtoti.'
    }

    if (values.password !== values.password2) {
        errors.password2 = 'Parole nesakrīt.'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'RegistracijasForma'
})(connect(null, {onSuccessfulRegistration})(Registreties));