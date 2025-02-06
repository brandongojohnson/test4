import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MyMapComponent } from './Map';


const Stack = createStackNavigator(); // Initialize Stack navigator outside the component
const TopNav = createMaterialTopTabNavigator();
const Tabs = createBottomTabNavigator();

const Screen1 = () => (
    <View style={[styles.container, null]}>
        {/* <Text>Screen 1</Text> */}
        <SearchBar />
        <Test2/>
        <MyMapComponent />
        {/* <View style={{width: 10, height: 10, backgroundColor:"red", position:'absolute'}}/> */}
    </View>
)

const Box = ({ boxKey, activeNumber, setActiveNumber }) => {
    const [color, setColor] = useState("green")

    const colorChange = () => {
        setActiveNumber(boxKey)
        // boxKey == activeNumber ? setColor("red") : setColor("green")
        // color == "red" ? setColor("green") : setColor("red") 
        console.log(activeNumber)
    }
    return (
        <TouchableOpacity onPress={() => colorChange()} style={{ width: 50, height: 50, margin: 5, backgroundColor: activeNumber == boxKey ? "red" : "green" }} />
    )
}

const screens = ["Screen 1", "Screen 2", "Screen 3"]

const Test2 = () => {
    const [activeScreen, setActiveScreen] = useState(screens[0])
    return (
        <View style={[styles.bottomBorder, { flexDirection: "row", width: "100%", justifyContent: "space-evenly" }]}>
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
                    }}>
                        {screen}
                    </Text>

                </TouchableOpacity>
            ))}
        </View>
    )
}

const Screen2 = () => {
    const [activeNumber, setActiveNumber] = useState()
    const boxes = []

    for (var i = 0; i < 3; i++) {
        boxes.push(
            <Box key={i} boxKey={i} setActiveNumber={setActiveNumber} activeNumber={activeNumber} />
        )
    }
    return (
        <View style={styles.container}>
            {/* <Text>Screen 2</Text> */}

            {/* <View style={{flexDirection: "row" }}>
                {boxes} 
            </View> */}
            <Test2 />
            {/* <Text>{activeNumber}</Text> */}
        </View>

    )
}

const Screen3 = () => {
    const [color, setColor] = useState("yellow");

    const changeColor = () => {
        setColor((color === "yellow" ? "red" : "yellow"));
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Screen 3</Text>
            <Button onPress={changeColor} title="Change Color" />
            <View style={{ width: 30, height: 30, backgroundColor: color }} />
        </View>
    );
};

const Screen4 = () => (
    <View style={{ flex: 1 }}>
        <SearchBar />
        <View style={styles.container}>
            <Text>Screen 4</Text>
        </View>
    </View>
)
const SearchBar = () => {
    const test1 = "blue"

    const [borderWidth, setBorderWidth] = useState(0)

    const test = StyleSheet.create({
        searchBorder: {
            borderWidth: borderWidth
        }
    })
    return (
        <View style={{ flexDirection: "row", backgroundColor: "white", padding: 20, alignItems: "center", width:"100%"}}>

            <Icon
                name='code-of-conduct'
                type='octicon'
                color='#000'
                size={40}
                style={{ marginRight: 10 }}
            />
            <View style={[{ flex: 1, flexDirection: "row", backgroundColor: "#F0F0F0", borderRadius: 18, alignItems: "center" }, test.searchBorder]}>
                <TextInput style={{ flex: 1, backgroundColor: null, padding: 16 }} placeholder="" placeholderTextColor={"#C5C5C5"} onFocus={() => setBorderWidth(3)} onBlur={() => setBorderWidth(0)} />
            </View>
        </View>
    )
}

export function Test5() {
    return (
        <NavigationContainer>
            <Tabs.Navigator screenOptions={{
                headerShown: false, tabBarActiveTintColor: "black", tabBarInactiveTintColor: "black",
                tabBarShowLabel: false
            }}>
                <Stack.Screen name="Top Tab" component={Screen1} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "location" : "location"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Stack.Screen name="Name" component={Screen4} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "pin" : "pin"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Stack.Screen name="Place" component={Screen2} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "history" : "history"} color={color} type="octicon" size={24} />
                    )
                }} />
                <Stack.Screen name="Person" component={Screen3} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? "person" : "person"} color={color} type="ionicon" size={24} />
                    )
                }} />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    bottomBorder: {
        backgroundColor: 'white', // Tab bar background
        borderBottomWidth: 1, // Thickness of the bottom border
        borderBottomColor: 'rgba(0,0,0,.13)', 
        elevation: 5, 
        paddingVertical:10
        
    }
})