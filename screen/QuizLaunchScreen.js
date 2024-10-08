import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import LayoutImage from '../components/Layout/LayoutImage';
import {STEBEN_QUIZ} from '../data/stabenData'; // Import the quiz data
import {useAppContext} from '../store/context';

const QuizCard = ({topic, image, active, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.card, !active && styles.inactiveCard]}
      onPress={onPress}
      disabled={!active}>
      <Image
        source={{uri: image}}
        style={[styles.cardImage, !active && styles.inactiveCardImage]}
      />
      <Text style={[styles.cardText, !active && styles.inactiveCardText]}>
        {topic}
      </Text>
    </TouchableOpacity>
  );
};

const QuizLaunchScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const {quizData} = useAppContext();

  const handleQuizPress = quiz => {
    navigation.navigate('QuizGameScreen', {quiz});
  };

  return (
    <LayoutImage blur={40}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Quiz</Text>
        <FlatList
          data={quizData}
          renderItem={({item}) => (
            <QuizCard
              topic={item.topic}
              image={item.image}
              active={item.active}
              onPress={() => handleQuizPress(item)}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{height: 100}}></View>
    </LayoutImage>
  );
};

export default QuizLaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  inactiveCard: {
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  cardImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
    borderRadius: 12,
  },
  inactiveCardImage: {
    opacity: 0.3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inactiveCardText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
