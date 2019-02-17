import React from 'react';
import './footer.scss';

class Footer extends React.Component {
    render() {

        return (
            <footer className="footer">
                <div className='container mt-3 mb-3'>
                    <div className='row'>
                        <div className='col'>© Toms Sokolovs - 2018</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;