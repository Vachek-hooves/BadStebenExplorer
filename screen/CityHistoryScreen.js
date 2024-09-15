import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LayoutImage from '../components/Layout/LayoutImage';
import {CITY_HISTORY} from '../data/stabenData';
import {IconReturn} from '../components/icon';

const CityHistoryScreen = ({navigation}) => {
  return (
    <LayoutImage blur={10}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {CITY_HISTORY.map(section => (
          <TouchableOpacity
            key={section.id}
            style={styles.card}
            onPress={() => navigation.navigate('CityDetailsScreen', {section})}>
            <ImageBackground
              source={{uri: section.image}}
              style={styles.cardBackground}
              imageStyle={styles.cardBackgroundImage}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{section.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <IconReturn />
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
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardBackgroundImage: {
    borderRadius: 8,
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
