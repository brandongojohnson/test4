import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { MyMapComponent } from './Map';
import Card from './Card';
import { Test } from './Map';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Tabs = createBottomTabNavigator();

const SearchBar = () => {

    const test1 = "blue"
    const [borderWidth, setBorderWidth] = useState(0)
    const test = StyleSheet.create({
        searchBorder: {
            borderWidth: borderWidth
        }
    })
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
    )
}

const screens = Object.keys(Test)

const InterestsGroups = ({ activeScreen, setActiveScreen }) => {
    return (
        <SafeAreaView>
            <ScrollView style={[styles.bottomBorder, { backgroundColor: "white", paddingHorizontal: 10 }]} horizontal showsHorizontalScrollIndicator={false}>
                {screens.map((screen, index) => (
                    <TouchableOpacity
                        onPress={() => setActiveScreen(screen)}>
                        <Text style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: activeScreen == screen ? '550' : '400',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            backgroundColor: activeScreen == screen ? '#313131' : 'white',
                            borderRadius: 19,
                            color: activeScreen == screen ? "white" : "#C5C5C5",
                            shadowColor: activeScreen == screen ? '#171717' : 'transparent',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.34,
                            shadowRadius: 13,
                            marginHorizontal: 5
                        }}>
                            {screen}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const Explore = () => {
    const [activeScreen, setActiveScreen] = useState(screens[0])

    return (
        <View style={[styles.container, { justifyContent: 'flex-end' }]}>
            <SearchBar />
            <InterestsGroups activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <View style={{flexGrow:1, alignItems:"center", justifyContent:"flex-end"}}>
                <MyMapComponent activeScreen={activeScreen} style={{ paddingTop: 500 }} />
                <Card />
            </View>
        </View>
    )
}

const Favorites = () => {
    return (
        <View>
            <ScrollMenu />
        </View>
    )
};

const ScrollMenu = () => {
    const activeScreen = "Technology"
    return (

        <SafeAreaView>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <View style={{ width: 100, height: 100, backgroundColor: "red", margin: 10 }} />
                <View style={{ width: 100, height: 100, backgroundColor: "red", margin: 10 }} />
                <View style={{ width: 100, height: 100, backgroundColor: "red", margin: 10 }} />
                <View style={{ width: 100, height: 100, backgroundColor: "red", margin: 10 }} />

            </ScrollView>
        </SafeAreaView>
    )
}

const History = () => {
    return (
        <View style={styles.container}>
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

export function Test5() {
    return (
        <NavigationContainer>
            <Tabs.Navigator screenOptions={{
                headerShown: false, tabBarActiveTintColor: "black", tabBarInactiveTintColor: "black",
                tabBarShowLabel: false, tabBarStyle: { backgroundColor: "white", height: 65, paddingVertical: "auto" }, tabBarIconStyle: { marginVertical: "auto" }
            }}>
                <Tabs.Screen name="Explore" component={Explore} options={{
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
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white"
    },
    bottomBorder: {
        backgroundColor: 'white', // Tab bar background
        borderBottomWidth: 1, // Thickness of the bottom border
        borderBottomColor: 'rgba(0,0,0,.13)',
        elevation: 5,
        paddingVertical: 10

    }
})