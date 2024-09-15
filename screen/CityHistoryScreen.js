import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LayoutImage from '../components/Layout/LayoutImage';
import {CITY_HISTORY} from '../data/stabenData';

const CityHistoryScreen = () => {
  return (
    <LayoutImage blur={10}>
      <ScrollView style={styles.container}>
        {CITY_HISTORY.map(section => (
          <TouchableOpacity
            key={section.id}
            style={styles.card}
            onPress={() => navigation.navigate('HistoryDetail', {section})}>
            <Text style={styles.cardTitle}>{section.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LayoutImage>
  );
};

export default CityHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
