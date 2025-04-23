import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { MyMapComponent, Test, categoryNames } from './Map';
import Card from './Card';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DetailPage from './DetailPage';

import db from './firebase';
import { ref, onValue, set, push } from 'firebase/database';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const SearchBar = () => {
    const [borderWidth, setBorderWidth] = useState(0);
    const test = StyleSheet.create({
        searchBorder: {
            borderWidth: borderWidth
        }
    });
    return (
        <View style={{ flexDirection: "row", backgroundColor: "white", padding: 20, alignItems: "center", width: "100%" }}>
            <Icon
                name='code-of-conduct'
                type='octicon'
                color='#000'
                size={40}
                style={{ marginRight: 10 }}
            />
            <View style={[{ flex: 1, flexDirection: "row", backgroundColor: "#F0F0F0", borderRadius: 18, alignItems: "center" }, test.searchBorder]}>
                <TextInput style={{ flex: 1, backgroundColor: null, padding: 16 }} placeholder="Search" placeholderTextColor={"#C5C5C5"} onFocus={() => setBorderWidth(3)} onBlur={() => setBorderWidth(0)} />
            </View>
        </View>
    );
};

const screens = categoryNames;

const InterestsGroups = ({ activeScreen, setActiveScreen }) => {
    // Create ref for the ScrollView
    const scrollViewRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    // Calculate scroll position when screen changes
    useEffect(() => {
        if (scrollViewRef.current) {
            const screenIndex = screens.indexOf(activeScreen);
            const itemWidth = contentWidth / screens.length;
            const scrollToX = Math.max(0,
                Math.min(
                    screenIndex * itemWidth - (containerWidth / 2) + (itemWidth / 2),
                    contentWidth - containerWidth
                )
            );

            scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
        }
    }, [activeScreen, contentWidth, containerWidth]);

    return (
        <SafeAreaView>
            <ScrollView
                ref={scrollViewRef}
                style={[styles.bottomBorder, { backgroundColor: "white", paddingHorizontal: 10 }]}
                horizontal
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(width) => setContentWidth(width)}
                onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
            >
                {screens.map((screen) => {
                    const isActive = activeScreen === screen;
                    return (
                        <TouchableOpacity
                            key={screen}
                            onPress={() => setActiveScreen(screen)}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: isActive ? '550' : '400',
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                backgroundColor: isActive ? '#313131' : 'white',
                                borderRadius: 19,
                                color: isActive ? "white" : "#C5C5C5",
                                shadowColor: isActive ? '#171717' : 'transparent',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.34,
                                shadowRadius: 13,
                                marginHorizontal: 5,
                            }}>
                                {screen}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const Explore = () => {
    const [activeScreen, setActiveScreen] = useState(screens[0]);
    const [isMapView, setIsMapView] = useState(true);

    return (
        <View style={styles.container}>
            <SearchBar />
            <InterestsGroups activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <View style={styles.mapContainer}>
                <MyMapComponent 
                    activeScreen={activeScreen}
                    onViewToggle={setIsMapView}
                />
                <Card isMapView={isMapView} />
            </View>
        </View>
    );
};

const dummyFavorites = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        title: 'Luxury Villa with Pool',
        location: 'Bali, Indonesia',
        price: 250,
        rating: 4.95,
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1616137466211-f939a420be84',
        title: 'Modern Downtown Loft',
        location: 'New York, USA',
        price: 180,
        rating: 4.8,
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        title: 'Beachfront Paradise',
        location: 'Cancun, Mexico',
        price: 320,
        rating: 4.9,
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
        title: 'Mountain Retreat',
        location: 'Swiss Alps',
        price: 275,
        rating: 4.85,
    },
];

const FavoriteCard = ({ item }) => {
    return (
        <View style={styles.favoriteCard}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.favoriteImage}
            />
            <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteLocation}>{item.location}</Text>
                <Text style={styles.favoriteTitle}>{item.title}</Text>
                <Text style={styles.favoritePrice}>${item.price} night</Text>
            </View>
        </View>
    );
};

const Favorites = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={styles.favoritesContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wishlists</Text>
            </View>

            <View style={styles.searchContainer}>
                <Icon
                    name='search'
                    type='octicon'
                    color='#000'
                    size={20}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search wishlists"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#717171"
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.favoritesGrid}
                showsVerticalScrollIndicator={false}
            >
                {dummyFavorites.map((item) => (
                    <FavoriteCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const testInfo = (data) => {

    const testInfoRef = ref(db, 'Categories' + "/Technology");
    push(testInfoRef, data)
    console.log("testing click")
}

const dummyData = {
    "name": "First Controlled Nuclear Reaction",
    "year": 1942,
    "location": {
        "description": "Site of Chicago Pile-1, beneath the west stands of Stagg Field at the University of Chicago",
        "modern_address": "5630 S. Ellis Avenue, Chicago, IL 60637",
        "current_site": "Henry Moore's 'Nuclear Energy' sculpture, now part of the Regenstein Library complex"
    }
}

const dummyData1 = {
    "name": "Home Insurance Building",
    "year": 1885,
    "location": {
        "original_location": "Northeast corner of LaSalle and Adams Streets in Chicago's Loop",
        "address": "135 S. LaSalle Street, Chicago, IL 60603",
        "note": "The original building was demolished in 1931; the Field Building (now LaSalle Bank Building) currently occupies the site"
    }
}


const dummyData2 = {
    "name": "Chicago Network Access Point",
    "year": 1990,
    "location": {
        "primary_location": "The Lakeside Technology Center data center",
        "address": "350 E. Cermak Road, Chicago, IL 60616",
        "note": "Former R.R. Donnelley printing plant, now a major internet exchange point"
    }
}

const History = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => testInfo(dummyData)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
                <Text>Testing</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => testInfo(dummyData1)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
                <Text>Testing2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => testInfo(dummyData2)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
                <Text>Testing3</Text>
            </TouchableOpacity>
            <Text>History</Text>
        </View>
    )
}

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

// Create ExploreStack component
const ExploreStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ExploreMain" component={Explore} />
            <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
    );
};

// Update the Test5 component to use ExploreStack
export function Test5() {
    return (
        <NavigationContainer>
            <Tabs.Navigator screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: "white", height: 65, paddingVertical: "auto" },
                tabBarIconStyle: { marginVertical: "auto" }
            }}>
                <Tabs.Screen name="Explore" component={ExploreStack} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "location" : "location"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Tabs.Screen name="Favorites" component={Favorites} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "heart-fill" : "heart"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Tabs.Screen name="History" component={History} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "history" : "history"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Tabs.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "person-fill" : "person"} color={color} type="octicon" size={24} />
                    )
                }} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        width: '100%'
    },
    bottomBorder: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.13)',
        elevation: 5,
        paddingVertical: 10,
    },
    favoritesContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        padding: 12,
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    favoritesGrid: {
        padding: 15,
    },
    favoriteCard: {
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    favoriteImage: {
        width: '100%',
        height: 250,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    favoriteInfo: {
        padding: 15,
    },
    favoriteLocation: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    favoriteTitle: {
        fontSize: 14,
        color: '#717171',
        marginBottom: 8,
    },
    favoritePrice: {
        fontSize: 14,
        fontWeight: '500',
    },
})