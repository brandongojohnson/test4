import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailPage = ({ route, navigation }) => {
  const { location } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon
              name='arrow-left'
              type='octicon'
              color='#000'
              size={24}
            />
          </TouchableOpacity>
        </View>

        {/* Main Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1480796927426-f609979314bd' }}
          style={styles.mainImage}
        />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{location.title}</Text>
          <Text style={styles.location}>{location.location}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>About this location</Text>
          <Text style={styles.description}>
            Experience the beauty of {location.title}, a stunning destination that offers 
            breathtaking views and unforgettable experiences. This location features modern 
            amenities while maintaining its authentic charm.
          </Text>

          {/* Location Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name='location' type='octicon' size={24} />
              <Text style={styles.detailText}>Prime Location</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name='star-fill' type='octicon' size={24} />
              <Text style={styles.detailText}>4.9 Rating</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default DetailPage; 