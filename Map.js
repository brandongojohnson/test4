import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 41.876465,
    lng: -87.621887
};

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
    // { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#B6B6B6" }] }, 
    // { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#909C9D" }] }, 
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#90c7cc" }] }, // Slightly deeper blue
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#547aa5" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#d6d6d6" }] }, // Muted POI
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#abd4a8" }] }, // Softer parks
];


export function MyMapComponent() {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBD11y3Ha4fFbOypMBYSYJxJHY0baFo5MA">
            {/* <View style={{ width: 10, height: 20, backgroundColor: "red" }} /> */}
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11} options={{ mapTypeControl: false, fullscreenControl: false, colorScheme: "LIGHT", streetViewControl: false, zoomControl: false, styles: sample }}>

                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}
