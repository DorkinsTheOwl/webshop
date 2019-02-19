import React from 'react';
import './footer.scss';

class Footer extends React.Component {
    render() {

        return (
            <footer className="footer">
                <div className='container mt-3 mb-3'>
                    <div className='row'>
                        <div className='col'>© Toms Sokolovs</div>
                        <br/>
                        <small>Admin login to add items to product list. Admin - admin@admin.com. Password - qwerty</small>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;