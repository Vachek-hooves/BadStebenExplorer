import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import { useAppContext } from '../store/context';
import { useRoute } from '@react-navigation/native';
import { COLOR } from '../const/customColors';

const TFGameScreen = () => {
  const { trueFalseData } = useAppContext();
  const route = useRoute();
  const { topicId } = route.params;

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const selectedTopic = trueFalseData.find(topic => topic.id === topicId);
    setCurrentTopic(selectedTopic);
  }, [topicId, trueFalseData]);

  const handleAnswer = (isTrue) => {
    const currentQuestion = currentTopic.statements[currentQuestionIndex];
    const correct = currentQuestion.isTrue === isTrue;
    setSelectedAnswer(isTrue);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < currentTopic.statements.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (!currentTopic) return null;

  const currentQuestion = currentTopic.statements[currentQuestionIndex];

  return (
    <LayoutImage blur={200}>
      <View style={styles.container}>
        {!showResult ? (
          <>
            <Image source={{ uri: currentTopic.image }} style={styles.image} />
            <Text style={styles.topic}>{currentTopic.topic}</Text>
            <Text style={styles.question}>{currentQuestion.statement}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.trueButton,
                  selectedAnswer === true && (isCorrect ? styles.correctAnswer : styles.wrongAnswer)
                ]}
                onPress={() => handleAnswer(true)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>True</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.falseButton,
                  selectedAnswer === false && (isCorrect ? styles.correctAnswer : styles.wrongAnswer)
                ]}
                onPress={() => handleAnswer(false)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>False</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.progress}>
              {currentQuestionIndex + 1} / {currentTopic.statements.length}
            </Text>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Game Over!</Text>
            <Text style={styles.scoreText}>
              Your score: {score} / {currentTopic.statements.length}
            </Text>
          </View>
        )}
      </View>
    </LayoutImage>
  );
};

export default TFGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    color: COLOR.white,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '40%',
    borderWidth: 2,
    borderColor: COLOR.white,
  },
  trueButton: {
    backgroundColor: COLOR.green,
  },
  falseButton: {
    backgroundColor: COLOR.red,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    marginTop: 20,
    fontSize: 16,
    color: COLOR.white,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: COLOR.white,
  },
  correctAnswer: {
    backgroundColor: COLOR.green,
    borderColor: COLOR.white,
    borderWidth: 4,
  },
  wrongAnswer: {
    backgroundColor: COLOR.red,
    borderColor: COLOR.white,
    borderWidth: 4,
  },
});
