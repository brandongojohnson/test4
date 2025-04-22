import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ thumbnail, title, description }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detail', {
        location: {
          title: 'Mount Fuji',
          location: 'Tokyo, Japan'
        }
      })}
    >
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1480796927426-f609979314bd' }} 
          style={styles.thumbnail} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Mount Fuji, <Text style={styles.subtitle}>Tokyo</Text></Text>
          <Text style={styles.description}>Tokyo, Japan</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 25,
    width: '85%',
    backgroundColor: 'rgba(0,0,0,.75)',
    borderRadius: 27,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginRight: 15,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white'
  },
  subtitle: {
    color: '#CAC8C8'
  },
  description: {
    fontSize: 14,
    color: '#CAC8C8',
  },
});

export default Card;