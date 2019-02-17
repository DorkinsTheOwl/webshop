import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends React.Component {
    render() {

        return (
            <header className="header">
                <div className='container mt-3 mb-3'>
                    <div className='row'>
                        <Link to={'/galvena'}>
                            <img src="/assets/images/logo.png" alt="6kvadrata logo" className="logo"/>
                        </Link>
                        <div className='col right-side'><h2>6 kvadrāta</h2></div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;