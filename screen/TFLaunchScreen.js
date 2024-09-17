import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {useAppContext} from '../store/context';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../const/customColors';

const TFLaunchScreen = () => {
  const {trueFalseData} = useAppContext();
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);

  const renderCard = ({item}) => {
    const isSelected = selectedCard === item.id;
    const isActive = item.active !== false; // Consider the card active if the 'active' property is not explicitly set to false

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          !isActive && styles.inactiveCard,
        ]}
        onPress={() => isActive && setSelectedCard(isSelected ? null : item.id)}
        disabled={!isActive}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.cardBackground}
          imageStyle={[
            styles.cardBackgroundImage,
            isSelected && styles.selectedCardBackgroundImage,
            !isActive && styles.inactiveCardBackgroundImage,
          ]}>
          <View
            style={[
              styles.cardContent,
              {
                backgroundColor: isSelected
                  ? 'rgba(255, 255, 255, 0.1)'
                  : isActive
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(128, 128, 128, 0.7)',
              },
            ]}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: isSelected
                    ? COLOR.blue
                    : isActive
                    ? COLOR.grey
                    : COLOR.darkGrey,
                },
              ]}>
              {item.topic}
            </Text>
            <Text
              style={[styles.cardSubtitle, !isActive && styles.inactiveText]}>
              {item.statements.length} questions
            </Text>
            {isSelected && isActive && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={() =>
                  navigation.navigate('TFGameScreen', {topicId: item.id})
                }>
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <LayoutImage blur={15}>
      <View style={styles.container}>
        <Text style={styles.header}>True/False Game Levels</Text>
        <FlatList
          data={trueFalseData}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{height: 80}}></View>
    </LayoutImage>
  );
};

export default TFLaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: COLOR.white,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#FFA41B',
    borderWidth: 2,
  },
  cardBackground: {
    height: 150,
  },
  cardBackgroundImage: {
    opacity: 0,
  },
  selectedCardBackgroundImage: {
    opacity: 1,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#FFA41B',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  startButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inactiveCard: {
    opacity: 0.7,
  },
  inactiveCardBackgroundImage: {
    opacity: 0.5,
  },
  inactiveText: {
    color: COLOR.darkGrey,
  },
});
