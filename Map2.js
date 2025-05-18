import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';

const MyMapComponent = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    // Google Maps API Key
    const apiKey = 'AIzaSyBD11y3Ha4fFbOypMBYSYJxJHY0baFo5MA';

    const MyStyledMarker = ({ position, children }) => {
        return (
            <OverlayView
                position={position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div style={{
                    backgroundColor: '#313131',
                    borderRadius: '30px',
                    padding: '3px 15px',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.3)',
                    display: 'inline-block',
                    textWrap: "nowrap"
                    
                }}>
                    <p style = {{width:"100%", color:"white", fontWeight:800, fontSize:"11px"}}>{children}</p>
                </div>

            </OverlayView>
        );
    };


    useEffect(() => {
        // You can handle side-effects or map loading state here
    }, []);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                id="example-map"
                mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                }}
                options={{ disableDefaultUI: true }}
                zoom={10}
                center={{
                    lat: 37.7749, // Latitude
                    lng: -122.4194, // Longitude
                }}
                onLoad={() => setMapLoaded(true)}
            >
                {mapLoaded && (
                    <>
                        <MyStyledMarker position={{ lat: 37.7749, lng: -122.4194 }} children = {"1957"} />
                    </>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MyMapComponent;
