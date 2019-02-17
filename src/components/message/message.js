import React from 'react';
import './message.scss';

class Message extends React.Component {
    render() {
        const className = `alert ${this.props.error ? 'alert-danger' : 'alert-success'}`;

        if (this.props.display) {
            return (
                <div className={className} role="alert">
                    {this.props.message}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Message;