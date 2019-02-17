import React from 'react';
import './galvena.scss';

class Galvena extends React.Component {
    render() {

        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Par 6kvadrāta</div>

                <p>Uzņēmums darbojās no 2018. gada</p>
                <p>Uzņēmums nodarbojās ar dažādu preču tirdzniecību interneta vietnē</p>
                <img src="/assets/images/banneris.png" alt="Banneris" className="bannerImg"/>
            </div>
        );
    }
}

export default Galvena;