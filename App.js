import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnBoard from './OnBoard';
import {Test5} from './Test5';

export default function App() {
  return (
    <View style={styles.container}>
      <Test5/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:0
  },
});
