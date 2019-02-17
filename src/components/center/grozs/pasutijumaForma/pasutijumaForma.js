import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import './pasutijumaForma.scss';
import { initialFormValues, onOrderMade } from "../../../../actions";
import Message from "../../../message/message";

class PasutijumaForma extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!!this.props.email) {
            this.props.initialFormValues(this.props.email)
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
        this.props.onOrderMade();
        this.setState({display: true});
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Preces pievienošanas forma</div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="form-group mt-2">
                        <Field label='Vards'
                               name='firstName'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Uzvards'
                               name='lastName'
                               type='text'
                               component={this.renderField}/>
                        <Field label='E-pasts'
                               name='email'
                               type='text'
                               component={this.renderField}/>
                        <Field label='Tālrunis'
                               name='phoneNumber'
                               type='number'
                               component={this.renderField}/>
                        <Field label='Piegādes Adrese'
                               name='address'
                               type='text'
                               component={this.renderField}/>
                        <button type='submit' className='btn btn-primary'>Pasūtīt</button>
                    </div>
                </form>

                <Message message='Pasūtījums veikts. Tuvājakā laikā ar Jums sazināsies mūsu pārdošanas speciālists'
                         display={this.state.display}/>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.firstName) {
        errors.firstName = 'Ievadiet savu vārdu.';
    }

    if (!values.lastName) {
        errors.lastName = 'Ievadiet savu uzvārdu.';
    }

    if (!values.email) {
        errors.email = 'Ievadiet savu e-pastu.';
    }

    if (!!values.email && !regExp.test(values.email.toLowerCase())) {
        errors.email = 'Ievadiet derīgu e-pasta adresi.';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Ievadiet savu tālruņa numuru.';
    }

    if (!values.address) {
        errors.address = 'Ievadiet piegādes adresi.';
    }


    return errors;
}

function mapStateToProps(state) {
    return {
        email: state.user.email
    }
}

export default reduxForm({
    validate,
    form: 'PasutijumaForma'
})(connect(mapStateToProps, {onOrderMade, initialFormValues})(PasutijumaForma));