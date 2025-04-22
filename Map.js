import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from '@rneui/themed';

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

// Helper function to generate random prices
const generateRandomPrice = () => {
    return Math.floor(Math.random() * (2000 - 800 + 1) + 800);
};

// Custom Price Marker Component
const PriceMarker = ({ price, isSelected }) => {
    return (
        <div style={{
            background: isSelected ? '#000000' : '#313131',
            padding: '8px 0px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 10px 10px rgba(0,0,0,0.2)',
            // border: '2px solid white',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            minWidth: '80px',
            textAlign: 'center',
        }}>
            ${price}
        </div>
    );
};

// Update the marker data with prices
const updateMarkersWithPrices = (markers) => {
    return markers.map(marker => ({
        ...marker,
        price: generateRandomPrice()
    }));
};

const chicagoMarkers1 = updateMarkersWithPrices([
    { id: "tech1", lat: 41.8781, lng: -87.6298, title: 'Chicago - Downtown' },
    { id: "tech2", lat: 41.8925, lng: -87.6269, title: 'Chicago - River North' },
    { id: "tech3", lat: 41.8675, lng: -87.6156, title: 'Chicago - Museum Campus' }
]);

const chicagoMarkers2 = updateMarkersWithPrices([
    { id: "music1", lat: 41.9002, lng: -87.6237, title: 'Chicago - Gold Coast' },
    { id: "music2", lat: 41.8827, lng: -87.6233, title: 'Chicago - Millennium Park' },
    { id: "music3", lat: 41.8495, lng: -87.6843, title: 'Chicago - Pilsen' }
]);

const chicagoMarkers3 = updateMarkersWithPrices([
    { id: "pol1", lat: 41.8802, lng: -87.6245, title: 'Chicago - Loop 1' },
    { id: "pol2", lat: 41.8829, lng: -87.6291, title: 'Chicago - Loop 2' },
    { id: "pol3", lat: 41.8794, lng: -87.6228, title: 'Chicago - Loop 3' }
]);

export const Test = {
    Technology: chicagoMarkers1,
    Music: chicagoMarkers2,
    Politics: chicagoMarkers3,
    Science: chicagoMarkers2,
    "Pop Culture": chicagoMarkers1
};

export const categoryNames = Object.keys(Test);

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

// Custom marker icon configuration
const customMarker = {
    path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 7 13s7-7.75 7-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z", // This is the Google Maps pin SVG path
    fillColor: "#313131", // Match your app's theme color
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#FFFFFF",
    scale: 1.5,
    anchor: { x: 12, y: 24 },
    labelOrigin: { x: 12, y: 12 }
};

// Active marker style (when selected or hovered)
const activeMarker = {
    
    fillColor: "#000000",
    scale: 1.8,
};



export function MyMapComponent({activeScreen}) {
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <View style={styles.mapWrapper}>
            <LoadScript googleMapsApiKey="AIzaSyBD11y3Ha4fFbOypMBYSYJxJHY0baFo5MA">
                <GoogleMap 
                    mapContainerStyle={containerStyle} 
                    center={center} 
                    zoom={14} 
                    options={{
                        ...options,
                        // Disable default POI markers to avoid cluttering
                        styles: [
                            ...sample,
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                >
                   
                    {Test[activeScreen]?.map((marker) => (
                        <OverlayView
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => ({
                                x: -(width / 2),
                                y: -(height + 10)
                            })}
                        >
                            <div
                                onClick={() => {
                                    setSelectedMarker(marker.id);
                                    console.log("Marker clicked:", marker.title);
                                }}
                            >
                                <PriceMarker 
                                    price={marker.price}
                                    isSelected={selectedMarker === marker.id}
                                />
                            </div>
                        </OverlayView>
                    ))}
                </GoogleMap>
            </LoadScript>
        </View>
    );
}

// Alternative: If you want to use an image instead of SVG
const imageMarker = {
    url: 'https://your-custom-marker-image.png', // Replace with your image URL
    scaledSize: { width: 40, height: 40 }, // Adjust size as needed
    origin: { x: 0, y: 0 },
    anchor: { x: 20, y: 40 }
};

const styles = StyleSheet.create({
    mapWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative'
    }
});
