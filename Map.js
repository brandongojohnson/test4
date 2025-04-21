import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 41.876465,
    lng: -87.621887
};

const markers = [
    { id: 1, lat: 37.7749, lng: -122.4194, title: 'San Francisco' },  // Marker 1
    { id: 2, lat: 34.0522, lng: -118.2437, title: 'Los Angeles' },    // Marker 2
    { id: 3, lat: 40.7128, lng: -74.0060, title: 'New York' },         // Marker 3
];

const chicagoMarkers1 = [
    { id: 1, lat: 41.8781, lng: -87.6298, title: 'Chicago - Downtown' },
    { id: 2, lat: 41.8925, lng: -87.6269, title: 'Chicago - River North' },
    { id: 3, lat: 41.8675, lng: -87.6156, title: 'Chicago - Museum Campus' }
];

const chicagoMarkers2 = [
    { id: 1, lat: 41.9002, lng: -87.6237, title: 'Chicago - Gold Coast' },
    { id: 2, lat: 41.8827, lng: -87.6233, title: 'Chicago - Millennium Park' },
    { id: 3, lat: 41.8495, lng: -87.6843, title: 'Chicago - Pilsen' }
];

const chicagoMarkers3 = [
    { id: 1, lat: 41.8802, lng: -87.6245, title: 'Chicago - Loop 1' },
    { id: 2, lat: 41.8829, lng: -87.6291, title: 'Chicago - Loop 2' },
    { id: 3, lat: 41.8794, lng: -87.6228, title: 'Chicago - Loop 3' },
];

export const Test = {"Technology": chicagoMarkers1, "Music": chicagoMarkers2, "Politics": chicagoMarkers3, "Science": chicagoMarkers2, "Pop Culture": chicagoMarkers1}

const uberMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
];

const lyftMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#abd4a8" }] }, // Deep blue-gray
    { elementType: "labels.text.fill", stylers: [{ color: "#d0d0d0" }] }, // Softer white labels
    { elementType: "labels.text.stroke", stylers: [{ color: "#1c1c1c" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#515c6d" }] }, // Slight color variation
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#cfcfcf" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#2b3a4b" }] }, // Muted blue-gray points of interest
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c46" }] }, // Dark teal for parks
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] }, // Greenish park labels
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#38414e" }] }, // Lyft uses **dark bluish roads**
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#a3a3a3" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#4f5b6b" }] }, // Medium contrast roads
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#6d7680" }] }, // Softer dark gray for highways
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#8a92a0" }] }, // Lyft-like purplish-blue highway
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9fa5b5" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#34495e" }] }, // Dark blue for transit
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#7289da" }] }, // Lyft-like **soft blue transit labels**
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#90c7cc" }] }, // Dark blue water (not black)
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] }, // Cool blue-gray water labels
];

const sample = [
    { elementType: "geometry", stylers: [{ color: "#e0e0e0" }] }, // Slightly darker gray base
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] }, // Softer labels
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] }, // Gentle contrast
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] }, // Darker but visible roads
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#90c7cc" }] }, // Slightly deeper blue
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#547aa5" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#d6d6d6" }] }, // Muted POI
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#abd4a8" }] }, // Softer parks
];

const options = {
    mapTypeControl: false,
    cameraControl: false,
    fullscreenControl: false,
    colorScheme: "LIGHT",
    streetViewControl: false,
    zoomControl: false,
    styles: sample,
    attributionControl: false, 
    keyboardShortcuts: false,
}

export function MyMapComponent({activeScreen}) {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBD11y3Ha4fFbOypMBYSYJxJHY0baFo5MA">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={options}>

                <Marker position={center} />

                {
                    Test[activeScreen].map((marker, index) => (
                        <Marker onClick = {()=>console.log("this is a test")} key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                    ))
                }
            </GoogleMap>
        </LoadScript>
    );
}
