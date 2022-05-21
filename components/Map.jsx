import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDz678a_Ux5jTiLt2wONgOYLtp6QbMcHDc'
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

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
                fullscreenControl: false,
            }}
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