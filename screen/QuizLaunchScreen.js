import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LayoutImage from '../components/Layout/LayoutImage';
import { STEBEN_QUIZ } from '../data/stabenData'; // Import the quiz data

const QuizCard = ({ topic, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardText}>{topic}</Text>
  </TouchableOpacity>
);

const QuizLaunchScreen = () => {
  const navigation = useNavigation();

  const handleQuizPress = (quiz) => {
    navigation.navigate('QuizGameScreen', { quiz });
  };

  return (
    <LayoutImage blur={40}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Quiz</Text>
        <FlatList
          data={STEBEN_QUIZ}
          renderItem={({ item }) => (
            <QuizCard 
              topic={item.topic} 
              onPress={() => handleQuizPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </LayoutImage>
  );
};

export default QuizLaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
