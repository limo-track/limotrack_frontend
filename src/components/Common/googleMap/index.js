import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '95%',
  height: '50vh'
};

class GoogleMap extends Component{

  render(){
    const {lat, lng} = this.props.pos;
    return(
      <div style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={{ lat, lng}}
        >
          <Marker
            position={{ lat, lng}}
            //onClick={()=>alert('My Marker')}
          />
        </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);