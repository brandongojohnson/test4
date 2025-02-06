import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const OnBoard = () => {

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Pressable style={styles.logo} />

                <View>
                    <Text style={{ fontWeight: "800", fontSize: 32, textAlign: "center", marginBottom: 11 }}>
                        Explore the App
                    </Text>
                    <Text style={{ fontSize: 17, textAlign: "center", marginBottom: 76, paddingHorizontal:30 }}>
                        Now your finances are in one place and always under control
                    </Text>
                </View>

                <Pressable style={[styles.button, { backgroundColor: "black", marginBottom: 14, borderColor: "black" }]}>
                    <Text style={[styles.buttonText, { color: "white" }]}>Login</Text>
                </Pressable>

                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
   
    logo: {
        width: 283,
        height: 283,
        backgroundColor: "#D9D9D9",
        borderRadius: 141.5, // Changed from "100%" to a valid numeric value for borderRadius
        marginBottom: 45,
    },
    button: {
        padding: 20,
        borderWidth: 1.5,
        borderColor: "#747474",
        width: "100%",
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600", // Changed numeric fontWeight to a string
    },
});

export default OnBoard;
