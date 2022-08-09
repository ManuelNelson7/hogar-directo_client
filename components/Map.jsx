import React, {useState, useCallback} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Audio } from  'react-loader-spinner';

const Map = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAi6Ud23fBgt9u9IQRVH2VA_jpCR9Fc0Y8',
        libraries: ['places'],
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

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
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
    ) : (
        <>
            <p>Loading Map...</p>
            <Audio
                height = "80"
                width = "80"
                radius = "9"
                color = 'green'
                ariaLabel = 'three-dots-loading'     
                wrapperStyle
                wrapperClass
            />
        </>
    )
}

export default React.memo(Map)