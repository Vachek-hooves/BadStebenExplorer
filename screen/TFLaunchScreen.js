import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import { useAppContext } from '../store/context';
import { useNavigation } from '@react-navigation/native';

const TFLaunchScreen = () => {
  const { trueFalseData } = useAppContext();
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);

  const renderCard = ({ item }) => {
    const isSelected = selectedCard === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard
        ]}
        onPress={() => setSelectedCard(item.id)}
      >
        <Text style={styles.cardTitle}>{item.topic}</Text>
        <Text style={styles.cardSubtitle}>{item.statements.length} questions</Text>
        {isSelected && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('TFGameScreen', { topicId: item.id })}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LayoutImage>
      <View style={styles.container}>
        <Text style={styles.header}>True/False Game Levels</Text>
        <FlatList
          data={trueFalseData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: 'rgba(200, 230, 255, 0.9)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
