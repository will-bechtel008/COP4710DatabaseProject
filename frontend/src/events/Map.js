import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 28.6024274,
      lng: -81.2000599
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
      <button onClick={() => window.locaiton = '/events'}>Back</button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzbNsaHd6QTNZURjZNhy-F5eic3cpkB0Y' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={localStorage.getItem('lat')}
            lng={localStorage.getItem('lng')}
            text={localStorage.getItem('eventName')}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;