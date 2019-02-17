import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { saveUser } from "../../../actions";
import './pieslegties.scss';
import Message from "../../message/message";

class Pieslegties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: true,
            errorMessage: ''
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
        this.setState({display: false});
        axios.post('http://localhost:3000/users/login', {
            email: values.email,
            password: values.password
        }).then(resp => {
            localStorage.setItem('token', resp.headers['x-auth']);
            this.props.saveUser(resp.data);
            this.props.history.push('/galvena');
        }, err => {
            this.setState({display: true, message: err.response.data.message})
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Pieslēgties</div>
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
                        <button type='submit' className='btn btn-primary'>Pieslēgties</button>
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


    return errors;
}

export default withRouter(reduxForm({
    validate,
    form: 'PieslegsanasForma'
})(connect(null, {saveUser})(Pieslegties)));