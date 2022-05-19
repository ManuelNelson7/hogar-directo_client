import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.googlePlacesAPI
    })

    const containerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: 12,
    };

    const center = {
        lat: location.lat,
        lng: location.lng
    };

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const image = "/img/flat.png";

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                position={{ lat: location.lat, lng: location.lng }}
                icon={{
                    url: image,
                    anchor: new window.google.maps.Point(5, 58),
                }}
            />
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)