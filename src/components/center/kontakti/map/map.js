import React from 'react';
import './map.scss';

class GoogleMap extends React.Component {
    componentDidMount() {

        const position = {lat: 56.918640, lng: 24.114280};

        const map = new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat: position.lat,
                lng: position.lng
            }
        });

        new google.maps.Marker({position, map})
    }

    render() {
        return <div ref='map' className='map'></div>
    }
}

export default GoogleMap;