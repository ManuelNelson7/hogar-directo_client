import React, {useState, useMemo} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
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

    const center = useMemo(() => ({ lat: location.lat, lng: location.lng }), []);

    const [map, setMap] = useState(null)

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
                fullscreenControl: false,
            }}
        >
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