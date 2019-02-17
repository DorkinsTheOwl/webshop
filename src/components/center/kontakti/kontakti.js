import React from 'react';
import './kontakti.scss';
import GoogleMap from "./map/map";


class Kontakti extends React.Component {

    render() {

        return (
            <div className='container mt-3 mb-3'>
                <div className='h2 mb-3'>Kontakti</div>

                <div><strong>Tālrunis:</strong></div>
                <p>(+371)12345678 <br/> (+371)87654321</p>

                <div><strong>E-pasts:</strong></div>
                <p>info@6kvadrata.lv</p>

                <div><strong>Adrese:</strong></div>
                <p>Mūkusalas iela 101, Zemgales priekšpilsēta, Rīga, LV-1004</p>
                <GoogleMap/>
            </div>
        );
    }
}

export default Kontakti;