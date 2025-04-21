import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ thumbnail, title, description }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Mount Fuji, <Text style={{color: "#CAC8C8"}}>Tokyo</Text></Text>
        <Text style={styles.description}>Tokyo, Japan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    backgroundColor:"rgba(0,0,0,.75)",
    borderRadius: 27,
    marginBottom: 25,
    position:"absolute",
    width:"85%",
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginRight: 15,
    backgroundColor:"rgba(0,0,0,.8)"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
    color:"white"
  },
  description: {
    fontSize: 14,
    color: '#CAC8C8',
  },
});

export default Card;